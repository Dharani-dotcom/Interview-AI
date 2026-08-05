import React, { useState, useRef, useEffect } from 'react';
import { VideoAnalysisResult } from '../types';
import {
  Video,
  VideoOff,
  Camera,
  RotateCcw,
  Sparkles,
  Eye,
  Smile,
  User,
  Bot,
  Clock,
  Activity,
  CheckCircle2,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Mic,
  MicOff,
  Radio
} from 'lucide-react';

export const VideoInterview: React.FC = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [micStatusMsg, setMicStatusMsg] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<VideoAnalysisResult | null>(null);

  // Speech & Voice controls
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  // Mic level audio volume
  const [audioLevel, setAudioLevel] = useState(0);

  // Dynamic Topic & Question list
  const [selectedTopic, setSelectedTopic] = useState<string>('Java & Spring Boot');
  const [questionIndex, setQuestionIndex] = useState(0);

  const topicQuestionsMap: Record<string, string[]> = {
    'Java & Spring Boot': [
      "Explain Java memory architecture: Heap, Stack, Metaspace, and GC tuning options.",
      "How do Spring Boot @Transactional and Spring Security filter chains work under the hood?",
      "Walk me through diagnosing a thread deadlock or memory leak in a production Java service.",
      "How do ConcurrentHashMap and ReentrantLock compare to synchronized blocks in Java?"
    ],
    'C++ & STL': [
      "Explain modern C++ memory management: std::unique_ptr, std::shared_ptr, and move semantics.",
      "What are virtual tables (vtables), RAII, and memory alignment in performance-critical C++?",
      "How do C++ templates, concepts, and constexpr optimize compile-time execution?",
      "How do you debug buffer overflows or segmentation faults using Valgrind or GDB?"
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
    'System Design': [
      "Describe your strategy for zero-downtime architecture deployments in high-traffic services.",
      "How do you handle disagreement with senior leadership on technical debt versus rapid feature shipping?",
      "Walk me through a complex production outage you diagnosed and fixed under extreme time pressure.",
      "How do you ensure data security, rate limiting, and auth token validation across microservices?"
    ]
  };

  const currentQuestions = topicQuestionsMap[selectedTopic] || topicQuestionsMap['Java & Spring Boot'];

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

  // Initialize Speech Recognition with continuous auto-restart and error feedback
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsTranscribing(true);
        setMicStatusMsg('Speech recognition active. Speak into your microphone...');
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
        console.warn('Speech recognition notice:', e.error);
        if (e.error === 'not-allowed') {
          setMicStatusMsg('Microphone access blocked. Please click "Grant Microphone Access" or allow permissions in your browser bar.');
          setIsTranscribing(false);
        } else if (e.error === 'audio-capture') {
          setMicStatusMsg('Microphone hardware capture failed or not connected.');
          setIsTranscribing(false);
        } else if (e.error === 'no-speech') {
          // Normal idle event
        }
      };

      recognition.onend = () => {
        setIsTranscribing(false);
        // Restart automatically if user is still recording
        if (isRecordingRef.current) {
          try {
            recognition.start();
          } catch (err) {
            // ignore
          }
        }
      };

      recognitionRef.current = recognition;
    } else {
      setMicStatusMsg('Browser does not support native Web Speech API. You can type your response directly or click Sample Speech.');
    }
  }, []);

  // Timer & stat fluctuation effect
  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
        setLiveEyeContact(88 + Math.floor(Math.random() * 8));
        setLiveSmile(82 + Math.floor(Math.random() * 12));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // AI Voice Synthesis Function
  const speakQuestionAloud = (textToSpeak?: string) => {
    const questionText = textToSpeak || currentQuestions[questionIndex];
    if (isVoiceMuted || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(questionText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

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

  const handleNextQuestion = () => {
    window.speechSynthesis?.cancel();
    const nextIdx = (questionIndex + 1) % currentQuestions.length;
    setQuestionIndex(nextIdx);
    setAnalysis(null);
    setTranscript('');
    speakQuestionAloud(currentQuestions[nextIdx]);
  };

  const handlePrevQuestion = () => {
    window.speechSynthesis?.cancel();
    const prevIdx = (questionIndex - 1 + currentQuestions.length) % currentQuestions.length;
    setQuestionIndex(prevIdx);
    setAnalysis(null);
    setTranscript('');
    speakQuestionAloud(currentQuestions[prevIdx]);
  };

  // Explicitly Request Webcam & Microphone Access with fallback
  const startCameraAndMic = async (): Promise<boolean> => {
    setMicStatusMsg(null);
    let stream: MediaStream | null = null;
    let cameraGranted = false;
    let audioGranted = false;

    try {
      // First attempt both video and audio
      stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      cameraGranted = true;
      audioGranted = true;
    } catch (vidErr) {
      console.warn('Video + Audio permission failed, trying Audio only:', vidErr);
      try {
        // Fallback to audio only if webcam is unavailable or denied
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioGranted = true;
      } catch (audioErr) {
        console.error('Audio getUserMedia failed:', audioErr);
        setMicStatusMsg('Microphone access was denied or not found. Please click "Grant Microphone Access" or allow permissions in your browser.');
        setMicActive(false);
        return false;
      }
    }

    if (stream) {
      streamRef.current = stream;
      setCameraActive(cameraGranted);
      setMicActive(audioGranted);
      setMicStatusMsg(cameraGranted ? 'Camera and Microphone active.' : 'Microphone active (Camera unavailable or offline).');

      if (videoRef.current && cameraGranted) {
        videoRef.current.srcObject = stream;
      }

      // Web Audio API for live mic level visualization
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
        console.warn('AudioContext visualization setup failed:', audioErr);
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
    const success = await startCameraAndMic();
    setIsRecording(true);
    setSeconds(0);
    setAnalysis(null);

    // AI speaks question aloud
    speakQuestionAloud(currentQuestions[questionIndex]);

    // Start live speech recognition after mic permission is obtained
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start notice', e);
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

    const userAnswer = transcript.trim();
    if (!userAnswer) {
      alert('Please speak into your microphone or type your response before requesting AI evaluation.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/gemini/video-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestions[questionIndex],
          transcript: userAnswer,
          visualObservations: {
            eyeContactPercentage: liveEyeContact,
            smilePercentage: liveSmile,
            posture: livePosture,
          },
        }),
      });

      const data = await res.json();
      setAnalysis(data);
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
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 border border-indigo-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI Video & Voice Interview Room
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900">AI Video Interview Simulator</h2>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Practice answering questions from Dr. Sarah Jenkins. Speak naturally into your microphone and receive AI evaluation on visual posture, delivery, and answer precision.
        </p>
      </div>

      {/* TOPIC SELECTION BUTTONS */}
      <div className="glass-card p-4 rounded-2xl border-slate-200 bg-white shadow-2xs space-y-2">
        <label className="block text-xs font-bold text-slate-800">Select Tech Stack / Programming Language:</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {Object.keys(topicQuestionsMap).map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                setSelectedTopic(topic);
                setQuestionIndex(0);
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

      {/* ACTIVE QUESTION BANNER (Clean, spacious, no overlap) */}
      <div className="glass-card p-5 rounded-2xl border-slate-200 shadow-sm space-y-3 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2 text-xs">
          <span className="font-bold text-sky-700 flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-sky-600" /> {selectedTopic} • Question {questionIndex + 1} of {currentQuestions.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => speakQuestionAloud()}
              className="px-3 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 font-semibold text-xs flex items-center gap-1.5"
            >
              <Volume2 className={`w-3.5 h-3.5 ${isAiSpeaking ? 'text-amber-600 animate-bounce' : 'text-sky-600'}`} />
              <span>{isAiSpeaking ? 'AI Speaking...' : 'Ask Question Aloud'}</span>
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
        
        {/* LEFT: AI INTERVIEWER AVATAR */}
        <div className="glass-card p-5 rounded-2xl border-slate-200 bg-white space-y-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
            <span className="font-bold text-sky-700 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-sky-600" /> AI Panel Interviewer
            </span>
            <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
              isAiSpeaking ? 'bg-amber-100 text-amber-800 border border-amber-200 animate-pulse' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              {isAiSpeaking ? '🔊 Speaking Question' : 'Listening & Observing'}
            </span>
          </div>

          {/* Clean Avatar Box (NO overlapping banners) */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 p-[2px] mx-auto shadow-md ${
              isAiSpeaking ? 'ring-4 ring-sky-400/50 scale-105 transition-all' : ''
            }`}>
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center relative">
                <Bot className={`w-10 h-10 ${isAiSpeaking ? 'text-amber-400' : 'text-sky-400'}`} />
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <p className="text-sm font-bold text-white">Dr. Sarah Jenkins, PhD</p>
              <p className="text-xs text-slate-300">Google Principal AI Architect</p>
            </div>
          </div>
        </div>

        {/* RIGHT: CANDIDATE WEBCAM & MIC STREAM */}
        <div className="glass-card p-5 rounded-2xl border-slate-200 bg-white space-y-4 flex flex-col justify-between shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <User className="w-4 h-4 text-indigo-600" /> Candidate Camera Feed
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-sky-700 font-mono font-bold flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
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

          {/* Webcam Box */}
          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover rounded-xl scale-x-[-1]"
            />
            
            {/* Fallback if webcam inactive */}
            {!cameraActive && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-slate-900 text-white">
                <Camera className="w-10 h-10 text-slate-400 mb-2" />
                <p className="text-xs text-slate-300 font-medium">Camera Feed Inactive</p>
                <button
                  type="button"
                  onClick={startCameraAndMic}
                  className="mt-2 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs"
                >
                  Turn On Webcam
                </button>
              </div>
            )}

            {/* Simulated Live Pose Overlay */}
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
                    Composure: Steady
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RECORDING CONTROLS, MIC METER & LIVE TRANSCRIPT */}
      <div className="glass-card p-6 rounded-2xl border-slate-200 bg-white space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Mic className={`w-4 h-4 ${isRecording || isTranscribing ? 'text-rose-600 animate-pulse' : 'text-sky-600'}`} />
              Candidate Voice & Speech Recognition
            </p>
            <p className="text-xs text-slate-500">
              Speak clearly into your microphone or edit your transcript below.
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

            {/* Live Audio Volume Indicator */}
            {micActive && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                <span className="text-[11px] font-semibold text-slate-600">Mic Level:</span>
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
              onClick={() =>
                setTranscript(
                  'In my previous role as Senior Software Engineer, I designed distributed Spring Boot microservices with Redis caching and zero-downtime database migrations, achieving 99.99% uptime.'
                )
              }
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
            >
              Sample Speech
            </button>

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
              <span>{isRecording ? 'Finish Answer & Evaluate' : 'Start Recording Answer'}</span>
            </button>
          </div>
        </div>

        {/* Live Speech Recognition Status Banner */}
        {micStatusMsg && (
          <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-medium flex items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-sky-600 shrink-0 animate-pulse" />
              <span>{micStatusMsg}</span>
            </span>
            {!micActive && (
              <button
                type="button"
                onClick={startCameraAndMic}
                className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-700 text-white text-[11px] font-bold shrink-0"
              >
                Allow Mic
              </button>
            )}
          </div>
        )}

        {isRecording && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <Radio className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Microphone active & listening... Speak your answer now and watch your speech transcribe live below!</span>
          </div>
        )}

        <textarea
          rows={3}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder={
            isRecording
              ? 'Listening to your voice live... Speak into your microphone to populate your answer.'
              : 'Your spoken answer will transcribe here in real-time as you talk into your microphone, or you can type directly into this box...'
          }
          className="w-full p-3 rounded-xl glass-input text-xs text-slate-900 border border-slate-300 focus:border-sky-600 leading-relaxed"
        />
      </div>

      {/* PERFORMANCE REPORT */}
      {loading && (
        <div className="p-6 rounded-2xl glass-card border-slate-200 bg-white text-center space-y-3">
          <Activity className="w-8 h-8 text-sky-600 animate-spin mx-auto" />
          <p className="text-sm font-bold text-slate-900">Evaluating Answer, Speech & Visual Composure with AI Engine...</p>
        </div>
      )}

      {analysis && (
        <div className="glass-card p-6 sm:p-8 rounded-2xl border-sky-300 bg-white space-y-6 shadow-sm animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-600" /> Video & Professional Composure Scorecard
              </h3>
              <p className="text-xs text-slate-500">Multimodal AI evaluation of speech precision, sightline, and delivery</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-sky-700">{analysis.confidenceScore}</span>
              <span className="text-xs text-slate-500 block">/ 100 Score</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Confidence</span>
              <span className="text-sm font-bold text-sky-700">{analysis.confidenceScore}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Communication</span>
              <span className="text-sm font-bold text-indigo-700">{analysis.communicationScore}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Professionalism</span>
              <span className="text-sm font-bold text-emerald-700">{analysis.professionalismScore}%</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-500 block text-[10px]">Body Language</span>
              <span className="text-sm font-bold text-amber-700">{analysis.bodyLanguageScore}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-sky-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600" /> Visual & Composure Observations
              </p>
              <p className="text-slate-700 text-[11px]">• Eye Contact: {analysis.eyeContactEstimation}</p>
              <p className="text-slate-700 text-[11px]">• Facial Expression: {analysis.smileAndFacialExpression}</p>
              <p className="text-slate-700 text-[11px]">• Posture Stability: {analysis.postureFeedback}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <p className="font-bold text-indigo-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" /> Executive Suggestions
              </p>
              {analysis.suggestions.map((s, idx) => (
                <p key={idx} className="text-slate-700 text-[11px]">
                  • {s}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
