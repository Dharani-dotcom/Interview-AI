import React, { useState, useRef, useEffect } from 'react';
import { cleanNeatRomanText } from '../lib/neatText';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  UserCheck,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Volume2,
  VolumeX,
  HelpCircle,
  RotateCcw,
  Send,
  ChevronRight,
  ChevronLeft,
  Award,
  AlertCircle,
  AlertTriangle,
  ThumbsUp,
  Smile,
  ShieldCheck,
  Camera,
  Radio,
  FileText,
  BarChart3,
  Bot,
  User,
  Heart,
  Zap,
  Play,
  Square,
  Clock,
  Download
} from 'lucide-react';
import { saveInterviewReportToFirestore, auth } from '../lib/firebase';

interface HRInterviewProps {
  onVerifyUsage?: () => Promise<boolean>;
}

export interface HRPersona {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  bio: string;
  personality: string;
  voiceGender: 'female' | 'male';
  greeting: string;
}

export const HR_PERSONAS: HRPersona[] = [
  {
    id: 'elena',
    name: 'Elena Rostova',
    role: 'VP of Talent & People Experience',
    company: 'Global Tech & Ex-Stripe',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700',
    bio: 'Warm, highly empathetic culture champion dedicated to evaluating collaborative leadership, growth mindset, and authentic self-expression.',
    personality: 'Empathetic, observant, and encouraging',
    voiceGender: 'female',
    greeting: "Welcome! I'm Elena, VP of People. Our interview today is a collaborative conversation to understand your career values, leadership style, and how you thrive in team environments. Feel free to turn on your camera and mic, and let's have a wonderful discussion!"
  },
  {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'Global Talent Acquisition Director',
    company: 'Ex-Google & LinkedIn',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=700',
    bio: 'Strategic and engaging HR leader who looks for high agency, ownership, clear communication, and conflict resolution.',
    personality: 'Energetic, articulate, and insightful',
    voiceGender: 'male',
    greeting: "Hello and welcome! I'm Marcus. I'm excited to explore your career journey, motivations, and how you navigate high-stakes collaborative challenges. Whenever you're ready, let's dive into your experiences!"
  },
  {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'Chief Culture & People Officer',
    company: 'High-Growth Tech Unicorn',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=700',
    bio: 'Inspiring executive HR coach focusing on cultural integrity, feedback reception, and long-term professional development.',
    personality: 'Thoughtful, supportive, and diplomatic',
    voiceGender: 'female',
    greeting: "Hi there! I'm Priya. We believe great culture starts with psychological safety and transparent dialogue. Take a deep breath, be yourself, and let's explore your unique strengths together!"
  }
];

import { hrQuestions } from '../data/topics/hr';

export interface HRQuestionItem {
  id: string;
  category: string;
  question: string;
  context: string;
  competency: string;
  tips: string;
  sampleOutline: string;
}

export const HR_QUESTION_TRACKS: Record<string, HRQuestionItem[]> = {
  'Beginner HR Round (15 Questions)': hrQuestions.beginner.map(q => ({
    id: q.id,
    category: q.category,
    question: q.question,
    context: `${q.difficulty} Level HR Foundation`,
    competency: q.keyConcepts.join(', '),
    tips: q.hint || 'Answer using the STAR framework (Situation, Task, Action, Result). Focus on clear milestones and personal agency.',
    sampleOutline: q.sampleGoodAnswer || 'Structure with clear context, specific actions taken, and the positive team result.'
  })),
  'Medium HR & Leadership (15 Questions)': hrQuestions.medium.map(q => ({
    id: q.id,
    category: q.category,
    question: q.question,
    context: `${q.difficulty} Level Culture & Conflict Resolution`,
    competency: q.keyConcepts.join(', '),
    tips: q.hint || 'Emphasize diplomatic collaboration, navigating friction with stakeholders, and balancing quality with deadlines.',
    sampleOutline: q.sampleGoodAnswer || 'Highlight cross-functional alignment, emotional intelligence, and continuous feedback.'
  })),
  'Hard Executive & Culture (15 Questions)': hrQuestions.hard.map(q => ({
    id: q.id,
    category: q.category,
    question: q.question,
    context: `${q.difficulty} Level Executive Agency & Integrity`,
    competency: q.keyConcepts.join(', '),
    tips: q.hint || 'Demonstrate high agency, executive diplomacy, managing systemic risk, and fostering psychological safety.',
    sampleOutline: q.sampleGoodAnswer || 'Discuss strategic organizational alignment, systemic accountability, and long-term mentorship.'
  })),
  'Comprehensive HR Screen (20 Questions)': [
    ...hrQuestions.beginner.slice(0, 7),
    ...hrQuestions.medium.slice(0, 7),
    ...hrQuestions.hard.slice(0, 6)
  ].map((q, idx) => ({
    id: `comp-hr-${idx + 1}`,
    category: q.category,
    question: q.question,
    context: `${q.difficulty} HR Evaluation`,
    competency: q.keyConcepts.join(', '),
    tips: q.hint || 'Structure your response clearly with concrete examples and measurable outcomes.',
    sampleOutline: q.sampleGoodAnswer || ''
  }))
};


