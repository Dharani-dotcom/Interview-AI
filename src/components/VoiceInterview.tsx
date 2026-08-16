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
  Brain,
  Heart,
  HelpCircle
} from 'lucide-react';
import {
  InterviewerAvatar,
  INTERVIEWER_PERSONAS,
  InterviewerPersona
} from './InterviewerAvatar';

interface VoiceInterviewProps {
  onVerifyUsage?: () => Promise<boolean>;
}

export const VoiceInterview: React.FC<VoiceInterviewProps> = ({ onVerifyUsage }) => {
  const [selectedPersona, setSelectedPersona] = useState<InterviewerPersona>(INTERVIEWER_PERSONAS[0]);
  const [selectedTopic, setSelectedTopic] = useState<string>('Java & Spring Boot');
  const [isRecording, setIsRecording] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [speechSynthesisActive, setSpeechSynthesisActive] = useState(true);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [aiSpeechText, setAiSpeechText] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<VoiceAnalysisResult | null>(null);

  const topicQuestionsMap: Record<string, string[]> = {
    'Generative AI & LLMs': [
      'Explain the Transformer self-attention mechanism, Multi-Head Attention, and KV-cache optimizations during LLM decoding.',
      'How do Parameter-Efficient Fine-Tuning (PEFT) and LoRA (Low-Rank Adaptation) modify weights compared to full model fine-tuning?',
      'How do you mitigate LLM hallucinations and evaluate generative model outputs using ground truth metrics and guardrails?'
    ],
    'RAG & AI Engineering': [
      'Walk me through designing an enterprise RAG architecture: ingestion, chunking strategies, dense vs sparse vector embeddings, and re-ranking.',
      'How do vector databases (like Chroma, Pinecone, pgvector) use HNSW and cosine similarity for sub-millisecond retrieval?',
      'Explain how you implement autonomous AI agents using ReAct loops, tool calling, and multi-agent coordination.'
    ],
    'Java & Spring Boot': [
      'Explain Java memory management: Heap, Stack, Metaspace, and Garbage Collection tuning.',
      'How do Java Spring Boot annotations like @Transactional, @Autowired, and @Bean function under the hood?',
      'Explain thread synchronization, volatile keyword, and ConcurrentHashMap implementation in Java.'
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
    'C++ & STL': [
      'Explain memory management in C++: raw pointers, std::unique_ptr, std::shared_ptr, and move semantics.',
      'What are RAII, virtual method tables (vtable), and memory alignment in modern C++?',
      'How do templates, concepts, and constexpr optimize performance in high-frequency C++ applications?'
    ],
    'System Design': [
      'How do you design a high-throughput rate limiter capable of handling 1,000,000 requests per second?',
      'Explain how you build distributed cache invalidation strategies using Redis and CDN edge caching.',
      'Walk me through designing a real-time messaging queue with Kafka, partition keys, and consumer groups.'
    ]
  };

  const currentQuestions = topicQuestionsMap[selectedTopic] || topicQuestionsMap['Generative AI & LLMs'];
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
    if (!speechSynthesisActive || !('speechSynthesis' in window) || !text) return;
    window.speechSynthesis.cancel();
    setAiSpeechText(text);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = selectedPersona.voiceGender === 'female' ? 1.05 : 0.95;

    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      if (selectedPersona.voiceGender === 'female') {
        return name.includes('female') || name.includes('samantha') || name.includes('zira') || name.includes('victoria') || name.includes('google us english');
      } else {
        return name.includes('male') || name.includes('david') || name.includes('alex') || name.includes('daniel') || name.includes('george') || name.includes('google uk english male');
      }
    }) || voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => setIsAiSpeaking(true);
    utterance.onend = () => setIsAiSpeaking(false);
    utterance.onerror = () => setIsAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const speakPersonaGreeting = (persona: InterviewerPersona) => {
    speakText(persona.greetingMessage);
  };

  const handleAskHint = () => {
    const hintText = `Here is a friendly pointer: Think about the underlying architecture of ${selectedTopic}. Structure your answer with the definition, common use case, and trade-offs. You've got this!`;
    speakText(hintText);
  };

  const handleRephraseSimpler = () => {
    const simplerText = `To put this question simply: How would you explain this concept to a team member in simple everyday terms? Walk me through your thinking!`;
    speakText(simplerText);
  };

  const handleStartVoice = async () => {
    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

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

      const result: VoiceAnalysisResult = await res.json();
      setAnalysis(result);

      // AI Interviewer speaks verbal feedback aloud!
      const verbalFeedback = `Great effort! Your overall score is ${result.overallScore} out of 100. ${result.feedback}`;
      speakText(verbalFeedback);

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
    <div className="space-y-6 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Realtime Friendly AI Voice Interview
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">AI Voice Interview Simulator</h2>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Practice interactive technical conversations with a friendly AI interviewer. Speak naturally into your microphone to receive real-time spoken guidance and acoustic evaluations!
        </p>
      </div>

      {/* INTERVIEWER PERSONA SELECTOR */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Choose Your Live Voice Interviewer:</span>
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Select an interviewer persona to hear their voice and friendly greeting
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {INTERVIEWER_PERSONAS.map((persona) => {
            const isSelected = selectedPersona.id === persona.id;
            return (
              <button
                key={persona.id}
                type="button"
                onClick={() => {
                  setSelectedPersona(persona);
                  speakPersonaGreeting(persona);
                }}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'border-sky-500 bg-sky-50/80 ring-2 ring-sky-500/20 shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80'
                }`}
              >
                <img
                  src={persona.avatarUrl}
                  alt={persona.name}
                  referrerPolicy="no-referrer"
                  className="w-12 h-12 rounded-full object-cover border border-slate-300 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-900 truncate flex items-center gap-1">
                    {persona.name}
                    {isSelected && <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />}
                  </p>
                  <p className="text-[11px] text-sky-700 font-semibold truncate">{persona.role}</p>
                  <p className="text-[10px] text-slate-500 truncate">{persona.personality}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TOPIC SELECTION BUTTONS */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2">
        <label className="block text-xs font-bold text-slate-800">Choose Programming Language / Interview Topic:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
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

      {/* SPLIT VIEW: INTERVIEWER AVATAR & ACTIVE VOICE CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: INTERVIEWER AVATAR */}
        <InterviewerAvatar
          isSpeaking={isAiSpeaking}
          isListening={isRecording}
          selectedPersona={selectedPersona}
          currentSpeechText={aiSpeechText}
          onAskHint={handleAskHint}
          onRephraseQuestion={handleRephraseSimpler}
          audioLevel={isRecording ? 65 : 0}
        />

        {/* RIGHT: VOICE CONTROLS & LIVE TRANSCRIBER */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-5 flex flex-col justify-between">
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
                  setAnalysis(null);
                  setTranscript('');
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
          <div className="flex flex-col items-center justify-center py-6 space-y-4 bg-slate-950 rounded-xl border border-slate-800">
            {/* Animated sound waves */}
            <div className="flex items-center justify-center gap-1.5 h-12 w-full max-w-xs px-4">
              {[30, 60, 90, 45, 100, 70, 40, 85, 30, 95, 60, 40, 75, 90, 50].map((h, i) => (
                <div
                  key={i}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    isRecording || isAiSpeaking
                      ? 'bg-gradient-to-t from-sky-400 via-blue-500 to-indigo-500 animate-pulse'
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
                <div className="absolute inset-0 rounded-full bg-rose-500/30 animate-ping pointer-events-none" />
              )}
              <button
                type="button"
                onClick={isRecording ? handleStopVoiceAndAnalyze : handleStartVoice}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-xl ${
                  isRecording
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'gradient-btn text-white'
                }`}
              >
                {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
              </button>
            </div>

            {/* Timer & Status */}
            <div className="text-center space-y-1">
              <p className="text-lg font-mono font-bold text-white flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-sky-400" />
                {formatTimer(seconds)}
              </p>
              <p className="text-xs text-slate-300">
                {isRecording
                  ? 'Listening to candidate speech... Click mic to analyze'
                  : isAiSpeaking
                  ? `${selectedPersona.name.split(' ')[0]} is speaking aloud...`
                  : 'Click mic button to begin speaking your answer'}
              </p>
            </div>
          </div>

          {/* Live Transcript Display */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Live Speech Transcript:</span>
              <span className="text-[11px] text-slate-500">Auto-captured from microphone</span>
            </div>
            <textarea
              rows={3}
              value={transcript}
              placeholder={isRecording ? 'Listening for your speech input...' : 'Click mic to record or type your response here...'}
              onChange={(e) => setTranscript(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:border-sky-500"
            />
            <button
              type="button"
              onClick={handleStopVoiceAndAnalyze}
              disabled={loading}
              className="w-full gradient-btn py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-xs"
            >
              {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{loading ? 'Analyzing Conversation with AI...' : 'Finish & Hear Verbal AI Evaluation'}</span>
            </button>
          </div>

          {/* Speech Synthesis Toggle */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
            <span>Interviewer Voice (Text-to-Speech)</span>
            <button
              type="button"
              onClick={() => {
                if (speechSynthesisActive) window.speechSynthesis?.cancel();
                setSpeechSynthesisActive(!speechSynthesisActive);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              {speechSynthesisActive ? <Volume2 className="w-4 h-4 text-sky-600" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
              <span>{speechSynthesisActive ? 'Voice Enabled' : 'Voice Muted'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ANALYSIS BREAKDOWN REPORT */}
      {loading && (
        <div className="p-6 rounded-2xl border border-slate-200 bg-white text-center space-y-3 shadow-xs">
          <Activity className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-900">Evaluating Speech Acoustics, Tone & Content...</p>
        </div>
      )}

      {analysis && (
        <div className="p-6 sm:p-8 rounded-2xl border border-sky-300 bg-white space-y-6 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" /> Voice Performance Scorecard
              </h3>
              <p className="text-xs text-slate-500">Live evaluation from {selectedPersona.name}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-sky-700">{analysis.overallScore}</span>
              <span className="text-xs text-slate-500 block">/ 100 Score</span>
            </div>
          </div>

          {/* 5 Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Confidence</span>
              <span className="text-sm font-bold text-sky-800">{analysis.metrics.confidence}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Grammar</span>
              <span className="text-sm font-bold text-indigo-800">{analysis.metrics.grammar}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Pace / Speed</span>
              <span className="text-sm font-bold text-emerald-800">{analysis.metrics.speakingSpeed}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Fluency</span>
              <span className="text-sm font-bold text-teal-800">{analysis.metrics.fluency}%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Pronunciation</span>
              <span className="text-sm font-bold text-amber-800">{analysis.metrics.pronunciation}%</span>
            </div>
          </div>

          {/* Filler Words & Acoustic Feedback */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Filler Word Count ({analysis.fillerWordsCount})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {analysis.detectedFillerWords.map((fw, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-mono text-[11px]">
                    "{fw}"
                  </span>
                ))}
              </div>
              <p className="text-slate-700 text-[11px] pt-1">{analysis.feedback}</p>
            </div>

            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 space-y-2">
              <p className="font-bold text-sky-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-700" /> Improved Spoken Polish
              </p>
              <p className="text-slate-800 italic text-[11px] leading-relaxed">
                "{analysis.improvedAnswer}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
