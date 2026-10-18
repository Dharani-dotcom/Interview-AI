import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Building2,
  Hash,
  Percent,
  TrendingUp,
  Scale,
  Clock,
  Gauge,
  Compass,
  Boxes,
  Shapes,
  Dice5,
  Users2,
  ArrowRight
} from 'lucide-react';
import { TOPIC_APTITUDE_MODULES } from '../data/topicWiseAptitude';
import { AptitudeQuestion, APTITUDE_QUESTIONS } from '../data/aptitudeQuestions';

interface TopicWiseAptitudeViewProps {
  onVerifyUsage?: () => Promise<boolean>;
}

export const TopicWiseAptitudeView: React.FC<TopicWiseAptitudeViewProps> = ({ onVerifyUsage }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('topic-numbers');
  const [viewMode, setViewMode] = useState<'learn' | 'practice'>('learn');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('All');

  // Interactive MCQ State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  const currentTopic = TOPIC_APTITUDE_MODULES.find((t) => t.id === selectedTopicId) || TOPIC_APTITUDE_MODULES[0];

  // Dynamic MCQs for this topic (combines built-in topic questions + matching questions from main APTITUDE_QUESTIONS pool)
  const topicQuestions: AptitudeQuestion[] = React.useMemo(() => {
    const builtIn = (currentTopic as any).practiceQuestions || [];
    
    const titleKeyword = currentTopic.title.toLowerCase().split(' ')[0];
    const poolMatches = APTITUDE_QUESTIONS.filter((q) => {
      const qTopic = q.topic.toLowerCase();
      return (
        qTopic.includes(titleKeyword) ||
        (currentTopic.id === 'topic-percentage' && qTopic.includes('percent')) ||
        (currentTopic.id === 'topic-profit-loss' && (qTopic.includes('profit') || qTopic.includes('loss') || qTopic.includes('weight'))) ||
        (currentTopic.id === 'topic-time-work' && qTopic.includes('work')) ||
        (currentTopic.id === 'topic-time-speed-distance' && (qTopic.includes('speed') || qTopic.includes('distance') || qTopic.includes('train'))) ||
        (currentTopic.id === 'topic-mixture-alligation' && (qTopic.includes('mixt') || qTopic.includes('alligation'))) ||
        (currentTopic.id === 'topic-pnc' && (qTopic.includes('permut') || qTopic.includes('combin'))) ||
        (currentTopic.id === 'topic-probability' && qTopic.includes('prob')) ||
        (currentTopic.id === 'topic-pipes-cisterns' && (qTopic.includes('pipe') || qTopic.includes('cistern') || qTopic.includes('tank')))
      );
    });

    const combined = [...builtIn, ...poolMatches];
    const seen = new Set<string>();
    const unique: AptitudeQuestion[] = [];
    combined.forEach((q) => {
      if (!seen.has(q.question)) {
        seen.add(q.question);
        unique.push(q);
      }
    });

    if (selectedCompanyFilter === 'All') return unique;
    const exactComp = unique.filter((q) => q.company.toLowerCase() === selectedCompanyFilter.toLowerCase());
    if (exactComp.length >= 3) return exactComp;

    // Adapt built-in topic MCQs for the selected company so every company has full topic-wise practice coverage
    const adaptedBuiltIn = builtIn
      .filter((b: AptitudeQuestion) => !exactComp.some((e) => e.question === b.question))
      .map((b: AptitudeQuestion, idx: number) => ({
        ...b,
        id: `${b.id}-${selectedCompanyFilter.toLowerCase().replace(/\s+/g, '')}-${idx}`,
        company: selectedCompanyFilter as any,
        examSource: `${selectedCompanyFilter} ${currentTopic.title} Placement Practice`
      }));
    return [...exactComp, ...adaptedBuiltIn];
  }, [currentTopic, selectedCompanyFilter]);

  const handleSelectOption = async (qId: string, optIdx: number) => {
    if (Object.keys(userAnswers).length === 0 && onVerifyUsage) {
      const allowed = await onVerifyUsage();
      if (!allowed) return;
    }

    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optIdx
    }));
    setShowSolution((prev) => ({
      ...prev,
      [qId]: true
    }));
  };

  const getTopicIcon = (num: number) => {
    switch (num) {
      case 1: return <Hash className="w-4 h-4 text-amber-400" />;
      case 2: return <Percent className="w-4 h-4 text-emerald-400" />;
      case 3: return <TrendingUp className="w-4 h-4 text-rose-400" />;
      case 4: return <Scale className="w-4 h-4 text-sky-400" />;
      case 5: return <Scale className="w-4 h-4 text-indigo-400" />;
      case 6: return <Boxes className="w-4 h-4 text-purple-400" />;
      case 7: return <Clock className="w-4 h-4 text-teal-400" />;
      case 8: return <Gauge className="w-4 h-4 text-amber-400" />;
      case 9: return <Boxes className="w-4 h-4 text-blue-400" />;
      case 10: return <Sparkles className="w-4 h-4 text-pink-400" />;
      case 11: return <Compass className="w-4 h-4 text-orange-400" />;
      case 12: return <Shapes className="w-4 h-4 text-emerald-400" />;
      case 13: return <Dice5 className="w-4 h-4 text-violet-400" />;
      case 14: return <Boxes className="w-4 h-4 text-sky-400" />;
      case 15: return <Users2 className="w-4 h-4 text-amber-400" />;
      default: return <BookOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 15 TOPIC HORIZONTAL / GRID NAVIGATOR */}
      <div className="bg-[#0f0f1c] border border-white/10 rounded-3xl p-5 shadow-xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            15 Core Quantitative Syllabus Topics (Learn & Practice)
          </span>
          <span className="text-xs text-amber-400 font-semibold">
            Topic {currentTopic.topicNumber} of 15 Selected
          </span>
        </div>

        {/* 15 Topic Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {TOPIC_APTITUDE_MODULES.map((t) => {
            const isSelected = selectedTopicId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => {
                  setSelectedTopicId(t.id);
                  setUserAnswers({});
                  setShowSolution({});
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 scale-102'
                    : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-black/20 text-slate-950 font-black' : 'bg-white/10'
                }`}>
                  {t.topicNumber}
                </div>
                <div className="overflow-hidden">
                  <span className="text-xs font-semibold block truncate leading-tight">
                    {t.title}
                  </span>
                  <span className={`text-[10px] block truncate ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-400'}`}>
                    {t.difficulty}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SELECTED TOPIC HERO CARD */}
      <div className="bg-[#121222] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                {getTopicIcon(currentTopic.topicNumber)}
                Topic {currentTopic.topicNumber}: {currentTopic.title}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Difficulty: {currentTopic.difficulty}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {currentTopic.overview}
            </p>
          </div>

          {/* Learn vs Practice Tabs */}
          <div className="flex items-center bg-black/40 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('learn')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'learn'
                  ? 'bg-gradient-to-r from-sky-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{currentTopic.learnTitle}</span>
            </button>

            <button
              onClick={() => setViewMode('practice')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                viewMode === 'practice'
                  ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>{currentTopic.practiceTitle}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[10px] font-mono">
                {topicQuestions.length}
              </span>
            </button>
          </div>
        </div>

        {/* VIEW 1: LEARN (Formulas, Concepts & Solved Examples) */}
        {viewMode === 'learn' ? (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                ⚡ High-Yield Formula Sheet & Key Principles
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-amber-200">
                {currentTopic.quickFormulas.map((formula, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 bg-black/40 p-2.5 rounded-xl border border-amber-500/20">
                    <span className="font-bold text-amber-400 font-mono">#{fIdx + 1}</span>
                    <span className="font-mono">{formula}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentTopic.concepts.map((concept, cIdx) => (
                <div key={cIdx} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-400 text-xs flex items-center justify-center font-bold">
                      {cIdx + 1}
                    </span>
                    {concept.heading}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {concept.content}
                  </p>

                  {concept.keyFormulas && concept.keyFormulas.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-sky-300">Core Formulas:</span>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono">
                        {concept.keyFormulas.map((kf, kfIdx) => (
                          <li key={kfIdx}>{kf}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {concept.solvedExample && (
                    <div className="mt-4 p-4 rounded-xl bg-black/60 border border-emerald-500/30 space-y-2.5">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        Step-by-Step Solved Placement Example
                      </span>

                      <div className="text-xs sm:text-sm text-white font-medium">
                        <strong>Problem:</strong> {concept.solvedExample.question}
                      </div>

                      <div className="space-y-1 text-xs text-slate-300">
                        {concept.solvedExample.steps.map((step, sIdx) => (
                          <div key={sIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-mono font-bold">{sIdx + 1}.</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-bold">
                        Final Answer: {concept.solvedExample.answer}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setViewMode('practice')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-bold text-sm shadow-xl shadow-amber-600/30 inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Ready to Practice? Open {currentTopic.title} MCQs ({topicQuestions.length})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* VIEW 2: PRACTICE MCQ SECTION */
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-white/10 text-xs">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-slate-400 font-semibold flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-amber-400" /> Filter by Recruiter:
                </span>
                {['All', 'TCS', 'Infosys', 'Honeywell', 'Google', 'Microsoft', 'Amazon', 'Qualcomm', 'Wipro', 'Cognizant'].map((comp) => (
                  <button
                    key={comp}
                    onClick={() => setSelectedCompanyFilter(comp)}
                    className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                      selectedCompanyFilter === comp
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>

              <span className="text-slate-400">
                Showing {topicQuestions.length} Questions for {currentTopic.title}
              </span>
            </div>

            <div className="space-y-6">
              {topicQuestions.map((q, qIdx) => {
                const selectedOpt = userAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;

                return (
                  <div key={q.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 shadow-md">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Q{qIdx + 1}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-sky-500/20 text-sky-300">
                          {q.company}
                        </span>
                        <span className="text-xs text-slate-400 hidden sm:inline">
                          {q.examSource}
                        </span>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        q.difficulty === 'Hard' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="text-sm font-medium text-white leading-relaxed">
                      {q.question}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOpt === optIdx;
                        const isThisCorrect = optIdx === q.correctIndex;

                        let style = 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10';
                        if (isAnswered) {
                          if (isThisCorrect) {
                            style = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400';
                          } else if (isChosen && !isThisCorrect) {
                            style = 'bg-rose-500/20 border-rose-500 text-rose-200 ring-1 ring-rose-400';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectOption(q.id, optIdx)}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium flex items-start gap-2.5 transition-all cursor-pointer ${style}`}
                          >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${
                              isAnswered && isThisCorrect
                                ? 'bg-emerald-500 text-white'
                                : isAnswered && isChosen && !isThisCorrect
                                ? 'bg-rose-500 text-white'
                                : 'bg-white/10 text-slate-400'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="leading-relaxed">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {showSolution[q.id] && (
                      <div className="mt-3 p-4 rounded-xl bg-black/60 border border-amber-500/30 space-y-2 animate-in fade-in duration-200 text-xs">
                        <div className="flex items-center justify-between font-bold text-amber-400">
                          <span className="flex items-center gap-1.5">
                            <Lightbulb className="w-4 h-4" /> Step-by-Step Derivation:
                          </span>
                          <span className="text-emerald-400">
                            Correct: Option {String.fromCharCode(65 + q.correctIndex)} ({q.options[q.correctIndex]})
                          </span>
                        </div>
                        <p className="text-slate-300 font-mono leading-relaxed whitespace-pre-line">
                          {q.explanation}
                        </p>
                        {q.shortcutFormula && (
                          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono">
                            ⚡ Shortcut: {q.shortcutFormula}
                          </div>
                        )}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
