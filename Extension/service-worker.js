// Remove old crash leftovers; active leases expire independently in each document.
async function cleanup() {
  const values = await chrome.storage.local.get(null);
  const cutoff = Date.now() - 86400000;
  const stale = Object.keys(values).filter(key => key.startsWith('micSession:') && typeof values[key] === 'number' && values[key] < cutoff);
  if (stale.length) await chrome.storage.local.remove(stale);
}
chrome.runtime.onStartup.addListener(() => cleanup().catch(console.warn));
chrome.runtime.onInstalled.addListener(() => cleanup().catch(console.warn));

// Show the saved global ducking mode (not microphone activity) on the toolbar.
// Serialise refreshes so a slow older icon update cannot override a newer one.
let iconUpdate = Promise.resolve();
function refreshActionIcon() {
  iconUpdate = iconUpdate.then(async () => {
    const { enabled } = await chrome.storage.local.get('enabled');
    const mode = enabled === false ? 'off' : 'on';
    const path = Object.fromEntries([16, 32, 48, 128].map(size => [size, `icons/action-${mode}-${size}.png`]));
    await chrome.action.setIcon({ path });
    const state = chrome.i18n.getMessage(mode === 'on' ? 'enabledSaved' : 'disabledSaved');
    await chrome.action.setTitle({ title: `Microphone Auto Duck + AEC · ${state}` });
  }).catch(error => console.warn('[Microphone Auto Duck + AEC] toolbar icon:', error));
  return iconUpdate;
}
chrome.runtime.onStartup.addListener(refreshActionIcon);
chrome.runtime.onInstalled.addListener(refreshActionIcon);
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && Object.prototype.hasOwnProperty.call(changes, 'enabled')) refreshActionIcon();
});
