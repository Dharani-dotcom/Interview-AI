import React, { useState, useEffect, useRef } from 'react';
import { VoiceAnalysisResult } from '../types';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  AlertTriangle,
  Clock,
  Activity,
  CheckCircle2,
  Brain
} from 'lucide-react';

export const VoiceInterview: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string>('Java & Spring Boot');
  const [isRecording, setIsRecording] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<VoiceAnalysisResult | null>(null);

  const topicQuestionsMap: Record<string, string[]> = {
    'Java & Spring Boot': [
      'Explain Java memory management: Heap, Stack, Metaspace, and Garbage Collection tuning.',
      'How do Java Spring Boot annotations like @Transactional, @Autowired, and @Bean function under the hood?',
      'Explain thread synchronization, volatile keyword, and ConcurrentHashMap implementation in Java.'
    ],
    'C++ & STL': [
      'Explain memory management in C++: raw pointers, std::unique_ptr, std::shared_ptr, and move semantics.',
      'What are RAII, virtual method tables (vtable), and memory alignment in modern C++?',
      'How do templates, concepts, and constexpr optimize performance in high-frequency C++ applications?'
    ],
    'Python & Data Science': [
      'Explain Python Global Interpreter Lock (GIL), multi-threading vs multi-processing, and asyncio event loops.',
      'How do list comprehensions, decorators, and memory management (reference counting + cyclic GC) work in Python?',
      'Describe how you optimize Python data pipelines using NumPy vectorization or Cython.'
    ],
    'Database & SQL': [
      'Explain B-Tree vs LSM-Tree indexes, query execution plans, and EXPLAIN ANALYZE in PostgreSQL / MySQL.',
      'How do ACID properties, transaction isolation levels, and locks prevent race conditions in SQL databases?',
      'Describe strategies for database sharding, connection pooling, and zero-downtime schema migrations.'
    ],
    'JavaScript & React': [
      'Explain the JavaScript Event Loop, Microtasks vs Macrotasks, Closures, and Execution Context.',
      'How does React Virtual DOM reconciliation fiber algorithm optimize DOM mutations?',
      'Explain state management patterns, SSR vs SSG vs Streaming SSR, and web performance optimization.'
    ],
    'System Design': [
      'How do you design a high-throughput rate limiter capable of handling 1,000,000 requests per second?',
      'Explain how you build distributed cache invalidation strategies using Redis and CDN edge caching.',
      'Walk me through designing a real-time messaging queue with Kafka, partition keys, and consumer groups.'
    ]
  };

  const currentQuestions = topicQuestionsMap[selectedTopic] || topicQuestionsMap['Java & Spring Boot'];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setMicStatusMsg('Speech recognition active. Listening to microphone...');
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = 0; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        if (currentText.trim()) {
          setTranscript(currentText);
        }
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e.error);
        if (e.error === 'not-allowed') {
          setMicStatusMsg('Microphone access blocked. Click "Allow Microphone Access" to grant permissions.');
        } else if (e.error === 'audio-capture') {
          setMicStatusMsg('No microphone capture device detected.');
        }
      };

      recognition.onend = () => {
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (err) {}
        }
      };

      recognitionRef.current = recognition;
    } else {
      setMicStatusMsg('Speech recognition API not supported in this browser. You can type directly into the box.');
    }
  }, []);

  const requestMicPermission = async (): Promise<boolean> => {
    setMicStatusMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicActive(true);
      setMicStatusMsg('Microphone permission granted.');
      return true;
    } catch (err) {
      console.error('Mic access denied:', err);
      setMicActive(false);
      setMicStatusMsg('Microphone access denied. Please click allow permissions in your browser.');
      return false;
    }
  };

  const speakText = (text: string) => {
    if (!speechSynthesisActive || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleStartVoice = async () => {
    await requestMicPermission();
    setIsRecording(true);
    setSeconds(0);
    setTranscript('');
    setAnalysis(null);

    // Speak AI question first
    speakText(currentQuestions[currentQuestionIndex]);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start error', e);
      }
    }
  };

  const handleStopVoiceAndAnalyze = async () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    setLoading(true);

    const userSpeechText = transcript.trim();
    if (!userSpeechText) {
      alert('Please speak into the microphone or type your response in the transcript box below before evaluating.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/gemini/voice-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestions[currentQuestionIndex],
          userTranscript: userSpeechText,
          audioMetrics: { durationSeconds: seconds, estimatedWords: userSpeechText.split(' ').length },
        }),
      });

      const result = await res.json();
      setAnalysis(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Realtime Speech & Acoustic AI
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">AI Voice Interview Simulator</h2>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Select your technology topic below and speak your answers directly into the microphone. Our AI evaluates confidence, pace, fluency, filler words, and pronunciation.
        </p>
      </div>

      {/* TOPIC SELECTION BUTTONS */}
      <div className="glass-card p-4 rounded-2xl border-slate-200 bg-white shadow-2xs space-y-2">
        <label className="block text-xs font-bold text-slate-800">Choose Programming Language / Interview Topic:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Object.keys(topicQuestionsMap).map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSelectedTopic(topic);
                setCurrentQuestionIndex(0);
                setAnalysis(null);
                setTranscript('');
              }}
              className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all border ${
                selectedTopic === topic
                  ? 'bg-sky-50 text-sky-800 border-sky-400 font-bold shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Voice Control Card */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border-slate-200 bg-white shadow-sm space-y-6">
        {/* Question Banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-sky-600" /> {selectedTopic} • Question #{currentQuestionIndex + 1}
            </span>
            <button
              onClick={() => {
                const nextI = (currentQuestionIndex + 1) % currentQuestions.length;
                setCurrentQuestionIndex(nextI);
                speakText(currentQuestions[nextI]);
              }}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
            >
              Next Question →
            </button>
          </div>
          <p className="text-sm font-bold text-slate-900 leading-relaxed">
            "{currentQuestions[currentQuestionIndex]}"
          </p>
        </div>

        {/* Mic & Waveform Area */}
        <div className="flex flex-col items-center justify-center py-8 space-y-6 bg-slate-950/60 rounded-xl border border-slate-800/80">
          {/* Animated sound waves when recording or speaking */}
          <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-md px-4">
            {[30, 60, 90, 45, 100, 70, 40, 85, 30, 95, 60, 40, 75, 90, 50, 80, 40].map((h, i) => (
              <div
                key={i}
                className={`w-1.5 rounded-full transition-all duration-300 ${
                  isRecording || isAiSpeaking
                    ? 'bg-gradient-to-t from-cyan-400 via-indigo-500 to-purple-500 animate-pulse'
                    : 'bg-slate-800 h-2'
                }`}
                style={{
                  height: isRecording || isAiSpeaking ? `${h}%` : '8px',
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>

          {/* Big Mic Button */}
          <div className="relative">
            {isRecording && (
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping pointer-events-none" />
            )}
            <button
              onClick={isRecording ? handleStopVoiceAndAnalyze : handleStartVoice}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isRecording
                  ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white glow-purple'
                  : 'gradient-btn text-white glow-cyan'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          {/* Timer & Status */}
          <div className="text-center space-y-1">
            <p className="text-xl font-mono font-bold text-white flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              {formatTimer(seconds)}
            </p>
            <p className="text-xs text-slate-400">
              {isRecording
                ? 'Listening... Click mic again when finished speaking'
                : isAiSpeaking
                ? 'AI is speaking question out loud...'
                : 'Click mic button to start speaking'}
            </p>

            {!micActive && (
              <button
                type="button"
                onClick={requestMicPermission}
                className="mt-2 px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs"
              >
                <Mic className="w-3.5 h-3.5" /> Grant Microphone Access
              </button>
            )}
          </div>

          {micStatusMsg && (
            <div className="mx-auto max-w-md p-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 text-xs font-medium text-center">
              {micStatusMsg}
            </div>
          )}
        </div>

        {/* Live Transcript Display & Edit */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider">Live Speech / Typed Transcript</span>
            <span className="text-[11px] text-slate-500">Auto-captured or type directly</span>
          </div>
          <textarea
            rows={3}
            value={transcript}
            placeholder={isRecording ? 'Listening for your speech input...' : 'Click mic to record or type your response here...'}
            onChange={(e) => setTranscript(e.target.value)}
            className="w-full p-3 rounded-lg glass-input text-xs text-slate-200"
          />
          <button
            onClick={handleStopVoiceAndAnalyze}
            disabled={loading}
            className="w-full mt-2 gradient-btn py-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            <span>Evaluate Voice Response with AI</span>
          </button>
        </div>

        {/* Speech Synthesis Toggle */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>AI Voice Output (Text-to-Speech)</span>
          <button
            onClick={() => setSpeechSynthesisActive(!speechSynthesisActive)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 hover:text-white"
          >
            {speechSynthesisActive ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            <span>{speechSynthesisActive ? 'TTS Enabled' : 'TTS Muted'}</span>
          </button>
        </div>
      </div>

      {/* ANALYSIS BREAKDOWN REPORT */}
      {loading && (
        <div className="p-6 rounded-2xl glass-card border-slate-800 text-center space-y-3">
          <Activity className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
          <p className="text-sm font-bold text-white">Analyzing Speech Acoustics & Content...</p>
        </div>
      )}

      {analysis && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-cyan-500/40 space-y-6 shadow-2xl animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" /> Voice Performance Scorecard
              </h3>
              <p className="text-xs text-slate-400">AI analysis of vocal tone, cadence, and grammar</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-cyan-400">{analysis.overallScore}</span>
              <span className="text-xs text-slate-400 block">/ 100 Score</span>
            </div>
          </div>

          {/* 5 Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Confidence</span>
              <span className="text-sm font-bold text-cyan-300">{analysis.metrics.confidence}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Grammar</span>
              <span className="text-sm font-bold text-purple-300">{analysis.metrics.grammar}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Pace / Speed</span>
              <span className="text-sm font-bold text-indigo-300">{analysis.metrics.speakingSpeed}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Fluency</span>
              <span className="text-sm font-bold text-emerald-300">{analysis.metrics.fluency}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Pronunciation</span>
              <span className="text-sm font-bold text-amber-300">{analysis.metrics.pronunciation}%</span>
            </div>
          </div>

          {/* Filler Words & Acoustic Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-slate-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Filler Word Count ({analysis.fillerWordsCount})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detectedFillerWords.map((fw, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px]">
                    "{fw}"
                  </span>
                ))}
              </div>
              <p className="text-slate-400 text-[11px] pt-1">{analysis.feedback}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Improved Spoken Polish
              </p>
              <p className="text-slate-300 italic text-[11px] leading-relaxed">
                "{analysis.improvedAnswer}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
