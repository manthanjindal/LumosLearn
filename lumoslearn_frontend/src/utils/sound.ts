// Tiny Web Audio helper for subtle UI sounds (no assets)
// Safe no-ops on unsupported environments.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    // Reuse a single AudioContext to avoid excessive allocations
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    return ctx;
  } catch {
    return null;
  }
}

function tone(frequency: number, durationMs: number, type: OscillatorType = 'sine', gain = 0.04, whenOffset = 0) {
  const audio = getCtx();
  if (!audio) return;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  g.gain.value = gain; // very subtle
  osc.connect(g).connect(audio.destination);
  const now = audio.currentTime + whenOffset;
  osc.start(now);
  osc.stop(now + durationMs / 1000);
}

export function playPerfect() {
  // Quick ascending two-tone, light and crisp
  tone(880, 90, 'sine', 0.045, 0); // A5
  tone(1175, 120, 'sine', 0.045, 0.07); // D6# approx
}

export function playVictory() {
  // Tiny arpeggio C6-E6-G6
  tone(1046.5, 120, 'triangle', 0.05, 0);
  tone(1318.5, 120, 'triangle', 0.05, 0.12);
  tone(1568.0, 160, 'triangle', 0.05, 0.24);
}

export function playClick() {
  // Very soft click for UI interactions
  tone(600, 30, 'square', 0.025, 0);
}
