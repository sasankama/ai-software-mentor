import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  BookOpen,
  Clock,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Eye,
  Bot,
  ArrowRight
} from 'lucide-react';

interface LessonViewProps {
  onOpenAiMentor: (initialQuery?: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ onOpenAiMentor }) => {
  const { currentDailyContent, isLoadingDay, progress, markTaskDone, setActiveTab } = useProgress();
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (isLoadingDay || !currentDailyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Generating Today's Personalized AI Lesson with Senior Mentor Insights...
        </p>
      </div>
    );
  }

  const { lesson, day } = currentDailyContent;
  const isDone = Boolean(progress.dayProgressMap[day]?.lessonDone);

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleComplete = () => {
    markTaskDone(day, 'lesson');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Lesson Header Card */}
      <div className="bento-card relative">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
              Day {day} • 20 Min Lesson
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              lesson.difficulty === 'Beginner'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                : lesson.difficulty === 'Intermediate'
                ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
            }`}>
              {lesson.difficulty}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-zinc-400 flex items-center gap-1 font-mono font-medium">
              <Clock className="w-3.5 h-3.5" />
              {lesson.estimatedTime}
            </span>
            {isDone && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Lesson Completed
              </span>
            )}
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {lesson.topic}
        </h1>

        <p className="mt-2 text-sm sm:text-base text-zinc-300 leading-relaxed">
          {lesson.simpleExplanation}
        </p>

        {/* Learning Objectives List */}
        <div className="mt-6 pt-6 border-t border-zinc-800/80">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 font-mono">
            Learning Objectives
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {lesson.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Real World Example & Visual Analogy Dual Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Real World Example */}
        <div className="bento-card border-blue-500/30 bg-blue-950/20">
          <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Real World Production Example</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {lesson.realWorldExample}
          </p>
        </div>

        {/* Visual Analogy */}
        <div className="bento-card border-purple-500/30 bg-purple-950/20">
          <div className="flex items-center space-x-2 text-purple-400 font-bold text-sm mb-2">
            <Eye className="w-4 h-4" />
            <span>Visual Mental Analogy</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {lesson.visualAnalogy}
          </p>
        </div>
      </div>

      {/* Code Examples */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <span>Senior Developer Code Examples</span>
        </h3>

        {lesson.codeExamples.map((ex, idx) => (
          <div key={idx} className="bg-zinc-950 text-zinc-100 rounded-2xl overflow-hidden border border-zinc-800 shadow-md">
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-xs font-mono">
              <span className="font-semibold text-zinc-300">{ex.title}</span>
              <button
                onClick={() => handleCopyCode(ex.code, idx)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[11px] transition"
              >
                {copiedIdx === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedIdx === idx ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-4 text-xs font-mono overflow-x-auto text-zinc-200 leading-relaxed">
              <code>{ex.code}</code>
            </pre>

            <div className="px-4 py-3 bg-zinc-900/50 border-t border-zinc-800/80 text-xs text-zinc-400 italic">
              <strong className="text-blue-400 not-italic font-mono">Mentor Insight:</strong> {ex.explanation}
            </div>
          </div>
        ))}
      </div>

      {/* Common Mistakes & Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Mistakes */}
        <div className="bento-card border-rose-500/20 bg-rose-950/10">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Common Beginner Mistakes</span>
          </div>
          <ul className="space-y-2">
            {lesson.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-300">
                <span className="text-rose-400 font-bold">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bento-card border-emerald-500/20 bg-emerald-950/10">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-3">
            <Lightbulb className="w-4 h-4" />
            <span>Senior Best Practices</span>
          </div>
          <ul className="space-y-2">
            {lesson.bestPractices.map((practice, i) => (
              <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-zinc-300">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{practice}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lesson Summary & Next Step Actions */}
      <div className="bento-card bg-zinc-900 border-zinc-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-blue-400">Lesson Summary</span>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {lesson.summary}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenAiMentor(`Can you explain the key concepts of ${lesson.topic} in deeper detail?`)}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition border border-zinc-700"
          >
            <Bot className="w-4 h-4 text-blue-400" />
            <span>Ask Mentor</span>
          </button>

          <button
            id="mark-lesson-complete-btn"
            onClick={() => {
              handleComplete();
              setActiveTab('practice');
            }}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition shadow-md ${
              isDone
                ? 'bg-emerald-600 text-white hover:bg-emerald-500'
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
          >
            <span>{isDone ? 'Completed! Go to Practice' : 'Mark Complete & Start Practice'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
