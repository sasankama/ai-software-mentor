import React from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  Play,
  Flame,
  Clock,
  CheckCircle2,
  Trophy,
  BookOpen,
  Code2,
  FolderGit2,
  HelpCircle,
  ArrowRight,
  Target,
  Sparkles,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { progress, currentDailyContent, setActiveTab } = useProgress();

  const totalDays = 180;
  const completedDaysCount = progress.completedDays.length;
  const progressPercent = Math.min(100, Math.round((completedDaysCount / totalDays) * 100));

  // Compute quiz average
  const totalQuizPoints = progress.quizScores.reduce((acc, q) => acc + q.score, 0);
  const totalQuizMax = progress.quizScores.reduce((acc, q) => acc + q.total, 0);
  const quizAverage = totalQuizMax > 0 ? Math.round((totalQuizPoints / totalQuizMax) * 100) : 0;

  // Day Progress breakdown for currentDay
  const todayMap = progress.dayProgressMap[progress.currentDay] || {
    lessonDone: false,
    practiceDone: false,
    challengeDone: false,
    projectDone: false,
    quizDone: false,
  };

  const todayCompletedCount = [
    todayMap.lessonDone,
    todayMap.practiceDone,
    todayMap.challengeDone,
    todayMap.projectDone,
    todayMap.quizDone,
  ].filter(Boolean).length;

  const todayProgressPercent = Math.round((todayCompletedCount / 5) * 100);

  // Month calculation
  const currentMonth = Math.min(6, Math.ceil(progress.currentDay / 30));

  return (
    <div className="space-y-6">
      {/* Top Header Greeting Bar */}
      <header className="flex flex-wrap items-end justify-between gap-4 pb-2 border-b border-zinc-800/60">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Good day, Developer.
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Ready to tackle your 2-hour software engineering curriculum for <strong className="text-blue-400">Day {progress.currentDay}</strong>?
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Daily Streak</span>
            <span className="text-lg font-extrabold text-orange-500 stat-value">{progress.studyStreak} Days 🔥</span>
          </div>
          <button
            id="dashboard-top-resume-btn"
            onClick={() => setActiveTab('lesson')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-600/20"
          >
            Resume Day {progress.currentDay}
          </button>
        </div>
      </header>

      {/* Primary Bento Grid Row 1: Today's Mission & Overall Progress */}
      <div className="grid grid-cols-12 gap-6">
        {/* Today's Mission Spotlight Card (Col 8) */}
        <div className="col-span-12 lg:col-span-8 bento-card relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-blue-500">
            <Code2 className="w-48 h-48" />
          </div>

          <div className="z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full border border-blue-500/30">
                TODAY'S MISSION • DAY {progress.currentDay}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Month {currentMonth} / 6
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              {currentDailyContent ? currentDailyContent.topicTitle : 'Programming Fundamentals'}
            </h2>

            <p className="text-zinc-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              {currentDailyContent ? currentDailyContent.lesson.simpleExplanation : 'Master key software engineering concepts with real-world mental models and senior engineer code examples.'}
            </p>

            {/* Mission Stats */}
            <div className="pt-4 flex flex-wrap gap-6 border-t border-zinc-800/80">
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Duration</span>
                <span className="font-semibold text-xs text-zinc-200 mt-0.5">{currentDailyContent?.lesson.estimatedTime || '20 min'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Difficulty</span>
                <span className="font-semibold text-xs text-emerald-400 mt-0.5">{currentDailyContent?.lesson.difficulty || 'Beginner'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Target Stack</span>
                <span className="font-semibold text-xs text-blue-400 mt-0.5">TypeScript / JS</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 z-10">
            <button
              id="dashboard-continue-btn"
              onClick={() => setActiveTab('lesson')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition shadow-sm"
            >
              <Play className="w-4 h-4 fill-zinc-950" />
              <span>Start Today's Lesson</span>
            </button>

            <button
              id="dashboard-resume-btn"
              onClick={() => setActiveTab('challenge')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 transition"
            >
              <Code2 className="w-4 h-4 text-blue-400" />
              <span>Solve Coding Challenge</span>
            </button>
          </div>
        </div>

        {/* Overall Progress Bento Box (Col 4) */}
        <div className="col-span-12 lg:col-span-4 bento-card flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider block mb-1">
              Internship Readiness
            </span>
            <h3 className="text-base font-bold text-white">Overall Roadmap Progress</h3>
          </div>

          <div className="my-6 flex flex-col items-center justify-center">
            {/* Circular Progress Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#27272a" strokeWidth="8" fill="transparent" />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#3b82f6"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * progressPercent) / 100}
                  className="progress-ring"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-black text-2xl text-white stat-value">{progressPercent}%</span>
                <span className="text-[10px] text-zinc-500 font-mono">180 Days</span>
              </div>
            </div>
            <p className="text-xs font-medium text-zinc-400 mt-2">
              {completedDaysCount} of 180 Days Completed
            </p>
          </div>

          <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400">Current Phase:</span>
              <span className="font-bold text-blue-400">Month {currentMonth} of 6</span>
            </div>
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${(currentMonth / 6) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Row 2: 4 Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bento-card flex flex-col justify-between">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Study Streak</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white stat-value">{progress.studyStreak}</span>
            <span className="text-xs text-orange-400 font-semibold">Days 🔥</span>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-500">
            Consecutive daily sessions
          </div>
        </div>

        <div className="bento-card flex flex-col justify-between">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Study Hours</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white stat-value">{progress.totalStudyHours}</span>
            <span className="text-xs text-zinc-500 font-normal">/ 360 hrs</span>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-500">
            Total curriculum time logged
          </div>
        </div>

        <div className="bento-card flex flex-col justify-between">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Quiz Score Average</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-blue-400 stat-value">{quizAverage}%</span>
            <span className="text-xs text-zinc-400 font-mono">{totalQuizPoints}/{totalQuizMax} pts</span>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-500">
            Comprehension checkpoint score
          </div>
        </div>

        <div className="bento-card flex flex-col justify-between">
          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Challenges Solved</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400 stat-value">{progress.codingChallengesCompleted}</span>
            <span className="text-xs text-emerald-500/80 font-semibold">Solved ✓</span>
          </div>
          <div className="mt-3 pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-500">
            LeetCode-style problems
          </div>
        </div>
      </div>

      {/* Bento Grid Row 3: 2-Hour Daily Flow & Current Project */}
      <div className="grid grid-cols-12 gap-6">
        {/* Daily 2-Hour Routine Checklist (Col 8) */}
        <div className="col-span-12 lg:col-span-8 bento-card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-zinc-800/60">
            <div>
              <span className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-wider">
                DAY {progress.currentDay} ROUTINE • {todayCompletedCount}/5 STEPS ({todayProgressPercent}%)
              </span>
              <h2 className="text-lg font-bold text-white">Today's 2-Hour Curriculum Checklist</h2>
            </div>

            <button
              onClick={() => setActiveTab('lesson')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              { id: 'lesson', label: '1. Lesson', time: '20m', done: todayMap.lessonDone, title: currentDailyContent?.lesson.topic || 'Concept Lesson' },
              { id: 'practice', label: '2. Practice', time: '20m', done: todayMap.practiceDone, title: '5 Practice Exercises' },
              { id: 'challenge', label: '3. Challenge', time: '20m', done: todayMap.challengeDone, title: 'Algorithm Challenge' },
              { id: 'project', label: '4. Project Task', time: '40m', done: todayMap.projectDone, title: currentDailyContent?.projectTask.projectTitle || 'Project Module' },
              { id: 'quiz', label: '5. Quiz Check', time: '20m', done: todayMap.quizDone, title: '5 Check Questions' },
            ].map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveTab(step.id as any)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all flex flex-col justify-between min-h-[100px] ${
                  step.done
                    ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                    : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-blue-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-400 font-mono">{step.label}</span>
                  {step.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <span className="text-[10px] text-zinc-500 font-mono">{step.time}</span>
                  )}
                </div>

                <p className="text-xs font-medium text-white line-clamp-2 mt-2">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Current Project Card (Col 4) */}
        <div className="col-span-12 lg:col-span-4 bento-card flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Current Project</span>
              <span className="text-[10px] text-blue-400 font-mono bg-blue-600/10 px-2 py-0.5 rounded border border-blue-500/20">
                In Progress
              </span>
            </div>

            <h3 className="text-base font-bold text-white">
              {currentDailyContent?.projectTask.projectTitle || progress.currentProjectName}
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Task #{currentDailyContent?.projectTask.taskNumber || 1}: {currentDailyContent?.projectTask.title || 'Implementation'}
            </p>

            <div className="p-3 bg-zinc-950/80 rounded-xl border border-zinc-800/80 space-y-1.5">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Finished Tasks</span>
                <span className="font-bold text-white font-mono">{progress.completedProjectTasksCount} tasks</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('project')}
            className="w-full mt-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-bold border border-zinc-700 transition"
          >
            View Project Workspace
          </button>
        </div>
      </div>

      {/* Bento Row 4: 6-Month Roadmap Overview */}
      <div className="bento-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-zinc-800/60">
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Roadmap Milestones</span>
            <h3 className="text-base font-bold text-white">6-Month Curriculum Progression</h3>
          </div>
          <button
            onClick={() => setActiveTab('progress')}
            className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>Full Timeline</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { m: 1, title: 'Month 1', sub: 'Fundamentals', days: '1-30' },
            { m: 2, title: 'Month 2', sub: 'OOP & DSA', days: '31-60' },
            { m: 3, title: 'Month 3', sub: 'Frontend Web', days: '61-90' },
            { m: 4, title: 'Month 4', sub: 'Backend Eng', days: '91-120' },
            { m: 5, title: 'Month 5', sub: 'Full Stack', days: '121-150' },
            { m: 6, title: 'Month 6', sub: 'Portfolio & Jobs', days: '151-180' },
          ].map((item) => {
            const isCurrent = currentMonth === item.m;
            const isPast = currentMonth > item.m;
            return (
              <div
                key={item.m}
                className={`p-3 rounded-xl border text-xs flex flex-col justify-between min-h-[80px] ${
                  isCurrent
                    ? 'bg-blue-600/10 border-blue-500/50 text-white font-bold'
                    : isPast
                    ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300'
                    : 'bg-zinc-950/50 border-zinc-800/60 text-zinc-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px]">{item.title}</span>
                  {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                </div>
                <div>
                  <div className="font-semibold text-[11px] text-zinc-200">{item.sub}</div>
                  <div className="text-[10px] text-zinc-500 font-mono">Days {item.days}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
