// Media engine from userscript v0.7.5; extension storage adapter.
(() => {
  'use strict';
  const isTopLevel = window.top === window.self;
  const KEY_FACTOR = 'volumeFactor';
  const KEY_ENABLED = 'enabled';
  const SESSION_PREFIX = 'micSession:';
  const SESSION_KEY = SESSION_PREFIX + Array.from(crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16)).join('-');
  const LEASE_MS = 12000;
  const HEARTBEAT_MS = 3500;
  const TAG = '[Microphone Auto Duck + AEC 0.7.5 extension]';
  const validFactor = value => typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1 ? Math.round(value * 100) / 100 : 0.05;
  const values = Object.create(null);
  const changedDuringLoad = new Set();
  let loading = true;
  let suspended = false;
  let factor = 0.05;
  let enabled = true;
  let active = false;
  let micLocal = false;
  let heartbeatTimer = null;
  let leaseTimer = null;
  const mediaBefore = new Map();

  function currentMicActive(enabledState = enabled) {
    if (suspended || !enabledState) return false;
    const now = Date.now();
    return Object.keys(values).some(key => {
      const time = values[key];
      return key.startsWith(SESSION_PREFIX) && typeof time === 'number' &&
        now - time < LEASE_MS && time <= now + 2000;
    });
  }

  function applyMedia(media) {
    if (!active || !(media instanceof HTMLMediaElement)) return;
    try {
      if (!mediaBefore.has(media)) mediaBefore.set(media, media.volume);
      const wanted = mediaBefore.get(media) * factor;
      if (media.volume !== wanted) media.volume = wanted;
    } catch (_) { /* Некоторые плееры запрещают менять volume. */ }
  }
  const observedMediaRoots = new Map();

  function onMediaEvent(event) {
    if (active) applyMedia(event.target);
  }

  function inspectMediaElement(element) {
    if (element instanceof HTMLMediaElement) applyMedia(element);
    if (element.shadowRoot) observeMediaRoot(element.shadowRoot);
  }

  function scanMediaSubtree(node) {
    if (!node || ![1, 9, 11].includes(node.nodeType)) return;
    if (node.nodeType === 1) inspectMediaElement(node);
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
    for (let element = walker.nextNode(); element; element = walker.nextNode()) inspectMediaElement(element);
  }

  function observeMediaRoot(root) {
    if (!active || observedMediaRoots.has(root)) return;
    const observer = new MutationObserver(records => {
      if (!active) return;
      for (const record of records) for (const added of record.addedNodes) scanMediaSubtree(added);
    });
    try {
      observer.observe(root, { childList: true, subtree: true });
    } catch (_) {
      return;
    }
    observedMediaRoots.set(root, observer);
    root.addEventListener('play', onMediaEvent, true);
    root.addEventListener('loadedmetadata', onMediaEvent, true);
    scanMediaSubtree(root);
  }

  function stopObservingMedia() {
    for (const [root, observer] of observedMediaRoots) {
      observer.disconnect();
      root.removeEventListener('play', onMediaEvent, true);
      root.removeEventListener('loadedmetadata', onMediaEvent, true);
    }
    observedMediaRoots.clear();
  }

  function applyExistingMediaOnce() {
    if (!observedMediaRoots.has(document)) observeMediaRoot(document);
    else scanMediaSubtree(document);
  }
  function restoreMedia() {
    for (const [media, volume] of mediaBefore) {
      try { media.volume = volume; } catch (_) { /* Элемент мог быть удалён. */ }
    }
    mediaBefore.clear();
  }

  function render() {
    const nextFactor = validFactor(values[KEY_FACTOR]);
    const nextEnabled = values[KEY_ENABLED] !== false;
    const nextActive = currentMicActive(nextEnabled);
    const factorChanged = nextFactor !== factor;
    const enabledChanged = nextEnabled !== enabled;
    factor = nextFactor;
    enabled = nextEnabled;

    if ((!nextActive || !enabled) && active) {
      active = false;
      stopObservingMedia();
      restoreMedia();
    } else if (nextActive && enabled && !active) {
      active = true;
      applyExistingMediaOnce();
    } else if (nextActive && enabled && factorChanged) {
      // Slider changes use the original saved volumes, without restoring or rescanning.
      for (const media of mediaBefore.keys()) applyMedia(media);
    }

    if (active && !leaseTimer) leaseTimer = setInterval(render, 4000);
    if (!active && leaseTimer) {
      clearInterval(leaseTimer);
      leaseTimer = null;
    }

    if (enabledChanged && !enabled && micLocal) publishMic(false);
    if (enabledChanged && enabled && isTopLevel) window.dispatchEvent(new Event('dev-underground-mic-duck-extension-query'));
  }

  function writeHeartbeat() {
    const time = Date.now();
    values[SESSION_KEY] = time;
    if (loading) changedDuringLoad.add(SESSION_KEY);
    try { chrome.storage.local.set({ [SESSION_KEY]: time }).catch(error => console.warn(TAG, error)); }
    catch (error) { console.warn(TAG, error); }
    render();
  }
  function publishMic(next) {
    if (next === micLocal) return;
    micLocal = next;
    if (next) {
      if (!enabled) return;
      writeHeartbeat();
      heartbeatTimer = setInterval(() => { if (micLocal && enabled) writeHeartbeat(); }, HEARTBEAT_MS);
    } else {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;
      delete values[SESSION_KEY];
      if (loading) changedDuringLoad.add(SESSION_KEY);
      try { chrome.storage.local.remove(SESSION_KEY).catch(error => console.warn(TAG, error)); }
      catch (error) { console.warn(TAG, error); }
      render();
    }
  }
  function onStorage(changes, area) {
    if (area !== 'local') return;
    for (const [key, change] of Object.entries(changes)) {
      if (key !== KEY_FACTOR && key !== KEY_ENABLED && !key.startsWith(SESSION_PREFIX)) continue;
      if (loading) changedDuringLoad.add(key);
      if (change.newValue === undefined) delete values[key];
      else values[key] = change.newValue;
    }
    render();
  }
  chrome.storage.onChanged.addListener(onStorage);
  chrome.storage.local.get(null).then(snapshot => {
    for (const [key, value] of Object.entries(snapshot)) {
      if ((key === KEY_FACTOR || key === KEY_ENABLED || key.startsWith(SESSION_PREFIX)) && !changedDuringLoad.has(key)) values[key] = value;
    }
    loading = false;
    changedDuringLoad.clear();
    render();
  }).catch(error => { loading = false; changedDuringLoad.clear(); console.warn(TAG, error); });

  if (isTopLevel) {
    window.addEventListener('dev-underground-mic-duck-extension-state', event => {
      const msg = event.detail;
      if (msg?.source === 'dev-underground-mic-duck-extension' && msg.type === 'mic' && typeof msg.active === 'boolean') {
        if (!suspended && enabled) publishMic(msg.active);
        else if (micLocal) publishMic(false);
      }
    });
    window.dispatchEvent(new Event('dev-underground-mic-duck-extension-query'));
  }
  window.addEventListener('pagehide', () => {
    suspended = true;
    if (isTopLevel && micLocal) publishMic(false);
    render();
  });
  window.addEventListener('pageshow', () => {
    suspended = false;
    if (isTopLevel && enabled) window.dispatchEvent(new Event('dev-underground-mic-duck-extension-query'));
    render();
  });
  render();
})();
