// Detector from userscript v0.7.5; runs in the page's MAIN world.
(() => {
  'use strict';
    function microphoneDetectorAndAEC(eventName, disableAEC) {
      if (window.__DEV_UNDERGROUND_MIC_DUCK_EXTENSION075__) return;
      window.__DEV_UNDERGROUND_MIC_DUCK_EXTENSION075__ = true;
      const tracks = new Set();
      const recognizers = new Set();
      let reportedActive = false;
      let checkTimer = null;
      const send = activeNow => window.dispatchEvent(new CustomEvent(eventName, {
        detail: { source: 'dev-underground-mic-duck-extension', type: 'mic', active: activeNow }
      }));
      window.addEventListener('dev-underground-mic-duck-extension-query', () => send(reportedActive));
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

    microphoneDetectorAndAEC('dev-underground-mic-duck-extension-state', true);
})();
