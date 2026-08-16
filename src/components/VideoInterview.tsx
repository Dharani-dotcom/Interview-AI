import React, { useState, useRef, useEffect } from 'react';
import { VideoAnalysisResult } from '../types';
import {
  Video,
  VideoOff,
  Camera,
  Sparkles,
  Eye,
  Smile,
  User,
  Bot,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Mic,
  Radio,
  Send,
  MessageSquare,
  Play,
  RotateCcw,
  Zap,
  Code2,
  Layers,
  HelpCircle,
  BarChart3,
  Heart
} from 'lucide-react';
import {
  InterviewerAvatar,
  INTERVIEWER_PERSONAS,
  InterviewerPersona,
} from './InterviewerAvatar';

interface DialogTurn {
  id: string;
  sender: 'ai' | 'candidate';
  text: string;
  timestamp: string;
  score?: number;
  verbalFeedback?: string;
}

interface VideoInterviewProps {
  onVerifyUsage?: () => Promise<boolean>;
}

export const VideoInterview: React.FC<VideoInterviewProps> = ({ onVerifyUsage }) => {
  const [selectedPersona, setSelectedPersona] = useState<InterviewerPersona>(INTERVIEWER_PERSONAS[0]);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<VideoAnalysisResult | null>(null);

  // Speech & Voice controls
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [aiSpeechText, setAiSpeechText] = useState<string>('');

  // Audio level meter
  const [audioLevel, setAudioLevel] = useState(0);

  // Dynamic Topic & Question list
  const [selectedTopic, setSelectedTopic] = useState<string>('Generative AI & LLMs');
  const [questionIndex, setQuestionIndex] = useState(0);

  // Conversation history in this video session
  const [dialogueHistory, setDialogueHistory] = useState<DialogTurn[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: "Hi there! I am your AI Interviewer. I'm excited to have a warm, conversational technical interview with you today. Feel free to choose your favorite interviewer persona, enable your mic/camera, and click 'Start Answer' whenever you're comfortable!",
      timestamp: 'Just now'
    }
  ]);

  const topicQuestionsMap: Record<string, string[]> = {
    'Generative AI & LLMs': [
      "Explain the Transformer Self-Attention mechanism, Multi-Head Attention, and how KV-Cache optimizes inference latency during autoregressive token generation.",
      "How do Parameter-Efficient Fine-Tuning (PEFT) and LoRA (Low-Rank Adaptation) modify weights compared to full model fine-tuning?",
      "How do you mitigate LLM hallucinations and evaluate generative model outputs using ground truth metrics and guardrails (e.g. NeMo, Ragas)?",
      "Walk me through context window management, Tokenizer encoding/decoding, and solving the 'Lost in the Middle' problem in long-context models.",
      "How do you design autonomous AI Agent workflows using ReAct loops, tool calling schemas, and stateful memory?"
    ],
    'RAG & AI Engineering': [
      "Walk me through an enterprise RAG architecture: Document parsing, Chunking strategies (fixed vs semantic), dense vs sparse vector embeddings, and re-ranking.",
      "How do vector databases (like Chroma, Pinecone, pgvector) utilize HNSW and cosine similarity for sub-millisecond retrieval?",
      "How do you optimize retrieval precision in RAG using Hybrid Search (BM25 keyword search + Dense Vector search) and Reciprocal Rank Fusion (RRF)?",
      "How do you handle multi-hop queries and query decomposition when building complex RAG pipelines for domain-specific knowledge?"
    ],
    'Data Structures & Algorithms': [
      "How do you find the Second Largest element in an array in a single pass O(N) time and O(1) auxiliary space without sorting?",
      "Explain how Binary Search achieves O(log N) time complexity, how you prevent integer overflow in the midpoint calculation, and how recursive vs iterative approaches compare.",
      "Compare Linear Search (O(N)) versus Binary Search (O(log N)). When is Linear Search preferred over Binary Search in real-world software?",
      "How do you modify Binary Search to search for a target element in a Rotated Sorted Array in O(log N) time?",
      "Walk me through finding the peak element in an array using Binary Search or finding the first and last position of an element in sorted array."
    ],
    'Java & Spring Boot': [
      "Explain Java memory architecture: Heap, Stack, Metaspace, and GC tuning options.",
      "How do Spring Boot @Transactional and Spring Security filter chains work under the hood?",
      "Walk me through diagnosing a thread deadlock or memory leak in a production Java service.",
      "How do ConcurrentHashMap and ReentrantLock compare to synchronized blocks in Java?"
    ],
    'Python & Data Science': [
      "Explain Python Global Interpreter Lock (GIL) and how to scale multi-threaded vs multi-process workloads.",
      "How do Python decorators, generators, and reference counting garbage collection work internally?",
      "How do you optimize data transformation pipelines using Pandas, NumPy vectorization, or PySpark?",
      "Explain GIL workarounds when serving high-concurrency FastAPIs or Django applications."
    ],
    'Database & SQL': [
      "Explain B-Tree vs LSM-Tree index structures and how EXPLAIN ANALYZE helps optimize slow queries.",
      "How do ACID guarantees, isolation levels (Read Committed, Serializable), and deadlocks work in relational databases?",
      "Walk me through designing zero-downtime database schema migrations and connection pooling.",
      "How do you handle database sharding, read replicas, and eventual consistency?"
    ],
    'JavaScript & React': [
      "Explain the JavaScript Event Loop, microtasks queue, event bubbling, and closures.",
      "How does React Fiber reconciliation algorithm optimize Virtual DOM rendering?",
      "Walk me through optimizing Web Vitals (LCP, CLS, INP) in a large client-side application.",
      "How do you architect state management across complex server components and client caches?"
    ],
    'C++ & STL': [
      "Explain modern C++ memory management: std::unique_ptr, std::shared_ptr, and move semantics.",
      "What are virtual tables (vtables), RAII, and memory alignment in performance-critical C++?",
      "How do C++ templates, concepts, and constexpr optimize compile-time execution?",
      "How do you debug buffer overflows or segmentation faults using Valgrind or GDB?"
    ],
    'System Design': [
      "Describe your strategy for zero-downtime architecture deployments in high-traffic services.",
      "How do you handle disagreement with senior leadership on technical debt versus rapid feature shipping?",
      "Walk me through a complex production outage you diagnosed and fixed under extreme time pressure.",
      "How do you ensure data security, rate limiting, and auth token validation across microservices?"
    ]
  };

  const currentQuestions = topicQuestionsMap[selectedTopic] || topicQuestionsMap['Generative AI & LLMs'];

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const isRecordingRef = useRef<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Keep isRecordingRef synchronized
  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  // Eye contact & smile live tracking stats
  const [liveEyeContact, setLiveEyeContact] = useState(94);
  const [liveSmile, setLiveSmile] = useState(88);
  const [livePosture, setLivePosture] = useState('Upright & Centered');

  // Initialize Speech Recognition
  const initSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicStatusMsg('Native Speech Recognition not supported in this browser. You can type or click speech presets.');
      return null;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsTranscribing(true);
        setMicStatusMsg('Speech recognition listening... Speak clearly into your mic.');
      };

      recognition.onresult = (event: any) => {
        let finalStr = '';
        let interimStr = '';
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalStr += event.results[i][0].transcript + ' ';
          } else {
            interimStr += event.results[i][0].transcript;
          }
        }
        if (finalStr.trim()) {
          setTranscript((prev) => {
            const combined = (prev + ' ' + finalStr).trim();
            return combined;
          });
        }
        setInterimText(interimStr);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition event:', e.error);
        if (e.error === 'not-allowed') {
          setMicStatusMsg('Microphone permission blocked. Please enable mic access in your browser bar.');
          setIsTranscribing(false);
        } else if (e.error === 'audio-capture') {
          setMicStatusMsg('No microphone detected.');
          setIsTranscribing(false);
        } else if (e.error === 'no-speech') {
          // quiet period, keep waiting
        }
      };

      recognition.onend = () => {
        setIsTranscribing(false);
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (err) {
            // ignore
          }
        }
      };

      recognitionRef.current = recognition;
      return recognition;
    } catch (e) {
      console.warn('Could not initialize SpeechRecognition:', e);
      return null;
    }
  };

  useEffect(() => {
    initSpeechRecognition();
  }, []);

  // Timer & simulated computer vision posture
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
        setLiveEyeContact(88 + Math.floor(Math.random() * 8));
        setLiveSmile(80 + Math.floor(Math.random() * 14));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // AI Voice Synthesis Function - Custom persona voice speaking aloud!
  const speakTextAloud = (textToSpeak: string) => {
    if (isVoiceMuted || !('speechSynthesis' in window) || !textToSpeak) return;

    window.speechSynthesis.cancel();
    setAiSpeechText(textToSpeak);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = selectedPersona.voiceGender === 'female' ? 1.05 : 0.95;

    // Pick matching natural voice if available
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

    utterance.onstart = () => {
      setIsAiSpeaking(true);
    };

    utterance.onend = () => {
      setIsAiSpeaking(false);
    };

    utterance.onerror = () => {
      setIsAiSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const speakPersonaGreeting = (persona: InterviewerPersona) => {
    speakTextAloud(persona.greetingMessage);
    const greetingTurn: DialogTurn = {
      id: `ai-greet-${Date.now()}`,
      sender: 'ai',
      text: persona.greetingMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDialogueHistory(prev => [...prev, greetingTurn]);
  };

  const handleAskHint = () => {
    const currentQ = currentQuestions[questionIndex];
    const hintText = `Here's a helpful hint for this question: Think about the core data structure or communication flow involved in ${selectedTopic}. Break the problem down into the baseline case and how you would scale it under real production traffic. Take your time!`;
    
    speakTextAloud(hintText);
    const hintTurn: DialogTurn = {
      id: `ai-hint-${Date.now()}`,
      sender: 'ai',
      text: hintText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDialogueHistory(prev => [...prev, hintTurn]);
  };

  const handleRephraseSimpler = () => {
    const currentQ = currentQuestions[questionIndex];
    const simplerText = `Let me break down this question in everyday engineering terms: We want to understand how you would solve this problem when building a real app. Explain the steps simply as if we were pair-programming together!`;
    
    speakTextAloud(simplerText);
    const simplerTurn: DialogTurn = {
      id: `ai-simple-${Date.now()}`,
      sender: 'ai',
      text: simplerText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDialogueHistory(prev => [...prev, simplerTurn]);
  };

  const handleNextQuestion = () => {
    window.speechSynthesis?.cancel();
    const nextIdx = (questionIndex + 1) % currentQuestions.length;
    setQuestionIndex(nextIdx);
    setAnalysis(null);
    setTranscript('');
    setInterimText('');
    const qText = currentQuestions[nextIdx];
    speakTextAloud(`Question number ${nextIdx + 1}: ${qText}`);
  };

  const handlePrevQuestion = () => {
    window.speechSynthesis?.cancel();
    const prevIdx = (questionIndex - 1 + currentQuestions.length) % currentQuestions.length;
    setQuestionIndex(prevIdx);
    setAnalysis(null);
    setTranscript('');
    setInterimText('');
    const qText = currentQuestions[prevIdx];
    speakTextAloud(`Question number ${prevIdx + 1}: ${qText}`);
  };

  // Webcam & Mic Permission
  const startCameraAndMic = async (): Promise<boolean> => {
    setMicStatusMsg(null);
    let stream: MediaStream | null = null;
    let cameraGranted = false;
    let audioGranted = false;

    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      cameraGranted = true;
      audioGranted = true;
    } catch (vidErr) {
      console.warn('Video + Audio failed, trying Audio only:', vidErr);
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioGranted = true;
      } catch (audioErr) {
        console.error('Audio getUserMedia failed:', audioErr);
        setMicStatusMsg('Microphone access denied. Please click "Grant Mic Access" or allow permissions.');
        setMicActive(false);
        return false;
      }
    }

    if (stream) {
      streamRef.current = stream;
      setCameraActive(cameraGranted);
      setMicActive(audioGranted);
      setMicStatusMsg(cameraGranted ? 'Camera and Microphone active.' : 'Microphone active (Camera offline).');

      if (videoRef.current && cameraGranted) {
        videoRef.current.srcObject = stream;
      }

      // Live Audio Level Visualizer
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;

        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        const updateAudioLevel = () => {
          if (analyserRef.current) {
            analyserRef.current.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) {
              sum += dataArray[i];
            }
            const average = sum / dataArray.length;
            setAudioLevel(Math.min(100, Math.round((average / 128) * 100)));
            animFrameRef.current = requestAnimationFrame(updateAudioLevel);
          }
        };
        updateAudioLevel();
      } catch (audioErr) {
        console.warn('AudioContext setup notice:', audioErr);
      }
      return true;
    }
    return false;
  };

  const stopCameraAndMic = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setCameraActive(false);
    setMicActive(false);
    setAudioLevel(0);
  };

  const handleStartRecording = async () => {
    if (onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    await startCameraAndMic();
    setIsRecording(true);
    setSeconds(0);
    setAnalysis(null);
    setTranscript('');
    setInterimText('');

    // Speak question aloud
    speakTextAloud(currentQuestions[questionIndex]);

    // Start speech recognition
    let rec = recognitionRef.current;
    if (!rec) {
      rec = initSpeechRecognition();
    }
    if (rec) {
      try {
        rec.start();
      } catch (e) {
        console.warn('Recognition start caught', e);
      }
    }
  };

  const handleStopRecordingAndAnalyze = async () => {
    setIsRecording(false);
    window.speechSynthesis?.cancel();
    setIsAiSpeaking(false);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    const fullAnswer = (transcript + ' ' + interimText).trim();
    if (!fullAnswer) {
      alert('Please speak into your microphone or type your response before requesting AI evaluation.');
      return;
    }

    setTranscript(fullAnswer);
    setInterimText('');
    setLoading(true);

    // Append candidate answer to dialogue history
    const candidateTurn: DialogTurn = {
      id: `candidate-${Date.now()}`,
      sender: 'candidate',
      text: fullAnswer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setDialogueHistory(prev => [...prev, candidateTurn]);

    try {
      const res = await fetch('/api/gemini/video-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestions[questionIndex],
          transcript: fullAnswer,
          visualObservations: {
            eyeContactPercentage: liveEyeContact,
            smilePercentage: liveSmile,
            posture: livePosture,
          },
        }),
      });

      const data: VideoAnalysisResult = await res.json();
      setAnalysis(data);

      const aiVerbal = data.verbalResponse || `Thank you for your response! Your communication score is ${data.communicationScore}%. ${data.summary}`;
      
      // Append AI response to dialogue history
      const aiTurn: DialogTurn = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiVerbal,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: data.communicationScore,
        verbalFeedback: data.summary
      };
      setDialogueHistory(prev => [...prev, aiTurn]);

      // Dr. Sarah Jenkins SPEAKS BACK the feedback aloud!
      speakTextAloud(aiVerbal);

    } catch (err) {
      console.error('Video analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSampleSpeech = (sample: string) => {
    setTranscript(sample);
    setInterimText('');
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" /> Interactive AI Video & Voice Interviewer
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">AI Video Interview Room</h2>
        <p className="text-xs text-slate-600 max-w-xl mx-auto">
          Practice face-to-face technical interviews with <strong>Interview Bot</strong>. Speak aloud to see real-time speech-to-text transcription and hear the AI interviewer talk back to you with live vocal feedback!
        </p>
      </div>

      {/* INTERVIEWER PERSONA SELECTOR */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Choose Your Live Interviewer Persona:</span>
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            Click an interviewer to meet them and hear their greeting
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

      {/* TECH STACK / TOPIC SELECTOR */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-sky-600" />
            <span>Select Interview Domain & Topic:</span>
          </label>
          <span className="text-[11px] text-sky-700 font-semibold">
            {currentQuestions.length} Questions Available
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {Object.keys(topicQuestionsMap).map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSelectedTopic(topic);
                setQuestionIndex(0);
                setAnalysis(null);
                setTranscript('');
                setInterimText('');
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

      {/* ACTIVE QUESTION BANNER */}
      <div className="p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
          <span className="font-bold text-sky-800 flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-sky-600" /> {selectedTopic} • Question {questionIndex + 1} of {currentQuestions.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => speakTextAloud(`Question ${questionIndex + 1}: ${currentQuestions[questionIndex]}`)}
              className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isAiSpeaking ? 'text-amber-600 animate-bounce' : 'text-sky-600'}`} />
              <span>{isAiSpeaking ? `${selectedPersona.name.split(' ')[0]} Speaking...` : 'Hear Question Aloud'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isVoiceMuted) window.speechSynthesis?.cancel();
                setIsVoiceMuted(!isVoiceMuted);
              }}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              title={isVoiceMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
            >
              {isVoiceMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 py-2">
          <button
            type="button"
            onClick={handlePrevQuestion}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 shrink-0"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <p className="text-base font-bold text-slate-900 text-center leading-relaxed max-w-2xl px-2">
            "{currentQuestions[questionIndex]}"
          </p>

          <button
            type="button"
            onClick={handleNextQuestion}
            className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1 shrink-0"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* VIDEO STAGE SPLIT SCREEN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: AI INTERVIEWER LIFELIKE AVATAR WITH REAL-TIME LIP-SYNC & GESTURES */}
        <InterviewerAvatar
          isSpeaking={isAiSpeaking}
          isListening={isRecording}
          selectedPersona={selectedPersona}
          currentSpeechText={aiSpeechText}
          onAskHint={handleAskHint}
          onRephraseQuestion={handleRephraseSimpler}
          audioLevel={audioLevel}
        />

        {/* RIGHT: CANDIDATE WEBCAM FEED */}
        <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-600" /> Candidate Video Stream
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-sky-800 font-mono font-bold flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                <Clock className="w-3 h-3 text-sky-600" /> {formatTimer(seconds)}
              </span>
              <button
                type="button"
                onClick={cameraActive ? stopCameraAndMic : startCameraAndMic}
                className="px-2.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-semibold border border-slate-200"
              >
                {cameraActive ? 'Stop Camera' : 'Enable Camera'}
              </button>
            </div>
          </div>

          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-xl scale-x-[-1]"
            />
            
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-slate-900 text-white">
                <Camera className="w-10 h-10 text-slate-400 mb-2" />
                <p className="text-xs text-slate-300 font-medium">Webcam Feed Off</p>
                <button
                  type="button"
                  onClick={startCameraAndMic}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs"
                >
                  Turn On Webcam & Mic
                </button>
              </div>
            )}

            {cameraActive && (
              <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between text-[10px] font-mono">
                <div className="flex justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Eye Contact: {liveEyeContact}%
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 text-purple-300 border border-purple-500/40 flex items-center gap-1">
                    <Smile className="w-3 h-3" /> Smile: {liveSmile}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 text-sky-300 border border-sky-500/40">
                    Posture: {livePosture}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950/80 text-amber-300 border border-amber-500/40">
                    Speech Status: {isRecording ? 'Capturing' : 'Standby'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SPEECH-TO-TEXT & RECORDING CONTROLS */}
      <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Mic className={`w-4 h-4 ${isRecording || isTranscribing ? 'text-rose-600 animate-pulse' : 'text-sky-600'}`} />
              Real-Time Speech-to-Text Transcription
            </p>
            <p className="text-xs text-slate-500">
              Speak into your microphone. Words are transcribed live below in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!micActive && (
              <button
                type="button"
                onClick={startCameraAndMic}
                className="px-3 py-1.5 rounded-lg border border-sky-300 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
              >
                <Mic className="w-3.5 h-3.5 text-sky-600" />
                <span>Grant Mic Access</span>
              </button>
            )}

            {/* Mic Volume Level Bar */}
            {micActive && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-600">Mic Volume:</span>
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-75"
                    style={{ width: `${Math.max(12, audioLevel)}%` }}
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={isRecording ? handleStopRecordingAndAnalyze : handleStartRecording}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs text-white shadow-xs flex items-center gap-2 ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 animate-pulse'
                  : 'gradient-btn'
              }`}
            >
              {isRecording ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              <span>{isRecording ? 'Finish Answer & Hear AI Feedback' : 'Start Answer (Speak Now)'}</span>
            </button>
          </div>
        </div>

        {/* Status notice */}
        {micStatusMsg && (
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-medium flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-sky-600 shrink-0 animate-pulse" />
              <span>{micStatusMsg}</span>
            </span>
          </div>
        )}

        {/* LIVE TRANSCRIPT TEXTAREA */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <span>Your Spoken Answer Transcript:</span>
              {isRecording && <span className="text-rose-600 font-bold animate-pulse text-[11px]">● Transcribing live...</span>}
            </label>
            <button
              type="button"
              onClick={() => { setTranscript(''); setInterimText(''); }}
              className="text-slate-400 hover:text-slate-600 text-[11px] flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Clear Text
            </button>
          </div>

          <div className="relative">
            <textarea
              rows={4}
              value={transcript + (interimText ? (transcript ? ' ' : '') + interimText : '')}
              onChange={(e) => {
                setTranscript(e.target.value);
                setInterimText('');
              }}
              placeholder="Speak aloud into your microphone... your voice will convert into text here in real time. You can also edit or type directly."
              className="w-full p-3.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 text-xs focus:bg-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-hidden leading-relaxed shadow-inner"
            />
          </div>

          {/* Quick DSA & Technical Speech Presets */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-500">Quick Answer Templates for Practice:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => handleSelectSampleSpeech(
                  "To find the second largest element in an array in O(N) single pass and O(1) space: We maintain two variables, 'first' and 'second', initialized to negative infinity. In a single loop through the array, if the current element is greater than 'first', we update 'second = first' and 'first = current'. Else if the element is strictly greater than 'second' and not equal to 'first', we update 'second = current'. If 'second' remains negative infinity, no second largest distinct element exists and we return -1."
                )}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 text-slate-700 text-[11px] font-medium transition-colors"
              >
                💡 Second Largest O(N) Template
              </button>

              <button
                type="button"
                onClick={() => handleSelectSampleSpeech(
                  "Binary Search operates on sorted arrays by maintaining two pointers, 'low' and 'high'. In each iteration, we calculate the midpoint using 'mid = low + (high - low) / 2' to avoid integer arithmetic overflow. We compare nums[mid] with the target: if equal, we return mid. If nums[mid] < target, we search the right half with low = mid + 1, else high = mid - 1. This achieves O(log N) time complexity with O(1) iterative space complexity."
                )}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 text-slate-700 text-[11px] font-medium transition-colors"
              >
                💡 Binary Search O(log N) Template
              </button>

              <button
                type="button"
                onClick={() => handleSelectSampleSpeech(
                  "Linear Search inspects every element one-by-one taking O(N) time and requires no ordering. In contrast, Binary Search divides the search space in half each step taking O(log N) time but strictly requires sorted data. For large datasets, Binary Search is exponentially faster (e.g. 20 steps for 1 million records vs up to 1 million steps in linear search)."
                )}
                className="px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-800 text-slate-700 text-[11px] font-medium transition-colors"
              >
                💡 Linear vs Binary Search Template
              </button>
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            disabled={loading}
            onClick={handleStopRecordingAndAnalyze}
            className="px-6 py-3 rounded-xl gradient-btn text-white text-xs font-bold shadow-md flex items-center gap-2 hover:opacity-95 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin text-white" />
                <span>Dr. Sarah Jenkins is Evaluating...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Answer & Hear Dr. Jenkins's Voice Feedback</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CONVERSATIONAL DIALOGUE HISTORY */}
      {dialogueHistory.length > 0 && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-sky-600" />
              <span>Live Interview Conversation History</span>
            </span>
            <span className="text-[11px] text-slate-500">{dialogueHistory.length} Exchanges</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {dialogueHistory.map((msg) => (
              <div
                key={msg.id}
                className={`p-3.5 rounded-2xl text-xs space-y-1.5 ${
                  msg.sender === 'ai'
                    ? 'bg-sky-50/80 border border-sky-200 text-sky-950 mr-8'
                    : 'bg-indigo-50/80 border border-indigo-200 text-indigo-950 ml-8'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-bold">
                  <span className="flex items-center gap-1.5">
                    {msg.sender === 'ai' ? (
                      <>
                        <Bot className="w-3.5 h-3.5 text-sky-600" />
                        <span className="text-sky-800">Dr. Sarah Jenkins (Interviewer)</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5 text-indigo-600" />
                        <span className="text-indigo-800">Candidate (You)</span>
                      </>
                    )}
                  </span>
                  <div className="flex items-center gap-2">
                    {msg.score && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                        Score: {msg.score}%
                      </span>
                    )}
                    <span className="text-slate-400 font-normal">{msg.timestamp}</span>
                    {msg.sender === 'ai' && (
                      <button
                        type="button"
                        onClick={() => speakTextAloud(msg.text)}
                        className="p-1 rounded bg-white hover:bg-sky-100 text-sky-700 border border-sky-200"
                        title="Replay Voice"
                      >
                        <Play className="w-3 h-3 fill-current" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STRUCTURED AI EVALUATION REPORT */}
      {analysis && (
        <div className="p-6 rounded-2xl border border-sky-300 bg-white shadow-md space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">AI Panel Assessment</span>
              <h3 className="text-xl font-extrabold text-slate-900">Dr. Sarah Jenkins's Evaluation</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => speakTextAloud(analysis.verbalResponse || analysis.summary)}
                className="px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 text-xs font-bold flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-sky-600" />
                <span>Hear Feedback Aloud</span>
              </button>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500">Communication</p>
              <p className="text-2xl font-black text-sky-700">{analysis.communicationScore}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500">Confidence</p>
              <p className="text-2xl font-black text-indigo-700">{analysis.confidenceScore}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500">Professionalism</p>
              <p className="text-2xl font-black text-emerald-700">{analysis.professionalismScore}%</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <p className="text-[10px] uppercase font-bold text-slate-500">Body Composure</p>
              <p className="text-2xl font-black text-purple-700">{analysis.bodyLanguageScore}%</p>
            </div>
          </div>

          {/* Detailed Observations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-sky-600" /> Visual & Delivery Signals
              </p>
              <ul className="space-y-1.5 text-slate-600">
                <li>• <strong>Eye Contact:</strong> {analysis.eyeContactEstimation}</li>
                <li>• <strong>Facial Expression:</strong> {analysis.smileAndFacialExpression}</li>
                <li>• <strong>Posture:</strong> {analysis.postureFeedback}</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Actionable Recommendations
              </p>
              <ul className="space-y-1.5 text-slate-600">
                {analysis.suggestions?.map((sug, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-bold">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Follow-up question if any */}
          {analysis.followUpQuestion && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs space-y-1">
              <p className="font-bold text-amber-900 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-600" /> Suggested Follow-up Question:
              </p>
              <p className="italic">"{analysis.followUpQuestion}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default VideoInterview;
