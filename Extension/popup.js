'use strict';
const t = key => chrome.i18n.getMessage(key);
document.documentElement.lang = chrome.i18n.getUILanguage();
for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
const KEY_FACTOR = 'volumeFactor';
const KEY_ENABLED = 'enabled';
const field = document.querySelector('fieldset');
const message = document.querySelector('#message');
const toggleButton = document.querySelector('#toggleEnabled');
const slider = document.querySelector('#volumeSlider');
const volumeValue = document.querySelector('#volumeValue');
let pendingVolume = 0;
let volumeRevision = 0;
let loading = true;
let currentEnabled = true;
function validFactor(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1 ? Math.round(value * 100) / 100 : 0.05;
}
function showFactor(value) {
  const percent = Math.round(validFactor(value) * 100);
  slider.value = String(percent);
  slider.style.setProperty('--level', `${percent}%`);
  slider.setAttribute('aria-valuetext', `${percent}%`);
  volumeValue.textContent = `${percent}%`;
}
function showEnabled(value) {
  currentEnabled = value !== false;
  toggleButton.classList.toggle('is-on', currentEnabled);
  toggleButton.classList.toggle('is-off', !currentEnabled);
  toggleButton.setAttribute('aria-pressed', String(currentEnabled));
  toggleButton.textContent = currentEnabled ? t('enabledState') : t('disabledState');
  toggleButton.title = currentEnabled ? t('turnOff') : t('turnOn');
  toggleButton.setAttribute('aria-label', t('toggleLabel'));
  document.body.classList.toggle('is-disabled', !currentEnabled);
  document.querySelector('#modeTitle').textContent = t(currentEnabled ? 'subtitle' : 'pausedTitle');
  document.querySelector('[data-i18n="status"]').textContent = t(currentEnabled ? 'status' : 'pausedStatus');
  field.disabled = loading || !currentEnabled;
}
async function load() {
  message.textContent = t('loading');
  try {
    const data = await chrome.storage.local.get([KEY_FACTOR, KEY_ENABLED]);
    loading = false;
    showFactor(data[KEY_FACTOR]);
    showEnabled(data[KEY_ENABLED]);
    toggleButton.disabled = false;
    message.textContent = '';
  } catch (_) {
    message.textContent = t('error');
  }
}
slider.addEventListener('input', async () => {
  if (loading || !currentEnabled) return;
  const value = validFactor(Number(slider.value) / 100);
  showFactor(value);
  const revision = ++volumeRevision;
  pendingVolume++;
  try {
    // Send every user change immediately; no unsaved debounce when the popup closes.
    await chrome.storage.local.set({ [KEY_FACTOR]: value });
    if (revision === volumeRevision) message.textContent = t('saved');
  } catch (_) {
    if (revision === volumeRevision) {
      message.textContent = t('error');
      try {
        const data = await chrome.storage.local.get(KEY_FACTOR);
        if (revision === volumeRevision) showFactor(data[KEY_FACTOR]);
      } catch (_) {}
    }
  } finally {
    pendingVolume--;
  }
});
toggleButton.addEventListener('click', async () => {
  toggleButton.disabled = true;
  try {
    const next = !currentEnabled;
    await chrome.storage.local.set({ [KEY_ENABLED]: next });
    showEnabled(next);
    message.textContent = next ? t('enabledSaved') : t('disabledSaved');
  } catch (_) {
    message.textContent = t('error');
  } finally {
    toggleButton.disabled = false;
  }
});
chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== 'local') return;
  if (changes[KEY_FACTOR] && pendingVolume === 0) showFactor(changes[KEY_FACTOR].newValue);
  if (changes[KEY_ENABLED]) showEnabled(changes[KEY_ENABLED].newValue);
});
load();
