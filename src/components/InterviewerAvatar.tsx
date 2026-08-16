import React, { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Heart, Smile, MessageCircle, Mic, HelpCircle } from 'lucide-react';

export interface InterviewerPersona {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  bio: string;
  personality: string;
  voiceGender: 'female' | 'male';
  accent: string;
  greetingMessage: string;
}

export const INTERVIEWER_PERSONAS: InterviewerPersona[] = [
  {
    id: 'sarah',
    name: 'Dr. Sarah Jenkins',
    role: 'Principal Software Architect',
    company: 'Ex-Google & Stripe',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
    bio: 'Warm, encouraging systems leader who loves hearing how candidates think through trade-offs and distributed design.',
    personality: 'Supportive, insightful, and friendly',
    voiceGender: 'female',
    accent: 'en-US',
    greetingMessage: "Hi there! I'm Sarah. I'm excited to chat with you today! Don't stress—think of this as a collaborative technical discussion. Whenever you're ready, let's explore your ideas!",
  },
  {
    id: 'david',
    name: 'David Vance',
    role: 'Director of Engineering',
    company: 'Ex-Amazon & Meta',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    bio: 'Energetic mentor specializing in algorithms, data pipelines, and clean pragmatic coding.',
    personality: 'Enthusiastic, approachable, and encouraging',
    voiceGender: 'male',
    accent: 'en-US',
    greetingMessage: "Hey! Welcome! I'm David. Really glad you're here. We'll work through some practical challenges together. Take all the time you need to think through your approach!",
  },
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'Head of Talent & Engineering People',
    company: 'Global Tech Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
    bio: 'Empathetic behavioral and HR partner who focuses on growth mindset, team leadership, and communication.',
    personality: 'Empathetic, warm, and conversational',
    voiceGender: 'female',
    accent: 'en-US',
    greetingMessage: "Hello! I'm Elena. I'm so pleased to meet you! Our conversation today is all about understanding your strengths, passions, and how you love to collaborate. Feel free to be yourself!",
  }
];

interface InterviewerAvatarProps {
  isSpeaking: boolean;
  isListening?: boolean;
  selectedPersona?: InterviewerPersona;
  currentSpeechText?: string;
  onAskHint?: () => void;
  onRephraseQuestion?: () => void;
  audioLevel?: number; // 0 to 100
}

