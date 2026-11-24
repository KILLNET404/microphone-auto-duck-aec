// ==UserScript==
// @name            Microphone Auto Duck + AEC
// @namespace    local.microphone-auto-duck.safe
// @name:ru         Microphone Auto Duck + AEC
// @description:ru  При голосовом вводе или разговоре приглушает HTML5-видео и аудио на сайтах, пока включён микрофон, и возвращает громкость после записи. Может запросить отключение эхоподавления (AEC) для более естественной диктовки.
// @author          KILLNET_404
// @supportURL      https://t.me/DevUndergroundLab
// @contributionURL https://killnet404.github.io/support/
// @version         0.7.5
// @description     Automatically lowers HTML5 video and audio volume while you use the microphone, then restores it. Can request disabling echo cancellation (AEC) to help with voice dictation.
// @match        http://*/*
// @match        https://*/*
// @icon         data:image/png;base64,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
// @run-at       document-start
// @inject-into  content
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @grant        GM_registerMenuCommand
// Donations (optional, never collected by the script):
// USDT, TRON/TRC20: TLFYxeKEMqqjb4UU2G4NxLob7YTDoQo86T
// TON network address: UQChWeQtbwZuMmsQPsT1gULdkkDdqUmTrmE6jQQliCRWVYy4
// ==/UserScript==

