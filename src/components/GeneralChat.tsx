import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  Bot,
  User,
  Trash2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Lightbulb,
  RefreshCw,
  HelpCircle,
  Briefcase,
  Code
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const GeneralChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am your AI Assistant. You can ask me anything — from career advice, coding questions, tech interview strategies, to general daily queries or normal conversation. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    { label: "5 Tips for System Design", prompt: "What are the top 5 principles for designing scalable system architectures?", icon: <Lightbulb className="w-3.5 h-3.5 text-amber-500" /> },
    { label: "Salary Negotiation Tips", prompt: "How should I negotiate my tech salary offer gracefully and professionally?", icon: <Briefcase className="w-3.5 h-3.5 text-emerald-500" /> },
    { label: "Explain Microservices", prompt: "Can you explain microservices architecture vs monoliths in simple terms with examples?", icon: <Code className="w-3.5 h-3.5 text-sky-500" /> },
    { label: "Behavioral STAR Formula", prompt: "How do I structure a powerful answer using the STAR method for behavioral questions?", icon: <HelpCircle className="w-3.5 h-3.5 text-purple-500" /> },
  ];

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/general-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.concat(userMsg),
          message: textToSend,
        }),
      });

      const data = await res.json();
      const aiReplyText = data.text || "I am glad to chat with you! Let me know if you need any detailed explanations or guidance.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Speak aloud if voice isn't muted
      if (!isVoiceMuted && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(aiReplyText.replace(/[*#`]/g, ''));
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error('Error in general chat:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm available to help you with career guidance, tech topics, or general Q&A. What's on your mind?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm('Clear conversation history?')) {
      window.speechSynthesis?.cancel();
      setMessages([
        {
          id: '1',
          sender: 'ai',
          text: "Chat cleared! How can I assist you now?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-2 sm:px-4 pb-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 border border-sky-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" /> AI General Assistant
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
            Always Free (Zero Restrictions)
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">General AI Chat</h2>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">
          Have an unlimited, free conversation: ask technical or career questions, brainstorm ideas, draft emails, or seek everyday guidance with your AI Assistant.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="glass-card rounded-2xl border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Chat Toolbar */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                AI Companion <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </p>
              <p className="text-[10px] text-slate-500">Powered by AI Pro Engine</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => {
                if (!isVoiceMuted) window.speechSynthesis?.cancel();
                setIsVoiceMuted(!isVoiceMuted);
              }}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 text-xs flex items-center gap-1"
              title={isVoiceMuted ? 'Unmute AI Voice Readout' : 'Mute AI Voice Readout'}
            >
              {isVoiceMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
              <span className="hidden sm:inline text-[11px] font-medium">{isVoiceMuted ? 'Voice Muted' : 'Voice On'}</span>
            </button>

            {/* Clear Chat Button */}
            <button
              type="button"
              onClick={handleClearChat}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-600 hover:text-rose-600 text-xs flex items-center gap-1"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px] font-medium">Clear</span>
            </button>
          </div>
        </div>

        {/* Message Stream Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[80%] space-y-1 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white rounded-tr-none font-medium'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  {msg.text}
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      type="button"
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="hover:text-slate-600 flex items-center gap-0.5"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-sky-100 border border-sky-200 text-sky-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-600" />
                <span>AI is thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-2.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 shrink-0 px-1">
            Ideas:
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(qp.prompt)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-sky-300 text-[11px] font-medium text-slate-700 hover:text-sky-700 shrink-0 flex items-center gap-1.5 shadow-2xs transition-all"
            >
              {qp.icon}
              <span>{qp.label}</span>
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div className="p-3 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything or talk about career, coding, or life..."
              disabled={loading}
              className="flex-1 p-3 rounded-xl glass-input text-xs text-slate-900 border border-slate-300 focus:border-sky-600"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="gradient-btn px-5 py-3 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
