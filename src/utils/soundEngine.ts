// Lightweight 0 KB Web Audio API synthesizer for BEHONGCA UI click SFX, quiz SFX & quiz backsound

const SOUND_MUTE_STORAGE_KEY = 'behongca_sound_muted';

let audioCtx: AudioContext | null = null;
let bgmTimerId: number | null = null;
let bgmStepIndex = 0;

function readInitialMuted(): boolean {
  try {
    return localStorage.getItem(SOUND_MUTE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

let isMutedState = readInitialMuted();
const muteListeners = new Set<(muted: boolean) => void>();

export function getIsSoundMuted(): boolean {
  return isMutedState;
}

export function setSoundMuted(nextMuted: boolean): void {
  isMutedState = nextMuted;
  try {
    localStorage.setItem(SOUND_MUTE_STORAGE_KEY, nextMuted ? '1' : '0');
  } catch {
    // Ignore storage quota issues
  }
  if (nextMuted) {
    stopQuizBacksound();
  }
  muteListeners.forEach((listener) => listener(nextMuted));
}

export function toggleSoundMuted(): boolean {
  const next = !isMutedState;
  setSoundMuted(next);
  if (!next) {
    playUnmuteChime();
  }
  return next;
}

export function subscribeSoundMuted(listener: (muted: boolean) => void): () => void {
  muteListeners.add(listener);
  return () => {
    muteListeners.delete(listener);
  };
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) {
    audioCtx = new AudioCtx();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

interface ToneOptions {
  freq: number;
  duration: number;
  delay?: number;
  volume?: number;
  type?: OscillatorType;
  slideToFreq?: number;
}

function playTone({
  freq,
  duration,
  delay = 0,
  volume = 0.1,
  type = 'triangle',
  slideToFreq,
}: ToneOptions): void {
  if (isMutedState) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideToFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideToFreq), now + duration);
    }

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + Math.min(0.015, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Gracefully ignore browser audio restrictions
  }
}

export function playClickSound(): void {
  if (isMutedState) return;
  playTone({
    freq: 760,
    slideToFreq: 520,
    duration: 0.045,
    volume: 0.055,
    type: 'sine',
  });
}

export function playUnmuteChime(): void {
  if (isMutedState) return;
  playTone({ freq: 523.25, duration: 0.09, delay: 0, volume: 0.08, type: 'triangle' });
  playTone({ freq: 659.25, duration: 0.12, delay: 0.06, volume: 0.08, type: 'triangle' });
}

export function playCorrectSound(streak = 1): void {
  if (isMutedState) return;
  const semitoneBoost = Math.min(streak - 1, 5);
  const pitchFactor = Math.pow(2, semitoneBoost / 12);

  // Ascending bright major triad chime
  playTone({ freq: 523.25 * pitchFactor, duration: 0.11, delay: 0, volume: 0.11, type: 'triangle' });
  playTone({ freq: 659.25 * pitchFactor, duration: 0.12, delay: 0.07, volume: 0.11, type: 'triangle' });
  playTone({ freq: 783.99 * pitchFactor, duration: 0.18, delay: 0.14, volume: 0.12, type: 'triangle' });

  // Extra sparkle harmonic when streak combo activates (2x+)
  if (streak >= 2) {
    playTone({
      freq: 1046.5 * pitchFactor,
      duration: 0.24,
      delay: 0.21,
      volume: 0.1,
      type: 'sine',
    });
  }
}

export function playWrongSound(): void {
  if (isMutedState) return;
  // Soft descending low double-tone
  playTone({ freq: 311.13, slideToFreq: 277.18, duration: 0.14, delay: 0, volume: 0.09, type: 'triangle' });
  playTone({ freq: 246.94, slideToFreq: 207.65, duration: 0.22, delay: 0.12, volume: 0.09, type: 'sine' });
}

export function playTimeoutSound(): void {
  if (isMutedState) return;
  playTone({ freq: 392.0, duration: 0.12, delay: 0, volume: 0.09, type: 'triangle' });
  playTone({ freq: 329.63, duration: 0.12, delay: 0.11, volume: 0.09, type: 'triangle' });
  playTone({ freq: 261.63, duration: 0.25, delay: 0.22, volume: 0.09, type: 'sine' });
}

export function playTimerTickSound(urgent = false): void {
  if (isMutedState) return;
  playTone({
    freq: urgent ? 980 : 780,
    duration: 0.04,
    volume: urgent ? 0.065 : 0.045,
    type: 'sine',
  });
}

export function playQuizFinishSound(accuracyPct: number): void {
  if (isMutedState) return;
  stopQuizBacksound();

  if (accuracyPct >= 80) {
    // Victory fanfare (Grand Dental Guardian)
    const fanfare = [
      { freq: 523.25, delay: 0, dur: 0.12 },
      { freq: 659.25, delay: 0.1, dur: 0.12 },
      { freq: 783.99, delay: 0.2, dur: 0.12 },
      { freq: 1046.5, delay: 0.32, dur: 0.36 },
      { freq: 783.99, delay: 0.44, dur: 0.14 },
      { freq: 1046.5, delay: 0.56, dur: 0.48 },
    ];
    fanfare.forEach((n) =>
      playTone({ freq: n.freq, duration: n.dur, delay: n.delay, volume: 0.12, type: 'triangle' })
    );
    // Warm chord accompaniment on final note
    playTone({ freq: 523.25, duration: 0.48, delay: 0.56, volume: 0.06, type: 'sine' });
    playTone({ freq: 659.25, duration: 0.48, delay: 0.56, volume: 0.06, type: 'sine' });
  } else if (accuracyPct >= 50) {
    // Warm completion melody (Herbal Bioactive Explorer)
    const notes = [
      { freq: 440.0, delay: 0, dur: 0.13 },
      { freq: 554.37, delay: 0.11, dur: 0.13 },
      { freq: 659.25, delay: 0.22, dur: 0.15 },
      { freq: 880.0, delay: 0.35, dur: 0.34 },
    ];
    notes.forEach((n) =>
      playTone({ freq: n.freq, duration: n.dur, delay: n.delay, volume: 0.1, type: 'triangle' })
    );
  } else {
    // Encouraging finish cadence (Fresh Smile Learner)
    const notes = [
      { freq: 392.0, delay: 0, dur: 0.14 },
      { freq: 440.0, delay: 0.13, dur: 0.14 },
      { freq: 523.25, delay: 0.26, dur: 0.3 },
    ];
    notes.forEach((n) =>
      playTone({ freq: n.freq, duration: n.dur, delay: n.delay, volume: 0.09, type: 'sine' })
    );
  }
}

// Gentle botanical pixel-game melody loop (16 steps, C major pentatonic)
const BGM_MELODY_FREQS = [
  523.25, 0, 659.25, 587.33,
  523.25, 0, 392.0, 440.0,
  523.25, 659.25, 783.99, 0,
  659.25, 587.33, 523.25, 0,
];

const BGM_BASS_FREQS = [
  130.81, 0, 0, 0,
  196.0, 0, 0, 0,
  174.61, 0, 0, 0,
  196.0, 0, 146.83, 0,
];

export function startQuizBacksound(): void {
  if (typeof window === 'undefined' || isMutedState) return;
  if (bgmTimerId !== null) return;

  getAudioContext();
  bgmStepIndex = 0;

  const stepTick = () => {
    if (isMutedState || document.hidden) return;
    const step = bgmStepIndex % BGM_MELODY_FREQS.length;
    const melody = BGM_MELODY_FREQS[step];
    const bass = BGM_BASS_FREQS[step];

    if (melody > 0) {
      playTone({
        freq: melody,
        duration: 0.22,
        volume: 0.032,
        type: 'triangle',
      });
    }
    if (bass > 0) {
      playTone({
        freq: bass,
        duration: 0.34,
        volume: 0.024,
        type: 'sine',
      });
    }
    bgmStepIndex += 1;
  };

  stepTick();
  bgmTimerId = window.setInterval(stepTick, 280);
}

export function stopQuizBacksound(): void {
  if (bgmTimerId !== null && typeof window !== 'undefined') {
    window.clearInterval(bgmTimerId);
    bgmTimerId = null;
  }
}
