import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Code, AlertCircle } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

const TITLES = [
  'Data Analyst',
  'Power BI & SQL Specialist',
  'Data Storyteller & Business Intelligence',
  'Transforming Raw Data into Actionable Insights'
];

type IntroStage = 
  | 'gate'
  | 'loading' 
  | 'lamp-flicker' 
  | 'typing-hello' 
  | 'typing-im' 
  | 'typing-name' 
  | 'titles-ticker' 
  | 'quote' 
  | 'fade-out';

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<IntroStage>('loading');
  const [typedText, setTypedText] = useState('');
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [lampOn, setLampOn] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const ambientPadRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);
  const humRef = useRef<{ osc: OscillatorNode; gain: GainNode } | null>(null);

  // Subliminal warm ambient synth pad
  const startAmbientPad = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(130.81, now); // C3
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(196.00, now); // G3

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 1.8); // quiet, sublime pad

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);

      ambientPadRef.current = { osc1, osc2, gain };
    } catch(e) {}
  };

  // Continuous subtle electrical hum
  const startHum = (ctx: AudioContext) => {
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(55, now); // warm low hum (A1)

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(80, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.03, now + 2.0); // very subtle hum in background

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      humRef.current = { osc, gain };
    } catch (e) {}
  };

  // Elegant soft chime sound when the quote appears (C major bell sound, not jarring)
  const playQuoteChime = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      
      const bellFreqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 major chord
      bellFreqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.05);

        gain.gain.setValueAtTime(0.001, now + index * 0.05);
        gain.gain.linearRampToValueAtTime(0.03, now + index * 0.05 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.05);
        osc.stop(now + index * 0.05 + 2.0);
      });
    } catch(e) {}
  };

  // Smoothly fade out all continuous audio nodes
  const fadeAllAmbient = () => {
    if (!audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const fadeDuration = 1.2;

      if (ambientPadRef.current) {
        ambientPadRef.current.gain.gain.cancelScheduledValues(now);
        ambientPadRef.current.gain.gain.setValueAtTime(ambientPadRef.current.gain.gain.value, now);
        ambientPadRef.current.gain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);
        const currentPad = ambientPadRef.current;
        setTimeout(() => {
          try {
            currentPad.osc1.stop();
            currentPad.osc2.stop();
          } catch(e){}
        }, fadeDuration * 1000 + 100);
      }

      if (humRef.current) {
        humRef.current.gain.gain.cancelScheduledValues(now);
        humRef.current.gain.gain.setValueAtTime(humRef.current.gain.gain.value, now);
        humRef.current.gain.gain.linearRampToValueAtTime(0.001, now + fadeDuration);
        const currentHum = humRef.current;
        setTimeout(() => {
          try {
            currentHum.osc.stop();
          } catch(e){}
        }, fadeDuration * 1000 + 100);
      }
    } catch(e) {}
  };

  // Ultra-calm, peaceful and elegant sound design (warm soft pad & sparkling crystal chime cascade)
  const playMbc2Intro = () => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;

      // =========================================================================
      // PHASE 1 (0-3s): Low ambient pad, soft digital hum, subtle rising tension
      // =========================================================================
      
      // Warm, rich analog low-pass filtered base pad
      const padOsc1 = ctx.createOscillator();
      const padOsc2 = ctx.createOscillator();
      const padFilter = ctx.createBiquadFilter();
      const padGain = ctx.createGain();

      padOsc1.type = 'triangle';
      padOsc1.frequency.setValueAtTime(110.00, now); // A2 Root
      padOsc2.type = 'sine';
      padOsc2.frequency.setValueAtTime(164.81, now); // E3 Perfect Fifth

      padFilter.type = 'lowpass';
      padFilter.frequency.setValueAtTime(150, now);
      padFilter.frequency.exponentialRampToValueAtTime(320, now + 3.0); // Gentle tension rise
      padFilter.frequency.exponentialRampToValueAtTime(750, now + 7.0); // Opens wide during build
      padFilter.frequency.exponentialRampToValueAtTime(250, now + 10.0); // Soft decay at resolve

      padGain.gain.setValueAtTime(0.001, now);
      padGain.gain.linearRampToValueAtTime(0.12, now + 3.0); // Swells up nicely
      padGain.gain.linearRampToValueAtTime(0.15, now + 7.0); // Sustains during build
      padGain.gain.exponentialRampToValueAtTime(0.001, now + 11.5); // Fades completely

      padOsc1.connect(padFilter);
      padOsc2.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(ctx.destination);

      padOsc1.start(now);
      padOsc2.start(now);
      padOsc1.stop(now + 12.0);
      padOsc2.stop(now + 12.0);

      // Soft digital hum (steady background warmth)
      const humOsc = ctx.createOscillator();
      const humFilter = ctx.createBiquadFilter();
      const humGain = ctx.createGain();

      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(55.00, now); // A1 sub harmonic

      humFilter.type = 'lowpass';
      humFilter.frequency.setValueAtTime(80, now);

      humGain.gain.setValueAtTime(0.001, now);
      humGain.gain.linearRampToValueAtTime(0.04, now + 1.5);
      humGain.gain.setValueAtTime(0.04, now + 8.0);
      humGain.gain.exponentialRampToValueAtTime(0.001, now + 11.0);

      humOsc.connect(humFilter);
      humFilter.connect(humGain);
      humGain.connect(ctx.destination);

      humOsc.start(now);
      humOsc.stop(now + 11.5);

      // Faint high-tech data-pulse ticks (t = 0.5s, 1.2s, 1.9s, 2.6s)
      const tickTimings = [0.5, 1.2, 1.9, 2.6];
      tickTimings.forEach((t) => {
        const tickOsc = ctx.createOscillator();
        const tickGain = ctx.createGain();
        
        tickOsc.type = 'sine';
        tickOsc.frequency.setValueAtTime(1800, now + t);
        
        tickGain.gain.setValueAtTime(0.001, now + t);
        tickGain.gain.linearRampToValueAtTime(0.015, now + t + 0.002);
        tickGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.012);

        tickOsc.connect(tickGain);
        tickGain.connect(ctx.destination);

        tickOsc.start(now + t);
        tickOsc.stop(now + t + 0.03);
      });

      // =========================================================================
      // PHASE 2 (3-7s): Soft rhythmic heartbeat pulses + Sparkling data arpeggio
      // =========================================================================
      
      // Rhythmic heartbeat/processing pulses
      const heartbeatTimes = [3.0, 3.6, 4.2, 4.8, 5.4, 6.0, 6.6];
      heartbeatTimes.forEach((t) => {
        const pulseOsc = ctx.createOscillator();
        const pulseFilter = ctx.createBiquadFilter();
        const pulseGain = ctx.createGain();

        pulseOsc.type = 'triangle';
        pulseOsc.frequency.setValueAtTime(110, now + t);
        pulseOsc.frequency.exponentialRampToValueAtTime(40, now + t + 0.15); // soft pitch drop

        pulseFilter.type = 'lowpass';
        pulseFilter.frequency.setValueAtTime(90, now + t);

        pulseGain.gain.setValueAtTime(0.001, now + t);
        pulseGain.gain.linearRampToValueAtTime(0.07, now + t + 0.01);
        pulseGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.18);

        pulseOsc.connect(pulseFilter);
        pulseFilter.connect(pulseGain);
        pulseGain.connect(ctx.destination);

        pulseOsc.start(now + t);
        pulseOsc.stop(now + t + 0.2);
      });

      // Sparkling data arpeggio (cascading crystal pentatonic notes)
      const arpeggioNotes = [
        { freq: 293.66, delay: 3.2 },  // D4
        { freq: 369.99, delay: 3.5 },  // F#4
        { freq: 440.00, delay: 3.8 },  // A4
        { freq: 493.88, delay: 4.1 },  // B4
        { freq: 587.33, delay: 4.4 },  // D5
        { freq: 739.99, delay: 4.7 },  // F#5
        { freq: 880.00, delay: 5.0 },  // A5
        { freq: 987.77, delay: 5.3 },  // B5
        { freq: 1174.66, delay: 5.6 }, // D6
        { freq: 1479.98, delay: 5.9 }, // F#6
        { freq: 1760.00, delay: 6.2 }, // A6
        { freq: 1975.53, delay: 6.5 }, // B6
        { freq: 2349.32, delay: 6.8 }  // D7
      ];

      arpeggioNotes.forEach((note) => {
        const arpOsc = ctx.createOscillator();
        const arpGain = ctx.createGain();

        arpOsc.type = 'sine';
        arpOsc.frequency.setValueAtTime(note.freq, now + note.delay);

        arpGain.gain.setValueAtTime(0.001, now + note.delay);
        arpGain.gain.linearRampToValueAtTime(0.02, now + note.delay + 0.03);
        arpGain.gain.exponentialRampToValueAtTime(0.001, now + note.delay + 0.4); // soft tail

        arpOsc.connect(arpGain);
        arpGain.connect(ctx.destination);

        arpOsc.start(now + note.delay);
        arpOsc.stop(now + note.delay + 0.5);
      });

      // =========================================================================
      // PHASE 3 (7-10s): Whoosh riser transition & crystalline climax impact
      // =========================================================================
      
      // Clean noise riser transition (Whoosh) from 6.8s to 8.0s
      try {
        const bufferSize = ctx.sampleRate * 1.5; // 1.5s of stereo noise
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const whooshSource = ctx.createBufferSource();
        whooshSource.buffer = buffer;

        const whooshFilter = ctx.createBiquadFilter();
        whooshFilter.type = 'bandpass';
        whooshFilter.Q.setValueAtTime(3.0, now + 6.8);
        whooshFilter.frequency.setValueAtTime(250, now + 6.8);
        whooshFilter.frequency.exponentialRampToValueAtTime(2500, now + 8.0); // swells up to climax

        const whooshGain = ctx.createGain();
        whooshGain.gain.setValueAtTime(0.001, now + 6.8);
        whooshGain.gain.linearRampToValueAtTime(0.035, now + 8.0); // peak whoosh
        whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 8.2); // instant post-climax decay

        whooshSource.connect(whooshFilter);
        whooshFilter.connect(whooshGain);
        whooshGain.connect(ctx.destination);

        whooshSource.start(now + 6.8);
        whooshSource.stop(now + 8.3);
      } catch (e) {
        console.warn('Noise riser skipped', e);
      }

      // Pitch sweep riser supporting the noise transition
      const riseOsc = ctx.createOscillator();
      const riseGain = ctx.createGain();
      riseOsc.type = 'sine';
      riseOsc.frequency.setValueAtTime(180, now + 6.8);
      riseOsc.frequency.exponentialRampToValueAtTime(640, now + 8.0);

      riseGain.gain.setValueAtTime(0.001, now + 6.8);
      riseGain.gain.linearRampToValueAtTime(0.02, now + 8.0);
      riseGain.gain.exponentialRampToValueAtTime(0.001, now + 8.1);

      riseOsc.connect(riseGain);
      riseGain.connect(ctx.destination);

      riseOsc.start(now + 6.8);
      riseOsc.stop(now + 8.2);

      // GIGANTIC CONFIDENT CLIMAX REVEAL (at t = 8.0s)
      const climaxTime = now + 8.0;

      // Crystalline Major 9th chime reveal chord (elegant, non-aggressive glass chimes)
      const chimeChord = [
        440.00,  // A4
        554.37,  // C#5
        659.25,  // E5
        830.61,  // G#5
        987.77,  // B5
        1318.51  // E6
      ];

      chimeChord.forEach((freq) => {
        const glassOsc = ctx.createOscillator();
        const glassFilter = ctx.createBiquadFilter();
        const glassGain = ctx.createGain();

        glassOsc.type = 'sine';
        glassOsc.frequency.setValueAtTime(freq, climaxTime);

        glassFilter.type = 'highpass';
        glassFilter.frequency.setValueAtTime(300, climaxTime);

        glassGain.gain.setValueAtTime(0.001, climaxTime);
        glassGain.gain.linearRampToValueAtTime(0.035, climaxTime + 0.05); // sharp crystal hit
        glassGain.gain.exponentialRampToValueAtTime(0.001, climaxTime + 2.5); // long ringout

        glassOsc.connect(glassFilter);
        glassFilter.connect(glassGain);
        glassGain.connect(ctx.destination);

        glassOsc.start(climaxTime);
        glassOsc.stop(climaxTime + 2.8);
      });

      // Warm, authoritative low sub thump (sub-bass grounding at 8.0s)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55.00, climaxTime); // A1 sub root
      subOsc.frequency.linearRampToValueAtTime(22.00, climaxTime + 1.8); // drops sub-audible

      subGain.gain.setValueAtTime(0.001, climaxTime);
      subGain.gain.linearRampToValueAtTime(0.48, climaxTime + 0.05); // heavy but warm reveal rumble
      subGain.gain.exponentialRampToValueAtTime(0.001, climaxTime + 2.0);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(climaxTime);
      subOsc.stop(climaxTime + 2.2);

      // =========================================================================
      // PHASE 4 (10-12s): Brand tone / sting resolve
      // =========================================================================
      const stingTime = now + 10.0;

      // Soft beautiful Major ending notes
      const stingFreqs = [880.00, 1318.51]; // A5 and E6 in perfect harmony
      stingFreqs.forEach((freq, idx) => {
        const stingOsc = ctx.createOscillator();
        const stingGain = ctx.createGain();

        stingOsc.type = 'sine';
        stingOsc.frequency.setValueAtTime(freq, stingTime);

        stingGain.gain.setValueAtTime(0.001, stingTime);
        // Soft delayed gentle attack
        stingGain.gain.linearRampToValueAtTime(0.035, stingTime + 0.08 + idx * 0.03); 
        stingGain.gain.exponentialRampToValueAtTime(0.001, stingTime + 2.0);

        stingOsc.connect(stingGain);
        stingGain.connect(ctx.destination);

        stingOsc.start(stingTime);
        stingOsc.stop(stingTime + 2.2);
      });

      // Ambient resolving warm background pad root holding softly
      const resolveOsc = ctx.createOscillator();
      const resolveFilter = ctx.createBiquadFilter();
      const resolveGain = ctx.createGain();

      resolveOsc.type = 'sine';
      resolveOsc.frequency.setValueAtTime(110.00, stingTime); // A2 Root

      resolveFilter.type = 'lowpass';
      resolveFilter.frequency.setValueAtTime(150, stingTime);

      resolveGain.gain.setValueAtTime(0.001, stingTime);
      resolveGain.gain.linearRampToValueAtTime(0.025, stingTime + 0.2);
      resolveGain.gain.exponentialRampToValueAtTime(0.001, stingTime + 2.0);

      resolveOsc.connect(resolveFilter);
      resolveFilter.connect(resolveGain);
      resolveGain.connect(ctx.destination);

      resolveOsc.start(stingTime);
      resolveOsc.stop(stingTime + 2.2);

    } catch (e) {
      console.warn('Audio Context error:', e);
    }
  };

  // Audio Context for realistic hum & switch click (Soft and premium synth sounds generated programmatically)
  const playSound = (type: 'flicker' | 'click' | 'hum' | 'type' | 'type-erase' | 'whoosh') => {
    if (!soundEnabled || !audioCtxRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      
      if (type === 'click') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'flicker') {
        const now = ctx.currentTime;
        for (let i = 0; i < 3; i++) {
          const t = now + i * 0.06 * Math.random();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(90 + Math.random() * 30, t);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.02);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.02);
        }
      } else if (type === 'type') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450 + Math.random() * 80, ctx.currentTime);
        gain.gain.setValueAtTime(0.015, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.02);
      } else if (type === 'type-erase') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320 + Math.random() * 50, ctx.currentTime);
        gain.gain.setValueAtTime(0.01, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.02);
      } else if (type === 'whoosh') {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.6);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch (e) {
      // ignore
    }
  };

  // Auto-initialize AudioContext for immediate playback & unlock on user interaction
  useEffect(() => {
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
    };

    try {
      initAudio();
      if (audioCtxRef.current && soundEnabled && !ambientPadRef.current) {
        startAmbientPad(audioCtxRef.current);
      }
    } catch (e) {}

    const unlock = () => {
      try {
        initAudio();
        if (audioCtxRef.current && soundEnabled && !ambientPadRef.current) {
          startAmbientPad(audioCtxRef.current);
        }
      } catch (e) {}
    };

    window.addEventListener('click', unlock);
    window.addEventListener('keydown', unlock);
    window.addEventListener('touchstart', unlock);

    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
  }, [soundEnabled]);

  // Progression of the entire luxury intro
  useEffect(() => {
    if (stage === 'loading') {
      if (soundEnabled && audioCtxRef.current) {
        startAmbientPad(audioCtxRef.current);
      }
      const loadTimer = setTimeout(() => {
        setStage('lamp-flicker');
      }, 2800);

      return () => clearTimeout(loadTimer);
    }
  }, [stage]);

  // Handle stage transitions and actions
  useEffect(() => {
    if (stage === 'lamp-flicker') {
      // Simulate classic flickering filament lamp turning on
      setTimeout(() => playSound('flicker'), 200);
      setTimeout(() => playSound('flicker'), 600);
      setTimeout(() => {
        playSound('click');
        playMbc2Intro();
        setLampOn(true);
        if (soundEnabled && audioCtxRef.current) {
          startHum(audioCtxRef.current);
        }
      }, 1200);

      const nextTimer = setTimeout(() => {
        setStage('typing-hello');
      }, 2000);

      return () => clearTimeout(nextTimer);
    }

    if (stage === 'typing-hello') {
      typeText('Hello...', 80, () => {
        setTimeout(() => {
          eraseText(() => {
            setStage('typing-im');
          });
        }, 1000);
      });
    }

    if (stage === 'typing-im') {
      typeText("I'm", 80, () => {
        setTimeout(() => {
          eraseText(() => {
            setStage('typing-name');
          });
        }, 800);
      });
    }

    if (stage === 'typing-name') {
      typeText('Karim Ezzat', 100, () => {
        setTimeout(() => {
          setStage('titles-ticker');
        }, 1200);
      });
    }

    if (stage === 'titles-ticker') {
      // Loop through titles sequence
      let currentIdx = 0;
      const interval = setInterval(() => {
        if (currentIdx < TITLES.length - 1) {
          currentIdx++;
          setCurrentTitleIndex(currentIdx);
          playSound('whoosh');
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setStage('quote');
          }, 1500);
        }
      }, 2200);

      return () => clearInterval(interval);
    }

    if (stage === 'quote') {
      playQuoteChime();
      const quoteTimer = setTimeout(() => {
        setStage('fade-out');
      }, 4000); // Displays quote for 2s, then fades out over 2s

      return () => clearTimeout(quoteTimer);
    }

    if (stage === 'fade-out') {
      fadeAllAmbient();
      const fadeTimer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(fadeTimer);
    }

  }, [stage]);

  // Typing simulator function
  const typeText = (target: string, speed: number, callback: () => void) => {
    let current = '';
    let index = 0;
    const interval = setInterval(() => {
      if (index < target.length) {
        current += target[index];
        setTypedText(current);
        playSound('type');
        index++;
      } else {
        clearInterval(interval);
        callback();
      }
    }, speed);
  };

  // Erasing simulator function
  const eraseText = (callback: () => void) => {
    const interval = setInterval(() => {
      setTypedText((prev) => {
        if (prev.length > 0) {
          playSound('type-erase');
          return prev.slice(0, -1);
        } else {
          clearInterval(interval);
          callback();
          return '';
        }
      });
    }, 40);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-slate-950 flex flex-col items-center justify-center select-none font-sans">
      
      {/* Absolute Header: Ambient Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
        {/* Luxury subtle logo mark */}
        <div className="flex items-center space-x-2 text-indigo-400 opacity-60">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase">KE • INTRO</span>
        </div>

        {/* Audio + Skip Button panel */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onComplete}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/20 hover:border-indigo-500 text-[10px] font-mono tracking-wider uppercase font-bold transition-all shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
          >
            Skip Intro
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">


        {/* STAGE 1: LUXURY LOADER */}
        {stage === 'loading' && (
          <motion.div
            key="loading-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            {/* Elegant Line Drawing Itself */}
            <div className="relative w-64 h-[1px] bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{
                  duration: 2.2,
                  ease: 'easeInOut',
                  repeat: 0,
                }}
                className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-indigo-500 to-transparent shadow-[0_0_8px_#6366f1]"
              />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col items-center space-y-1.5"
            >
              <span className="text-xs font-mono tracking-widest text-indigo-300 font-medium uppercase animate-pulse">
                Preparing Experience...
              </span>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                Data modeling • Interactive analytics
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* STAGES 2-8: THE CINEMATIC EXPERIENCE */}
        {stage !== 'loading' && stage !== 'gate' && (
          <motion.div
            key="cinematic-canvas"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full flex flex-col items-center justify-center"
          >
            
            {/* CEILING LAMP ILLUSTATION WITH LIGHT CONE SPOTLIGHT */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none z-10">
              {/* Wire Cord */}
              <div className="w-[1.5px] h-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-700 shadow-sm" />
              
              {/* Minimalist metal lamp cap */}
              <div className="w-8 h-3.5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-t-sm border-b border-slate-900" />
              
              {/* Small Bulb body */}
              <div className={`w-4 h-5 rounded-b-full transition-all duration-300 relative ${
                lampOn 
                  ? 'bg-indigo-100 shadow-[0_0_30px_#818cf8,0_0_10px_#ffffff]' 
                  : 'bg-slate-800 border border-slate-700'
              }`}>
                {/* Glow Core */}
                {lampOn && (
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1, 1.03, 0.98, 1.04, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-0.5 rounded-full bg-white opacity-85"
                  />
                )}
              </div>

              {/* STUNNING CONE OF LIGHT (SPOTLIGHT EFFECT) */}
              <div className={`transition-all duration-1000 origin-top h-[110vh] w-[140vw] max-w-[1200px] pointer-events-none absolute top-40 flex justify-center ${
                lampOn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                {/* Visual cone SVG / CSS gradient */}
                <div 
                  className="w-full h-full"
                  style={{
                    background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0.03) 40%, transparent 70%)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 90%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0) 90%)',
                  }}
                />
              </div>
            </div>

            {/* HIGH-END AMBIENT FLOATING PARTICLES (Dust in the spotlight) */}
            {lampOn && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
                {[...Array(24)].map((_, i) => {
                  const size = Math.random() * 3 + 1;
                  const duration = Math.random() * 12 + 8;
                  const delay = Math.random() * -10;
                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-indigo-300/30 blur-[0.5px]"
                      style={{
                        width: size,
                        height: size,
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 70 + 20}%`,
                      }}
                      animate={{
                        y: [-20, -180],
                        x: [0, Math.random() * 40 - 20],
                        opacity: [0, 0.6, 0.8, 0.3, 0],
                      }}
                      transition={{
                        duration: duration,
                        repeat: Infinity,
                        delay: delay,
                        ease: 'easeInOut',
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* CENTER TEXT PANEL (ZOOMS IN SLIGHTLY) */}
            <motion.div
              animate={{ 
                scale: stage === 'quote' ? 1.04 : 1,
                filter: lampOn ? 'blur(0px)' : 'blur(4px)',
              }}
              transition={{ duration: 6, ease: 'easeOut' }}
              className="z-20 text-center max-w-2xl px-6 flex flex-col items-center justify-center flex-grow"
            >
              <AnimatePresence mode="wait">
                
                {/* INTERACTIVE TYPING PHASES */}
                {(stage === 'typing-hello' || stage === 'typing-im' || stage === 'typing-name') && (
                  <motion.div
                    key="typing-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center space-y-2 h-24"
                  >
                    <span className="text-sm font-mono tracking-widest text-indigo-400 font-semibold uppercase">
                      {stage === 'typing-hello' ? 'INIT GREETING' : stage === 'typing-im' ? 'SPEAKER ID' : 'PORTFOLIO OF'}
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display text-white tracking-tight">
                      {typedText}
                      <span className="inline-block w-2.5 h-8 md:h-12 bg-indigo-500 ml-1.5 animate-pulse">|</span>
                    </h1>
                  </motion.div>
                )}

                {/* TITLES TICKER SEQUENCE */}
                {stage === 'titles-ticker' && (
                  <motion.div
                    key="titles-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center space-y-4 h-36"
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-[10px] font-mono tracking-widest text-indigo-400 font-semibold uppercase">PORTFOLIO OF</span>
                      <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                        Karim Ezzat
                      </h2>
                    </div>

                    <div className="h-[2px] w-12 bg-indigo-500 rounded-full my-1" />

                    <div className="relative h-12 overflow-hidden flex items-center justify-center w-full">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={currentTitleIndex}
                          initial={{ y: 24, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -24, opacity: 0 }}
                          transition={{ duration: 0.45, ease: 'easeOut' }}
                          className="text-lg sm:text-xl font-medium text-slate-200 tracking-wide font-sans text-center"
                        >
                          {TITLES[currentTitleIndex]}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* THE ELEGANT QUOTE */}
                {stage === 'quote' && (
                  <motion.div
                    key="quote-container"
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center space-y-6"
                  >
                    {/* Double quotation icon overlay */}
                    <span className="text-7xl font-serif text-indigo-500/20 leading-none h-4 pointer-events-none select-none">“</span>
                    
                    <p className="text-2xl sm:text-3xl font-bold font-display text-white max-w-md mx-auto leading-relaxed tracking-tight">
                      Turning Ideas Into Reality.
                    </p>
                    
                    <div className="flex items-center space-x-1.5 text-xs text-indigo-400 font-mono tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Ready to Explore</span>
                    </div>
                  </motion.div>
                )}

                {/* FINAL SMOOTH FADE OUT TO BLACK/APP */}
                {stage === 'fade-out' && (
                  <motion.div
                    key="fade-container"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                    className="flex flex-col items-center justify-center space-y-3"
                  >
                    <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase font-semibold">
                      LOADING SYSTEM INTERFACES
                    </span>
                    <div className="w-16 h-[2px] bg-indigo-500 rounded-full" />
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>

            {/* Bottom Accent footer */}
            <div className="absolute bottom-6 text-center opacity-30 text-[9px] font-mono text-slate-500 tracking-widest z-10">
              ATS COMPLIANT DATA BI PORTFOLIO • © 2026
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