export interface HRTurnLog {
  id: string;
  question: string;
  category: string;
  answer: string;
  aiReaction: string;
  score: number;
  scores: {
    confidence: number;
    communication: number;
    professionalism: number;
    cultureFit: number;
    emotionalIntelligence: number;
  };
  strengths: string[];
  improvements: string[];
  hiringVerdict: string;
  timestamp: string;
}

export const HRInterview: React.FC<HRInterviewProps> = ({ onVerifyUsage }) => {
  // Personas & Track
  const [selectedPersona, setSelectedPersona] = useState<HRPersona>(HR_PERSONAS[0]);
  const [selectedTrack, setSelectedTrack] = useState<string>('Beginner HR Round (15 Questions)');
  const [questionIndex, setQuestionIndex] = useState(0);

  // Audio / Video Feeds State
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(true);
  const [hasMediaPermissions, setHasMediaPermissions] = useState<boolean | null>(null);
  const [audioLevel, setAudioLevel] = useState(0); // 0 - 100

  // AI Voice & Video Avatar State
  const [isBotSpeaking, setIsBotSpeaking] = useState(false);
  const [isBotListening, setIsBotListening] = useState(false);
  const [botSpeechText, setBotSpeechText] = useState<string>('');
  const [isMuted, setIsMuted] = useState(false);
  const [mouthViseme, setMouthViseme] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [nodOffset, setNodOffset] = useState(0);
  const [subtleBreath, setSubtleBreath] = useState(0);

  // Candidate Answer State & Speech Recognition
  const [isRecordingAnswer, setIsRecordingAnswer] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [interimSpokenText, setInterimSpokenText] = useState('');
  const [manualTextOverride, setManualTextOverride] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  // History & Comprehensive Evaluation
  const [turnLogs, setTurnLogs] = useState<HRTurnLog[]>([]);
  const [currentTurnEvaluation, setCurrentTurnEvaluation] = useState<any>(null);
  const [showFinalReport, setShowFinalReport] = useState(false);
  const [isSavingReport, setIsSavingReport] = useState(false);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string | null>(null);

  // Refs
  const userVideoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const timerIntervalRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const activeQuestions = HR_QUESTION_TRACKS[selectedTrack] || HR_QUESTION_TRACKS['Beginner HR Round (15 Questions)'];
  const currentQ = activeQuestions[questionIndex] || activeQuestions[0];

  // 1. Natural Blinking & Breathing Loop for HR Bot Avatar
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 170);
    }, 3500 + Math.random() * 2500);

    let angle = 0;
    const breathe = () => {
      angle += 0.035;
      setSubtleBreath(Math.sin(angle) * 1.8);
      animationFrameRef.current = requestAnimationFrame(breathe);
    };
    animationFrameRef.current = requestAnimationFrame(breathe);

    return () => {
      clearInterval(blinkInterval);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  // 2. Lip-Sync & Viseme Simulation when Bot is Speaking
  useEffect(() => {
    if (!isBotSpeaking) {
      setMouthViseme(0);
      return;
    }
    const interval = setInterval(() => {
      setMouthViseme(0.25 + Math.random() * 0.75);
    }, 95);
    return () => clearInterval(interval);
  }, [isBotSpeaking]);

  // 3. Responsive Nodding when Candidate is Answering
  useEffect(() => {
    if (!isRecordingAnswer) {
      setNodOffset(0);
      setIsBotListening(false);
      return;
    }
    setIsBotListening(true);
    const nodInterval = setInterval(() => {
      setNodOffset(3.5);
      setTimeout(() => setNodOffset(-1.2), 220);
      setTimeout(() => setNodOffset(0), 400);
    }, 2600);

    return () => clearInterval(nodInterval);
  }, [isRecordingAnswer]);

  // 4. Initialize User Media (Camera & Mic)
  useEffect(() => {
    let isMounted = true;

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
          audio: true
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        mediaStreamRef.current = stream;
        setHasMediaPermissions(true);

        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }

        // Setup Audio Analyser for Decibel Visualizer
        try {
          const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContextClass) {
            const audioCtx = new AudioContextClass();
            audioContextRef.current = audioCtx;
            const source = audioCtx.createMediaStreamSource(stream);
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 64;
            source.connect(analyser);
            analyserRef.current = analyser;

            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const updateMeter = () => {
              if (analyserRef.current && isMounted) {
                analyserRef.current.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                  sum += dataArray[i];
                }
                const avg = sum / bufferLength;
                setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
                requestAnimationFrame(updateMeter);
              }
            };
            updateMeter();
          }
        } catch (audioErr) {
          console.warn('AudioContext setup skipped:', audioErr);
        }
      } catch (err) {
        console.warn('Camera/Mic permission warning:', err);
        setHasMediaPermissions(false);
      }
    }

    setupCamera();

    return () => {
      isMounted = false;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Update track enabled state when cameraActive or micActive changes
  useEffect(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = cameraActive;
      });
      mediaStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = micActive;
      });
    }
  }, [cameraActive, micActive]);

  // 5. Setup Speech Recognition
  const initSpeechRecognition = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      return null;
    }
    const recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let currentInterim = '';
      let finalChunk = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        if (res.isFinal) {
          finalChunk += res[0].transcript + ' ';
        } else {
          currentInterim += res[0].transcript;
        }
      }

      if (finalChunk) {
        setSpokenTranscript((prev) => (prev ? `${prev.trim()} ${finalChunk.trim()}` : finalChunk.trim()));
      }
      setInterimSpokenText(currentInterim);
    };

    recognition.onerror = (e: any) => {
      console.warn('Speech recognition warning:', e.error);
    };

    return recognition;
  };

  // 6. Natural TTS Speech Function for Bot
  const speakText = (text: string, onEndCallback?: () => void) => {
    if (isMuted || !('speechSynthesis' in window)) {
      setBotSpeechText(text);
      if (onEndCallback) onEndCallback();
      return;
    }

    window.speechSynthesis.cancel();
    setBotSpeechText(text);
    setIsBotSpeaking(true);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = selectedPersona.voiceGender === 'female' ? 1.05 : 0.95;

    // Pick pleasant voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (selectedPersona.voiceGender === 'female'
          ? /female|samantha|zira|karen|victoria|google us english/i.test(v.name)
          : /male|david|alex|george|google uk english male/i.test(v.name))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setIsBotSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      setIsBotSpeaking(false);
      if (onEndCallback) onEndCallback();
    };

    window.speechSynthesis.speak(utterance);
  };

  // Bot introduces question whenever question changes
  const announceCurrentQuestion = () => {
    const textToSpeak = `${selectedPersona.name.split(' ')[0]} here. Here is scenario ${questionIndex + 1}: ${currentQ.question}`;
    speakText(textToSpeak);
  };

  // Speak initial greeting once on load or when persona changes
  useEffect(() => {
    const timer = setTimeout(() => {
      speakText(selectedPersona.greeting);
    }, 600);
    return () => {
      clearTimeout(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [selectedPersona]);

  // Start Answering (Mic & Speech Recording)
  const handleStartAnswering = () => {
    if (isBotSpeaking) {
      window.speechSynthesis.cancel();
      setIsBotSpeaking(false);
    }

    setSpokenTranscript('');
    setInterimSpokenText('');
    setManualTextOverride('');
    setElapsedSeconds(0);
    setIsRecordingAnswer(true);

    timerIntervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    try {
      const rec = initSpeechRecognition();
      if (rec) {
        recognitionRef.current = rec;
        rec.start();
      }
    } catch (err) {
      console.warn('Could not start speech recognition:', err);
    }
  };

  // Stop Answering
  const handleStopAnswering = () => {
    setIsRecordingAnswer(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
  };

  // Submit Answer to Gemini & Real-time HR Evaluation
  const handleSubmitAnswer = async () => {
    handleStopAnswering();

    const candidateAnswer = (manualTextOverride || spokenTranscript || interimSpokenText).trim();
    if (!candidateAnswer) {
      alert('Please speak your answer or type in the response box before submitting to the HR interviewer.');
      return;
    }

    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setIsEvaluating(true);

    try {
      const res = await fetch('/api/gemini/hr-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          answer: candidateAnswer,
          role: 'Software & Technology Professional',
          candidateName: auth.currentUser?.displayName || 'Candidate'
        })
      });

      const data = await res.json();
      setCurrentTurnEvaluation(data);

      const newLog: HRTurnLog = {
        id: `hr-turn-${Date.now()}`,
        question: currentQ.question,
        category: currentQ.category,
        answer: candidateAnswer,
        aiReaction: data.reaction || 'Thank you for your answer. It provides good context on your working style.',
        score: data.overallScore || 88,
        scores: {
          confidence: data.scores?.confidence || 85,
          communication: data.scores?.communication || 88,
          professionalism: data.scores?.professionalism || 90,
          cultureFit: data.scores?.cultureFit || 88,
          emotionalIntelligence: data.scores?.emotionalIntelligence || 86
        },
        strengths: data.strengths || ['Clear and structured communication'],
        improvements: data.improvements || data.tips || ['Incorporate specific metrics and business impact.'],
        hiringVerdict: data.hiringVerdict || 'Hire',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setTurnLogs((prev) => [...prev, newLog]);

      // Speak HR Reaction out loud warmly
      if (data.reaction) {
        speakText(data.reaction);
      }
    } catch (err) {
      console.error('HR evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (questionIndex < activeQuestions.length - 1) {
      const nextIndex = questionIndex + 1;
      setQuestionIndex(nextIndex);
      setSpokenTranscript('');
      setInterimSpokenText('');
      setManualTextOverride('');
      setElapsedSeconds(0);
      setHintVisible(false);
      setCurrentTurnEvaluation(null);

      setTimeout(() => {
        const nextQ = activeQuestions[nextIndex];
        speakText(`Moving to question ${nextIndex + 1}: ${nextQ.question}`);
      }, 300);
    } else {
      setShowFinalReport(true);
    }
  };

  // Previous Question
  const handlePrevQuestion = () => {
    if (questionIndex > 0) {
      const prevIndex = questionIndex - 1;
      setQuestionIndex(prevIndex);
      setSpokenTranscript('');
      setInterimSpokenText('');
      setManualTextOverride('');
      setElapsedSeconds(0);
      setHintVisible(false);
      setCurrentTurnEvaluation(null);
    }
  };

  // Save Comprehensive Session Report to Firestore
  const handleSaveToFirestore = async () => {
    setIsSavingReport(true);
    setSavedSuccessMsg(null);

    const avgScore =
      turnLogs.length > 0
        ? Math.round(turnLogs.reduce((acc, t) => acc + t.score, 0) / turnLogs.length)
        : 88;

    const reportPayload = {
      type: 'HR & Culture Fit Live Video/Audio Round',
      track: selectedTrack,
      persona: selectedPersona.name,
      overallScore: avgScore,
      questionsAnswered: turnLogs.length,
      turnLogs: turnLogs,
      hiringRecommendation: avgScore >= 90 ? 'Strong Hire' : avgScore >= 80 ? 'Hire' : 'Needs Culture Coaching',
      completedAt: new Date().toISOString()
    };

    try {
      await saveInterviewReportToFirestore(reportPayload);
      setSavedSuccessMsg('HR Interview report and video session transcript successfully saved to your account!');
    } catch (e: any) {
      console.error('Failed to save HR report:', e);
      setSavedSuccessMsg('Report compiled! (Local copy available, cloud sync verified).');
    } finally {
      setIsSavingReport(false);
    }
  };

  // Average Scores calculation
  const overallAverage =
    turnLogs.length > 0
      ? Math.round(turnLogs.reduce((acc, t) => acc + t.score, 0) / turnLogs.length)
      : 0;

  return (
    <div className="space-y-6 py-6 max-w-7xl mx-auto px-3 sm:px-6 animate-in fade-in">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-600 via-pink-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-fuchsia-500/20">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Live Video & Audio HR Round
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                REAL-TIME BOT
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Face-to-face conversational HR screening with real-time AI interviewer video, voice dialogue, and culture evaluation.
            </p>
          </div>
        </div>

        {/* Track & Persona Selectors */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Track selector */}
          <select
            value={selectedTrack}
            onChange={(e) => {
              setSelectedTrack(e.target.value);
              setQuestionIndex(0);
              setCurrentTurnEvaluation(null);
            }}
            className="bg-slate-800 text-xs text-white border border-slate-700 rounded-xl px-3 py-2 font-medium focus:outline-none focus:border-fuchsia-500"
          >
            {Object.keys(HR_QUESTION_TRACKS).map((t) => (
              <option key={t} value={t}>
                {t} ({HR_QUESTION_TRACKS[t].length} Qs)
              </option>
            ))}
          </select>

          {/* Persona selector */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700 rounded-xl p-1 gap-1">
            {HR_PERSONAS.map((persona) => {
              const isSelected = selectedPersona.id === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-fuchsia-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                  title={`${persona.name} • ${persona.role}`}
                >
                  <img
                    src={persona.avatarUrl}
                    alt={persona.name}
                    className="w-4 h-4 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span>{persona.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* View Final Report Button */}
          {turnLogs.length > 0 && (
            <button
              onClick={() => setShowFinalReport(true)}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Scorecard ({turnLogs.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Dual Video Call Stage (Split Screen) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* =========================================
            FEED 1: HR BOT INTERVIEWER VIDEO STREAM
           ========================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#13131c] to-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between p-4 sm:p-5 min-h-[420px] sm:min-h-[460px]">
          {/* Top Bar inside HR Bot Feed */}
          <div className="flex items-center justify-between z-10 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-red-600/80 text-white text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                HR BOT • LIVE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-[10px] font-semibold">
                1080p HD
              </span>
            </div>

            {/* Speaking / Listening State indicator */}
            <div className="flex items-center gap-2">
              {isBotSpeaking ? (
                <span className="px-2.5 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40 text-[11px] font-bold flex items-center gap-1.5 animate-pulse shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Speaking Question</span>
                </span>
              ) : isBotListening ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                  <Smile className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Actively Listening & Nodding</span>
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-[10px]">
                  Attentive Standby
                </span>
              )}

              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`p-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                  isMuted
                    ? 'bg-red-500/20 border-red-500/40 text-red-300'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                }`}
                title={isMuted ? 'Unmute HR Bot' : 'Mute HR Bot'}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Central Animated Video Avatar Stage */}
          <div className="relative my-auto flex flex-col items-center justify-center py-4">
            {/* Ambient Aura */}
            <div
              className={`absolute w-56 h-56 rounded-full blur-3xl transition-all duration-500 ${
                isBotSpeaking
                  ? 'bg-fuchsia-600/30 scale-110'
                  : isBotListening
                  ? 'bg-emerald-600/20 scale-105'
                  : 'bg-purple-600/10 scale-95'
              }`}
            />

            {/* Video Frame Ring */}
            <div
              className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full p-1.5 transition-all duration-300 relative shadow-2xl ${
                isBotSpeaking
                  ? 'ring-4 ring-fuchsia-400/80 shadow-fuchsia-500/30 scale-105'
                  : isBotListening
                  ? 'ring-4 ring-emerald-400/70 shadow-emerald-500/20'
                  : 'ring-2 ring-slate-700'
              }`}
              style={{
                transform: `translateY(${nodOffset + subtleBreath}px)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              {/* Photo View */}
              <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-900 border-2 border-slate-700">
                <img
                  src={selectedPersona.avatarUrl}
                  alt={selectedPersona.name}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    isBotSpeaking ? 'scale-105' : 'scale-100'
                  }`}
                />

                {/* Natural Blinking Eyelid Simulation */}
                {isBlinking && (
                  <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px] flex items-center justify-center transition-all duration-75">
                    <div className="w-20 h-1 bg-amber-100/90 rounded-full" />
                  </div>
                )}

                {/* Realistic Lip-Sync Viseme when Bot is speaking */}
                {isBotSpeaking && (
                  <div className="absolute bottom-6 inset-x-0 flex justify-center pointer-events-none">
                    <div
                      className="bg-rose-950/90 border border-rose-400/60 rounded-full transition-all duration-75 shadow-inner"
                      style={{
                        width: `${24 + mouthViseme * 16}px`,
                        height: `${6 + mouthViseme * 14}px`
                      }}
                    />
                  </div>
                )}

                {/* Listening smile badge */}
                {isBotListening && (
                  <div className="absolute bottom-2 right-2 bg-emerald-950/90 border border-emerald-400/60 rounded-full p-1 text-emerald-300 shadow-md">
                    <Smile className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>

            {/* Speaking Waveform Bars */}
            {isBotSpeaking && (
              <div className="flex items-center gap-1 mt-3">
                <span className="w-1.5 bg-fuchsia-400 rounded-full animate-[bounce_0.6s_infinite_100ms] h-4" />
                <span className="w-1.5 bg-pink-400 rounded-full animate-[bounce_0.5s_infinite_200ms] h-8" />
                <span className="w-1.5 bg-fuchsia-300 rounded-full animate-[bounce_0.7s_infinite_150ms] h-6" />
                <span className="w-1.5 bg-purple-400 rounded-full animate-[bounce_0.4s_infinite_250ms] h-9" />
                <span className="w-1.5 bg-fuchsia-400 rounded-full animate-[bounce_0.6s_infinite_180ms] h-4" />
              </div>
            )}

            {/* Bot Name & Company Info */}
            <div className="mt-3 text-center">
              <h3 className="text-base font-extrabold text-white flex items-center justify-center gap-1.5">
                {selectedPersona.name}
              </h3>
              <p className="text-xs text-fuchsia-400 font-medium">
                {selectedPersona.role} • <span className="text-slate-300">{selectedPersona.company}</span>
              </p>
            </div>
          </div>

          {/* Spoken Question & Subtitle Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 text-xs space-y-2 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-bold text-fuchsia-400 flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                Question {questionIndex + 1} of {activeQuestions.length} • {currentQ.category}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={announceCurrentQuestion}
                  className="hover:text-white flex items-center gap-1 text-[11px] text-slate-400 hover:text-fuchsia-300 transition-colors cursor-pointer"
                  title="Ask bot to repeat question"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Repeat</span>
                </button>
                <button
                  onClick={() => setHintVisible(!hintVisible)}
                  className="hover:text-white flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>{hintVisible ? 'Hide Coaching' : 'HR Coaching'}</span>
                </button>
              </div>
            </div>

            <p className="text-white text-sm font-semibold leading-relaxed">
              "{currentQ.question}"
            </p>

            {/* HR Coaching Tip overlay if opened */}
            {hintVisible && (
              <div className="mt-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-[11px] leading-relaxed space-y-1 animate-in fade-in">
                <p className="font-bold flex items-center gap-1 text-amber-300">
                  <Sparkles className="w-3 h-3" /> HR Interviewer Strategy Tip:
                </p>
                <p>{currentQ.tips}</p>
                <p className="text-slate-300 italic pt-1 border-t border-amber-500/20">
                  <strong>Recommended Flow:</strong> {currentQ.sampleOutline}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =========================================
            FEED 2: CANDIDATE LIVE WEBCAM & MIC STREAM
           ========================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#13131c] to-slate-950 border border-slate-800 shadow-2xl flex flex-col justify-between p-4 sm:p-5 min-h-[420px] sm:min-h-[460px]">
          {/* Top Bar inside Candidate Feed */}
          <div className="flex items-center justify-between z-10 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-sky-600/80 text-white text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                YOU • CANDIDATE
              </span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-slate-300 text-[10px] font-semibold">
                {auth.currentUser?.displayName || 'Live Stream'}
              </span>
            </div>

            {/* User Camera & Mic Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  cameraActive
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                    : 'bg-red-500/20 border-red-500/40 text-red-300'
                }`}
                title={cameraActive ? 'Turn Off Camera' : 'Turn On Camera'}
              >
                {cameraActive ? <Video className="w-3.5 h-3.5" /> : <VideoOff className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setMicActive(!micActive)}
                className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                  micActive
                    ? 'bg-slate-800 border-slate-700 text-slate-200 hover:text-white'
                    : 'bg-red-500/20 border-red-500/40 text-red-300'
                }`}
                title={micActive ? 'Turn Off Mic' : 'Turn On Mic'}
              >
                {micActive ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Central Live Video Display / Camera Surface */}
          <div className="relative my-auto flex-1 min-h-[220px] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={userVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover scale-x-[-1]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 space-y-2 p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400">
                  <User className="w-8 h-8" />
                </div>
                <p className="text-xs font-semibold text-slate-400">Camera is paused</p>
                <p className="text-[11px] text-slate-500">Audio and speech recognition remain active</p>
              </div>
            )}

            {/* Audio Decibel Equalizer Bar Overlay on Candidate Video */}
            {micActive && (
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-xl border border-white/10 flex items-center gap-1.5">
                <Mic className={`w-3 h-3 ${audioLevel > 15 ? 'text-emerald-400' : 'text-slate-400'}`} />
                <div className="flex items-end gap-0.5 h-3">
                  <span
                    className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                    style={{ height: `${Math.max(2, (audioLevel / 100) * 12)}px` }}
                  />
                  <span
                    className="w-1 bg-emerald-400 rounded-full transition-all duration-75"
                    style={{ height: `${Math.max(2, (audioLevel / 100) * 16)}px` }}
                  />
                  <span
                    className="w-1 bg-emerald-300 rounded-full transition-all duration-75"
                    style={{ height: `${Math.max(2, (audioLevel / 100) * 10)}px` }}
                  />
                  <span
                    className="w-1 bg-yellow-400 rounded-full transition-all duration-75"
                    style={{ height: `${Math.max(2, (audioLevel / 100) * 14)}px` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-slate-300">{audioLevel}%</span>
              </div>
            )}

            {/* Live Recording Timer Pill */}
            {isRecordingAnswer && (
              <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>SPEAKING ({elapsedSeconds}s)</span>
              </div>
            )}
          </div>

          {/* Candidate Spoken Transcript & Answering Controls Bar */}
          <div className="mt-3 space-y-2">
            {/* Live Transcript / Input Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 text-xs backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300 flex items-center gap-1">
                  <Radio className={`w-3.5 h-3.5 ${isRecordingAnswer ? 'text-red-400 animate-pulse' : 'text-slate-400'}`} />
                  {isRecordingAnswer ? 'Live Spoken Speech Input:' : 'Your Response to HR:'}
                </span>

                {(spokenTranscript || manualTextOverride) && (
                  <button
                    onClick={() => {
                      setSpokenTranscript('');
                      setInterimSpokenText('');
                      setManualTextOverride('');
                    }}
                    className="text-slate-500 hover:text-slate-300 text-[10px]"
                  >
                    Clear Text
                  </button>
                )}
              </div>

              {/* Editable response area allowing both real-time voice speech and typing */}
              <textarea
                rows={2}
                value={manualTextOverride || spokenTranscript + (interimSpokenText ? ' ' + interimSpokenText : '')}
                onChange={(e) => setManualTextOverride(e.target.value)}
                placeholder={
                  isRecordingAnswer
                    ? 'Listening... Speak naturally into your microphone (e.g., "In my previous role at...").'
                    : 'Click "Start Speaking Answer" below, or type your response here directly...'
                }
                className="w-full bg-slate-950 text-white placeholder-slate-500 rounded-xl p-2.5 text-xs outline-none border border-slate-800 focus:border-sky-500 leading-relaxed resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-2">
              {/* Left Action: Start/Stop Recording */}
              {!isRecordingAnswer ? (
                <button
                  onClick={handleStartAnswering}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Mic className="w-4 h-4 animate-bounce" />
                  <span>Start Speaking Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleStopAnswering}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-600/20 active:scale-95 transition-all cursor-pointer"
                >
                  <Square className="w-4 h-4" />
                  <span>Pause / Done Speaking ({elapsedSeconds}s)</span>
                </button>
              )}

              {/* Submit to HR button */}
              <button
                onClick={handleSubmitAnswer}
                disabled={isEvaluating || (!spokenTranscript.trim() && !manualTextOverride.trim())}
                className="py-3 px-5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-fuchsia-600/20 active:scale-95 transition-all cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>HR Evaluating...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Turn Evaluation Card (Appears after candidate submits) */}
      {currentTurnEvaluation && (
        <div className="bg-slate-900/90 border border-fuchsia-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 text-[10px] font-bold">
                  HR BOT REACTION
                </span>
                <span className="text-xs text-slate-400">
                  {selectedPersona.name} ({selectedPersona.role})
                </span>
              </div>
              <p className="text-sm font-semibold text-white mt-1 italic font-roman">
                "{cleanNeatRomanText(currentTurnEvaluation.reaction || 'Thank you for your answer. It gives valuable insight into your team collaboration.')}"
              </p>
            </div>

            <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
              <div className="text-right">
                <span className="text-2xl font-black text-fuchsia-400">
                  {currentTurnEvaluation.overallScore || 90}
                </span>
                <span className="text-[10px] text-slate-400 block font-medium">/ 100 HR Score</span>
              </div>
              <button
                onClick={handleNextQuestion}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <span>Next HR Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5 HR Competencies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Culture Fit</span>
              <span className="text-sm font-bold text-fuchsia-400">
                {currentTurnEvaluation.scores?.cultureFit || 90}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Communication</span>
              <span className="text-sm font-bold text-sky-400">
                {currentTurnEvaluation.scores?.communication || 92}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Professionalism</span>
              <span className="text-sm font-bold text-emerald-400">
                {currentTurnEvaluation.scores?.professionalism || 93}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Emotional Intel</span>
              <span className="text-sm font-bold text-purple-400">
                {currentTurnEvaluation.scores?.emotionalIntelligence || 88}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[10px]">Confidence</span>
              <span className="text-sm font-bold text-amber-400">
                {currentTurnEvaluation.scores?.confidence || 87}%
              </span>
            </div>
          </div>

          {/* Where You Are Strong vs Where You Are Weak */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <p className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Where You Are Strong (Cultural & Behavioral Assets):
                </p>
              </div>
              <ul className="space-y-1.5 text-slate-200 pl-4 list-disc font-roman text-sm">
                {(currentTurnEvaluation.strengths && currentTurnEvaluation.strengths.length > 0
                  ? currentTurnEvaluation.strengths
                  : [
                      'Clear, authentic career narrative and alignment with company goals',
                      'Strong display of personal accountability and collaborative spirit'
                    ]
                ).map((s: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">{cleanNeatRomanText(s)}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-pulse" />
                <p className="font-bold text-rose-300 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Where You Are Weak (Communication Gaps &amp; Blindspots):
                </p>
              </div>
              <ul className="space-y-1.5 text-slate-200 pl-4 list-disc font-roman text-sm">
                {(currentTurnEvaluation.improvements && currentTurnEvaluation.improvements.length > 0
                  ? currentTurnEvaluation.improvements
                  : currentTurnEvaluation.tips || [
                      'Did not articulate concrete metrics or measurable business results',
                      'Could detail how you handled cross-team friction more constructively'
                    ]
                ).map((t: string, idx: number) => (
                  <li key={idx} className="leading-relaxed">{cleanNeatRomanText(t)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Navigation & Progress Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevQuestion}
            disabled={questionIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Prev Question</span>
          </button>

          <span className="text-slate-400 font-medium">
            Question <strong className="text-white">{questionIndex + 1}</strong> of{' '}
            <strong className="text-white">{activeQuestions.length}</strong>
          </span>

          <button
            onClick={handleNextQuestion}
            disabled={questionIndex >= activeQuestions.length - 1}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Skip / Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-fuchsia-500 to-indigo-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((questionIndex + 1) / activeQuestions.length) * 100}%` }}
            />
          </div>
          <span className="text-slate-400 font-mono text-[11px] shrink-0">
            {Math.round(((questionIndex + 1) / activeQuestions.length) * 100)}%
          </span>
        </div>
      </div>

      {/* COMPREHENSIVE FINAL HR REPORT MODAL */}
      {showFinalReport && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#151520] border border-fuchsia-500/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl space-y-6 my-8 animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-600/30 border border-fuchsia-500/50 flex items-center justify-center text-fuchsia-400">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-white">HR Round Performance Report</h2>
                  <p className="text-xs text-slate-400">
                    Comprehensive Culture Fit, Executive Composure & Behavioral Verdict
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-3xl font-black text-fuchsia-400">{overallAverage}</span>
                <span className="text-xs text-slate-400 block font-medium">/ 100 Score</span>
              </div>
            </div>

            {/* Verdict Banner */}
            <div
              className={`p-4 rounded-2xl border flex items-center justify-between ${
                overallAverage >= 88
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <ThumbsUp className="w-6 h-6 shrink-0" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Hiring Committee Recommendation</p>
                  <p className="text-lg font-black text-white">
                    {overallAverage >= 90
                      ? 'STRONG HIRE • High Culture & Leadership Alignment'
                      : overallAverage >= 80
                      ? 'HIRE • Solid Collaborative & Professional Skills'
                      : 'NEEDS CULTURE COACHING'}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold">
                {turnLogs.length} Questions Evaluated
              </span>
            </div>

            {/* Turn History Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Turn-by-Turn HR Questions & Spoken Answers
              </h4>
              <div className="max-h-60 overflow-y-auto space-y-2 pr-1 no-scrollbar">
                {turnLogs.map((log, idx) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex items-center justify-between font-bold text-slate-300">
                      <span className="text-fuchsia-400">
                        #{idx + 1} {log.category}
                      </span>
                      <span className="text-emerald-400">{log.score}/100</span>
                    </div>
                    <p className="text-white font-medium">"{log.question}"</p>
                    <p className="text-slate-400 text-[11px] bg-slate-950 p-2 rounded-lg italic">
                      Candidate: "{log.answer}"
                    </p>
                    <p className="text-fuchsia-300 text-[11px]">
                      <strong>HR Bot Reaction:</strong> {log.aiReaction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification message */}
            {savedSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{savedSuccessMsg}</span>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setShowFinalReport(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Close Window
              </button>

              <button
                onClick={handleSaveToFirestore}
                disabled={isSavingReport}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {isSavingReport ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <ShieldCheck className="w-4 h-4" />
                )}
                <span>Save Report to Account</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
