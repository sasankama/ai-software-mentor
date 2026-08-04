import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { ROADMAP_MONTHS } from '../data/roadmapData';
import {
  TrendingUp,
  CheckCircle2,
  Lock,
  GitCommit,
  BookOpen,
  Code2,
  FolderGit2,
  Clock,
  Flame,
  Plus,
  X,
  Sparkles,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

export const ProgressView: React.FC = () => {
  const {
    progress,
    fetchDayContent,
    setActiveTab,
    addWeakTopic,
    removeWeakTopic,
    addGithubCommit
  } = useProgress();

  const [newTopicInput, setNewTopicInput] = useState<string>('');
  const [expandedMonth, setExpandedMonth] = useState<number | null>(
    Math.min(6, Math.ceil(progress.currentDay / 30))
  );

  const completedCount = progress.completedDays.length;
  const progressPercent = Math.min(100, Math.round((completedCount / 180) * 100));

  const handleAddWeakTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopicInput.trim()) {
      addWeakTopic(newTopicInput);
      setNewTopicInput('');
    }
  };

  const handleJumpToDay = (dayNum: number) => {
    if (dayNum <= progress.currentDay || progress.completedDays.includes(dayNum)) {
      fetchDayContent(dayNum);
      setActiveTab('lesson');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="bento-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              6-Month Software Engineering Roadmap
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              180-Day Internship Readiness Tracker
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={addGithubCommit}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-950 text-white hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-semibold transition"
              title="Simulate pushing a daily GitHub commit"
            >
              <GitCommit className="w-4 h-4 text-emerald-400" />
              <span>Log GitHub Commit ({progress.githubCommits})</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono font-bold text-zinc-300">
            <span>Overall Roadmap Completion</span>
            <span>{completedCount} / 180 Days ({progressPercent}%)</span>
          </div>
          <div className="w-full bg-zinc-950 h-3.5 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-400 h-full transition-all duration-500"
              style={{ width: `${Math.max(1, progressPercent)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid: Weak Topics & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Weak Topics Focus List */}
        <div className="bento-card md:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
                Personalized AI Focus
              </span>
              <h3 className="text-base font-bold text-white mt-0.5">
                Weak Topics & Target Focus Areas
              </h3>
            </div>
          </div>

          <p className="text-xs text-zinc-400">
            Tag topics you find tricky. The Senior AI Mentor will automatically adjust explanations and give extra hints on these concepts!
          </p>

          {/* Input Form */}
          <form onSubmit={handleAddWeakTopic} className="flex gap-2 pt-1">
            <input
              type="text"
              value={newTopicInput}
              onChange={(e) => setNewTopicInput(e.target.value)}
              placeholder="e.g., Recursion, Linked Lists, JWT Auth..."
              className="flex-1 p-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Topic</span>
            </button>
          </form>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {progress.weakTopics.length > 0 ? (
              progress.weakTopics.map((topic, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/80 text-xs font-semibold"
                >
                  <span>{topic}</span>
                  <button
                    onClick={() => removeWeakTopic(topic)}
                    className="hover:text-rose-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))
            ) : (
              <p className="text-xs text-zinc-500 italic">No weak topics added yet.</p>
            )}
          </div>
        </div>

        {/* Stats Column */}
        <div className="bento-card space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
            Learning Activity Log
          </span>

          <div className="space-y-3 text-xs font-mono">
            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
              <span className="text-zinc-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                Lessons Completed
              </span>
              <span className="font-bold text-white">{progress.completedLessonsCount}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
              <span className="text-zinc-400 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                Challenges Solved
              </span>
              <span className="font-bold text-white">{progress.codingChallengesCompleted}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80">
              <span className="text-zinc-400 flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-blue-400" />
                GitHub Commits
              </span>
              <span className="font-bold text-white">{progress.githubCommits}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Months Accordion Timeline */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">
          Month-by-Month Detailed Timeline
        </h2>

        {ROADMAP_MONTHS.map((m) => {
          const isExpanded = expandedMonth === m.monthNumber;
          const startDay = (m.monthNumber - 1) * 30 + 1;
          const endDay = m.monthNumber * 30;

          // Check how many days in this month are done
          const monthDaysDone = progress.completedDays.filter(
            (d) => d >= startDay && d <= endDay
          ).length;

          return (
            <div
              key={m.monthNumber}
              className="bento-card overflow-hidden p-0"
            >
              <button
                onClick={() => setExpandedMonth(isExpanded ? null : m.monthNumber)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-zinc-800/40 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      Days {startDay} - {endDay}
                    </span>
                    <span className="text-xs font-semibold text-zinc-400">
                      Project: {m.projectAssigned}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {m.title}
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Focus: {m.focus}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {monthDaysDone}/30 Days
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-zinc-400" />
                  )}
                </div>
              </button>

              {/* Day Grid when expanded */}
              {isExpanded && (
                <div className="p-5 border-t border-zinc-800 bg-zinc-950/60">
                  <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-2">
                    {Array.from({ length: 30 }, (_, i) => {
                      const dayNum = startDay + i;
                      const isCompleted = progress.completedDays.includes(dayNum);
                      const isCurrent = progress.currentDay === dayNum;
                      const isLocked = dayNum > progress.currentDay && !isCompleted;

                      return (
                        <button
                          key={dayNum}
                          disabled={isLocked}
                          onClick={() => handleJumpToDay(dayNum)}
                          className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 font-mono ${
                            isCurrent
                              ? 'bg-blue-600 text-white border-blue-500 font-bold shadow-sm'
                              : isCompleted
                              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80'
                              : isLocked
                              ? 'bg-zinc-950 text-zinc-600 border-zinc-900 opacity-60 cursor-not-allowed'
                              : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-xs">Day {dayNum}</span>
                          {isCompleted ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : isLocked ? (
                            <Lock className="w-3.5 h-3.5 text-zinc-600" />
                          ) : (
                            <span className="text-[10px] opacity-75">Active</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