(() => {
  'use strict';

  // Универсальная поддержка iframe без повторного внедрения обработчиков микрофона.
  // Во фреймах скрипт лишь отслеживает общую сессию и управляет HTML5-плеерами.
  const isTopLevel = window.top === window.self;

  // Совместимость с настройками работающего Auto Duck v0.4/v0.5.
  // Поля manual и auto намеренно не читаем: новый режим ТОЛЬКО автоматический.
  const PREFIX = 'mic-duck-safe04:';
  const KEY_FACTOR = PREFIX + 'volumeFactor';
  const KEY_MIC = PREFIX + 'micSession';
  const LEASE_MS = 12000;
  const HEARTBEAT_MS = 3500;
  const REPORT_SOURCE = PREFIX + Math.random().toString(36).slice(2);
  const PAGE_EVENT = 'mic-duck-combined-' + Math.random().toString(36).slice(2);
  const TAG = '[Microphone Auto Duck + AEC 0.7.5]';

  const get = (key, fallback) => {
    try { return GM_getValue(key, fallback); } catch (_) { return fallback; }
  };
  const set = (key, value) => {
    try { GM_setValue(key, value); } catch (error) { console.warn(TAG, error); }
  };
  const validFactor = value => [0.05, 0.07, 0.1].includes(Number(value)) ? Number(value) : 0.05;

  let factor = validFactor(get(KEY_FACTOR, 0.05));
  let active = false;
  let micLocal = false;
  let heartbeatTimer = null;
  let leaseTimer = null;
  const mediaBefore = new Map();

  function currentMicActive() {
    const entry = get(KEY_MIC, null);
    return !!(entry && entry.active && typeof entry.time === 'number'
      && Date.now() - entry.time < LEASE_MS && entry.time <= Date.now() + 2000);
  }

  function applyMedia(media) {
    if (!active || !(media instanceof HTMLMediaElement)) return;
    try {
      if (!mediaBefore.has(media)) mediaBefore.set(media, media.volume);
      const wanted = mediaBefore.get(media) * factor;
      if (Math.abs(media.volume - wanted) > 0.002) media.volume = wanted;
    } catch (_) { /* Некоторые плееры запрещают менять volume. */ }
  }
  // Универсальный поиск HTML5-плееров в обычном DOM и открытых Shadow DOM.
  // Наблюдатели работают только во время активной сессии микрофона.
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

    // TreeWalker не создаёт большой список всех узлов страницы.
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT);
    for (let element = walker.nextNode(); element; element = walker.nextNode()) {
      inspectMediaElement(element);
    }
  }

  function observeMediaRoot(root) {
    if (!active || observedMediaRoots.has(root)) return;
    const observer = new MutationObserver(records => {
      if (!active) return;
      for (const record of records) {
        // Никаких повторных обходов всей страницы: только новые поддеревья.
        for (const added of record.addedNodes) scanMediaSubtree(added);
      }
    });
    try {
      observer.observe(root, { childList: true, subtree: true });
    } catch (_) {
      return;
    }
    observedMediaRoots.set(root, observer);
    // События media внутри Shadow DOM могут не пересекать границу ShadowRoot.
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
    else scanMediaSubtree(document); // При смене громкости пересчитываем и Shadow DOM.
  }
  function restoreMedia() {
    for (const [media, volume] of mediaBefore) {
      try { media.volume = volume; } catch (_) { /* Элемент мог быть удалён. */ }
    }
    mediaBefore.clear();
  }

  function render() {
    const nextFactor = validFactor(get(KEY_FACTOR, 0.05));
    const nextActive = currentMicActive(); // Всегда автоматически, без ручного режима.
    const factorChanged = nextFactor !== factor;
    factor = nextFactor;

    if (!nextActive && active) {
      active = false;
      stopObservingMedia();
      restoreMedia();
    } else if (nextActive && !active) {
      active = true;
      applyExistingMediaOnce();
    } else if (nextActive && factorChanged) {
      restoreMedia();
      applyExistingMediaOnce();
    }

    // Не сканируем плееры по таймеру; только проверяем, жива ли сессия микрофона.
    if (active && !leaseTimer) leaseTimer = setInterval(render, 4000);
    if (!active && leaseTimer) {
      clearInterval(leaseTimer);
      leaseTimer = null;
    }
  }

  function publishMic(activeNow) {
    micLocal = activeNow;
    if (activeNow) {
      set(KEY_MIC, { active: true, id: REPORT_SOURCE, time: Date.now() });
      if (!heartbeatTimer) heartbeatTimer = setInterval(() => {
        if (micLocal) set(KEY_MIC, { active: true, id: REPORT_SOURCE, time: Date.now() });
      }, HEARTBEAT_MS);
    } else {
      if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
      const current = get(KEY_MIC, null);
      if (current && current.id === REPORT_SOURCE) {
        set(KEY_MIC, { active: false, id: REPORT_SOURCE, time: Date.now() });
      }
    }
    render();
  }

  function changeFactor(value) {
    set(KEY_FACTOR, value);
    render();
    // Уведомления намеренно отсутствуют.
  }

  // Выполняем запись настройки ПОСЛЕ завершения обработчика команды Violentmonkey.
  // Так GM_setValue/GM_addValueChangeListener не запускаются вложенно прямо внутри
  // внутреннего message-handler расширения (из которого пользователь видит injected.js).
  function registerVolumeCommand(caption, level) {
    GM_registerMenuCommand(caption, function onVolumeSelected() {
      setTimeout(function applySelectedVolume() {
        try {
          changeFactor(level);
        } catch (error) {
          console.error(TAG, 'Не удалось применить громкость:', error);
        }
      }, 0);
    });
  }
  if (isTopLevel) {
    registerVolumeCommand('Громкость 5% (остается 5% от исходной)', 0.05);
    registerVolumeCommand('Громкость 7% (остается 7% от исходной)', 0.07);
    registerVolumeCommand('Громкость 10% (остается 10% от исходной)', 0.1);
  }

  try {
    GM_addValueChangeListener(KEY_FACTOR, render);
    GM_addValueChangeListener(KEY_MIC, render);
  } catch (error) {
    console.warn(TAG, 'Синхронизация вкладок недоступна:', error);
  }

  // Обработчики микрофона, SpeechRecognition и AEC запускаем ТОЛЬКО
  // в основных документах. В iframe выполняется исключительно лёгкий
  // обработчик громкости с общей GM-сессией между вкладками и фреймами.
  if (isTopLevel) {
    window.addEventListener(PAGE_EVENT, event => {
      const msg = event.detail;
      if (!msg || msg.source !== 'mic-duck-stable071') return;
      if (msg.type === 'mic' && micLocal !== !!msg.active) publishMic(!!msg.active);
    });

    function microphoneDetectorAndAEC(eventName, disableAEC) {
      if (window.__MIC_DUCK_STABLE071__) return;
      window.__MIC_DUCK_STABLE071__ = true;
      const tracks = new Set();
      const recognizers = new Set();
      let reportedActive = false;
      let checkTimer = null;
      const send = activeNow => window.dispatchEvent(new CustomEvent(eventName, {
        detail: { source: 'mic-duck-stable071', type: 'mic', active: activeNow }
      }));
      const check = () => {
        for (const track of tracks) if (track.readyState === 'ended') tracks.delete(track);
        const next = tracks.size > 0 || recognizers.size > 0;
        if (next !== reportedActive) {
          reportedActive = next;
          send(next);
        }
        if (next && !checkTimer) checkTimer = setInterval(check, 1000);
        if (!next && checkTimer) { clearInterval(checkTimer); checkTimer = null; }
      };

      try {
        const md = navigator.mediaDevices;
        if (md && typeof md.getUserMedia === 'function') {
          const original = md.getUserMedia;
          md.getUserMedia = function (...args) {
            const constraints = args[0];
            if (!constraints || !constraints.audio) return Reflect.apply(original, this, args);

            if (disableAEC) {
              const audio = constraints.audio === true
                ? { echoCancellation: { ideal: false } }
                : typeof constraints.audio === 'object'
                  ? { ...constraints.audio, echoCancellation: { ideal: false } }
                  : null;
              if (audio) args[0] = { ...constraints, audio };
            }

            const promise = Reflect.apply(original, this, args);
            return Promise.resolve(promise).then(stream => {
              for (const track of stream.getAudioTracks()) {
                tracks.add(track);
                track.addEventListener('ended', check, { once: true });
                if (disableAEC) {
                  const aec = track.getSettings?.().echoCancellation;
                  // Только консоль для диагностики: никаких всплывающих уведомлений.
                  console.info('[Microphone Auto Duck + AEC 0.7.5] echoCancellation:', aec);
                }
              }
              check();
              return stream;
            });
          };
        }
      } catch (error) { console.warn('[Microphone Auto Duck + AEC 0.7.5] getUserMedia:', error); }

      try {
        for (const name of ['SpeechRecognition', 'webkitSpeechRecognition']) {
          const Constructor = window[name];
          const proto = Constructor && Constructor.prototype;
          if (!proto || typeof proto.start !== 'function') continue;
          const originalStart = proto.start;
          proto.start = function (...args) {
            const result = Reflect.apply(originalStart, this, args);
            if (!recognizers.has(this)) {
              recognizers.add(this);
              const close = () => { recognizers.delete(this); check(); };
              this.addEventListener('end', close, { once: true });
              this.addEventListener('error', close, { once: true });
            }
            check();
            return result;
          };
        }
      } catch (error) { console.warn('[Microphone Auto Duck + AEC 0.7.5] Web Speech:', error); }
    }

    try {
      const script = document.createElement('script');
      script.textContent = '(' + microphoneDetectorAndAEC.toString() + ')('
        + JSON.stringify(PAGE_EVENT) + ',true)';
      (document.head || document.documentElement).appendChild(script);
      script.remove();
    } catch (error) { console.warn(TAG, 'Внедрение обработчика не удалось:', error); }
  }

  window.addEventListener('pagehide', () => {
    if (isTopLevel && micLocal) publishMic(false);
    if (heartbeatTimer) clearInterval(heartbeatTimer);
    if (leaseTimer) clearInterval(leaseTimer);
    if (active) { active = false; stopObservingMedia(); restoreMedia(); }
  });

  render();
})();
