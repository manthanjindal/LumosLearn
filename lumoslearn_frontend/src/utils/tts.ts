import { useCallback, useEffect, useRef, useState } from 'react';

export type SpeechControls = {
  supported: boolean;
  speaking: boolean;
  paused: boolean;
  speak: (text: string, opts?: { rate?: number; pitch?: number; voice?: SpeechSynthesisVoice | null }) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
};

export function useSpeechSynthesis(): SpeechControls {
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    utterRef.current = null;
    setSpeaking(false);
    setPaused(false);
  }, [supported]);

  const speak = useCallback((text: string, opts?: { rate?: number; pitch?: number; voice?: SpeechSynthesisVoice | null }) => {
    if (!supported) return;
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = opts?.rate ?? 1;
    utter.pitch = opts?.pitch ?? 1;
    if (opts?.voice) utter.voice = opts.voice;
    utter.onend = () => {
      setSpeaking(false);
      setPaused(false);
      utterRef.current = null;
    };
    utter.onerror = () => {
      setSpeaking(false);
      setPaused(false);
      utterRef.current = null;
    };
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
    setSpeaking(true);
    setPaused(false);
  }, [supported]);

  const pause = useCallback(() => {
    if (!supported) return;
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [supported]);

  const resume = useCallback(() => {
    if (!supported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    }
  }, [supported]);

  // Cleanup on unmount
  useEffect(() => stop, [stop]);

  return { supported, speaking, paused, speak, pause, resume, stop };
}