export const InterviewerAvatar: React.FC<InterviewerAvatarProps> = ({
  isSpeaking,
  isListening = false,
  selectedPersona = INTERVIEWER_PERSONAS[0],
  currentSpeechText,
  onAskHint,
  onRephraseQuestion,
  audioLevel = 0,
}) => {
  const [mouthOpen, setMouthOpen] = useState(0); // 0 (closed) to 1 (wide)
  const [isBlinking, setIsBlinking] = useState(false);
  const [nodOffset, setNodOffset] = useState(0);
  const [subtleBreath, setSubtleBreath] = useState(0);

  // Natural Blinking Interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 3800 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Ambient Breathing & Subtle Posture Movement
  useEffect(() => {
    let frameId: number;
    let angle = 0;

    const animate = () => {
      angle += 0.03;
      setSubtleBreath(Math.sin(angle) * 1.5);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Responsive Listening Nodding
  useEffect(() => {
    if (!isListening) {
      setNodOffset(0);
      return;
    }

    const nodInterval = setInterval(() => {
      // Periodic subtle listening nod
      setNodOffset(3);
      setTimeout(() => setNodOffset(-1), 250);
      setTimeout(() => setNodOffset(0), 450);
    }, 2800);

    return () => clearInterval(nodInterval);
  }, [isListening]);

  // Synchronized Lip-Sync & Viseme Simulation when AI is speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(0);
      return;
    }

    let intervalId: any;
    // Rapid dynamic mouth movement simulating syllables and vowels
    intervalId = setInterval(() => {
      const randomViseme = 0.2 + Math.random() * 0.8;
      setMouthOpen(randomViseme);
    }, 110);

    return () => clearInterval(intervalId);
  }, [isSpeaking]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-850 to-slate-950 border border-slate-750 p-4 flex flex-col justify-between shadow-lg text-white">
      {/* Top Header / Status Badges */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-100">{selectedPersona.name}</span>
          <span className="text-[10px] text-sky-300 font-medium px-2 py-0.5 rounded-full bg-sky-950/80 border border-sky-600/40">
            {selectedPersona.role}
          </span>
        </div>

        {/* Live Emotional State */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold">
          {isSpeaking ? (
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1.5 animate-pulse shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Speaking to you</span>
            </span>
          ) : isListening ? (
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5 shadow-sm">
              <Smile className="w-3.5 h-3.5 text-emerald-300" />
              <span>Listening attentively & nodding</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
              <Heart className="w-3 h-3 text-rose-400" />
              <span>Friendly Standby</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Lifelike Avatar Stage */}
      <div className="relative my-4 flex flex-col items-center justify-center min-h-[220px]">
        {/* Ambient Glow Aura */}
        <div
          className={`absolute w-52 h-52 rounded-full blur-2xl transition-all duration-500 ${
            isSpeaking
              ? 'bg-sky-500/25 scale-110'
              : isListening
              ? 'bg-emerald-500/20 scale-105'
              : 'bg-indigo-500/10 scale-95'
          }`}
        />

        {/* Outer Pulsing Soundwave Rings */}
        <div className="relative">
          <div
            className={`w-40 h-40 sm:w-44 sm:h-44 rounded-full p-1 transition-all duration-300 relative shadow-2xl ${
              isSpeaking
                ? 'ring-4 ring-sky-400/70 shadow-sky-500/30 scale-105'
                : isListening
                ? 'ring-4 ring-emerald-400/60 shadow-emerald-500/20'
                : 'ring-2 ring-slate-600'
            }`}
            style={{
              transform: `translateY(${nodOffset + subtleBreath}px)`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            {/* Person Photo Avatar */}
            <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900 border-2 border-slate-700">
              <img
                src={selectedPersona.avatarUrl}
                alt={selectedPersona.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isSpeaking ? 'scale-105' : 'scale-100'
                }`}
              />

              {/* Natural Blinking Eyelid Overlay */}
              {isBlinking && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px] transition-all duration-75 flex items-center justify-center">
                  <div className="w-16 h-1 bg-amber-100/90 rounded-full" />
                </div>
              )}

              {/* Lifelike Lip-Sync Mouth Animation Overlay */}
              {isSpeaking && (
                <div className="absolute bottom-5 inset-x-0 flex justify-center pointer-events-none">
                  <div
                    className="bg-rose-950/90 border border-rose-400/50 rounded-full transition-all duration-75 shadow-inner"
                    style={{
                      width: `${22 + mouthOpen * 14}px`,
                      height: `${6 + mouthOpen * 12}px`,
                    }}
                  />
                </div>
              )}

              {/* Listening Smile Indicator Overlay */}
              {isListening && (
                <div className="absolute bottom-2 right-2 bg-emerald-950/85 border border-emerald-400/60 rounded-full p-1 text-emerald-300 shadow-md">
                  <Smile className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          </div>

          {/* Equalizer Sound Waves during Speech */}
          {isSpeaking && (
            <div className="absolute -bottom-3 inset-x-0 flex items-center justify-center gap-1">
              <span className="w-1 bg-sky-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-4" />
              <span className="w-1 bg-sky-300 rounded-full animate-[bounce_0.5s_infinite_200ms] h-7" />
              <span className="w-1 bg-sky-400 rounded-full animate-[bounce_0.7s_infinite_150ms] h-5" />
              <span className="w-1 bg-sky-200 rounded-full animate-[bounce_0.4s_infinite_250ms] h-8" />
              <span className="w-1 bg-sky-400 rounded-full animate-[bounce_0.6s_infinite_180ms] h-4" />
            </div>
          )}
        </div>

        {/* Persona Info & Company Tag */}
        <div className="mt-4 text-center space-y-0.5">
          <p className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
            {selectedPersona.name}
            <span className="text-[10px] text-amber-300 font-normal">({selectedPersona.company})</span>
          </p>
          <p className="text-xs text-sky-200/90 italic max-w-xs mx-auto">
            "{selectedPersona.personality}"
          </p>
        </div>
      </div>

      {/* Dynamic Conversational Subtitles Bar */}
      {isSpeaking && currentSpeechText && (
        <div className="mt-2 bg-slate-900/95 border border-sky-400/40 rounded-xl p-2.5 text-xs text-sky-100 shadow-lg text-center animate-in fade-in">
          <span className="text-amber-300 font-bold">"{selectedPersona.name.split(' ')[0]}: "</span>
          <span className="font-medium">
            {currentSpeechText.length > 110 ? currentSpeechText.slice(0, 110) + '...' : currentSpeechText}
          </span>
        </div>
      )}

      {/* Real-time Interaction Bar: Ask for a hint or clarification */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1 text-[11px] text-slate-400">
          <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
          <span>Interactive Mentor</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onAskHint && (
            <button
              type="button"
              onClick={onAskHint}
              className="px-2.5 py-1 rounded-lg bg-sky-950 hover:bg-sky-900 border border-sky-500/40 text-sky-300 text-[11px] font-semibold flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3 h-3 text-sky-300" />
              <span>Friendly Hint</span>
            </button>
          )}

          {onRephraseQuestion && (
            <button
              type="button"
              onClick={onRephraseQuestion}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
            >
              <span>Explain Simpler</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
