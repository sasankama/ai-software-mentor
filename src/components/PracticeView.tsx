import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { PracticeExercise } from '../types';
import {
  Dumbbell,
  CheckCircle2,
  Lightbulb,
  Eye,
  EyeOff,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const PracticeView: React.FC = () => {
  const { currentDailyContent, isLoadingDay, progress, markTaskDone, setActiveTab } = useProgress();
  const [selectedExIdx, setSelectedExIdx] = useState<number>(0);
  const [codeMap, setCodeMap] = useState<Record<string, string>>({});
  const [showSolutionMap, setShowSolutionMap] = useState<Record<string, boolean>>({});
  const [showHintMap, setShowHintMap] = useState<Record<string, boolean>>({});
  const [outputMap, setOutputMap] = useState<Record<string, { text: string; isError: boolean }>>({});
  const [completedExIds, setCompletedExIds] = useState<string[]>([]);

  if (isLoadingDay || !currentDailyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Preparing Today's 5 Practice Exercises...
        </p>
      </div>
    );
  }

  const { practice, day } = currentDailyContent;
  const isAllDone = Boolean(progress.dayProgressMap[day]?.practiceDone);
  const currentEx = practice[selectedExIdx] || practice[0];

  // Get code for current exercise
  const currentCode = codeMap[currentEx.id] ?? currentEx.starterCode;

  const handleCodeChange = (newCode: string) => {
    setCodeMap((prev) => ({ ...prev, [currentEx.id]: newCode }));
  };

  const handleRunCode = () => {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('Error: ' + args.join(' ')),
        warn: (...args: any[]) => logs.push('Warn: ' + args.join(' ')),
      };

      // Safely run student code in browser scope
      const runFn = new Function('console', currentCode);
      runFn(customConsole);

      const outputText = logs.length > 0 ? logs.join('\n') : 'Code executed successfully with no console output.';
      setOutputMap((prev) => ({ ...prev, [currentEx.id]: { text: outputText, isError: false } }));

      // Mark this individual exercise as checked
      if (!completedExIds.includes(currentEx.id)) {
        setCompletedExIds((prev) => [...prev, currentEx.id]);
      }
    } catch (err: any) {
      setOutputMap((prev) => ({
        ...prev,
        [currentEx.id]: { text: `Runtime Error: ${err.message}`, isError: true }
      }));
    }
  };

  const handleResetCode = () => {
    setCodeMap((prev) => ({ ...prev, [currentEx.id]: currentEx.starterCode }));
    setOutputMap((prev) => ({ ...prev, [currentEx.id]: { text: '', isError: false } }));
  };

  const toggleSolution = (id: string) => {
    setShowSolutionMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: string) => {
    setShowHintMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCompleteAll = () => {
    markTaskDone(day, 'practice');
    setActiveTab('challenge');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Practice Header Banner */}
      <div className="bento-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
              Day {day} • 20 Min Practice
            </span>
            <span className="text-xs font-semibold text-zinc-400">
              3 Beginner + 2 Intermediate Exercises
            </span>
          </div>
          <h1 className="text-xl font-extrabold text-white mt-1">
            Hands-On Interactive Exercises
          </h1>
        </div>

        <button
          id="finish-practice-btn"
          onClick={handleCompleteAll}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
            isAllDone
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          <span>{isAllDone ? 'Practice Completed! Go to Challenge' : 'Complete Practice & Go to Challenge'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Exercise Tabs Row */}
      <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
        {practice.map((ex, idx) => {
          const isSelected = selectedExIdx === idx;
          const isDone = completedExIds.includes(ex.id);
          return (
            <button
              key={ex.id}
              onClick={() => setSelectedExIdx(idx)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-500 shadow-sm'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <span>Ex {idx + 1}: {ex.difficulty}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      {/* Main Exercise Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel: Exercise Description & Hints */}
        <div className="bento-card space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
              Exercise {selectedExIdx + 1} of 5
            </span>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              currentEx.difficulty === 'Beginner'
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                : 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
            }`}>
              {currentEx.difficulty}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {currentEx.title}
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            {currentEx.prompt}
          </p>

          {/* Hints Section */}
          <div className="pt-3 border-t border-zinc-800/80 space-y-2">
            <button
              onClick={() => toggleHint(currentEx.id)}
              className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:underline"
            >
              <Lightbulb className="w-4 h-4" />
              <span>{showHintMap[currentEx.id] ? 'Hide Hints' : 'Show Mentor Hints'}</span>
            </button>

            {showHintMap[currentEx.id] && (
              <ul className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-3.5 space-y-1.5 text-xs text-amber-200">
                {currentEx.hints.map((h, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="font-bold text-amber-400">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Solution Toggle (Hidden by default) */}
          <div className="pt-2 border-t border-zinc-800/80 space-y-2">
            <button
              onClick={() => toggleSolution(currentEx.id)}
              className="flex items-center space-x-1.5 text-xs font-bold text-blue-400 hover:underline"
            >
              {showSolutionMap[currentEx.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showSolutionMap[currentEx.id] ? 'Hide Solution' : 'Reveal Solution'}</span>
            </button>

            {showSolutionMap[currentEx.id] && (
              <div className="bg-zinc-950 text-zinc-200 rounded-xl p-4 text-xs font-mono overflow-x-auto border border-zinc-800">
                <code>{currentEx.solution}</code>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Interactive Code Playground */}
        <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-md flex flex-col overflow-hidden">
          {/* Editor Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
            <span className="text-xs font-bold text-zinc-300 font-mono">JavaScript Playground</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetCode}
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs flex items-center gap-1 transition"
                title="Reset to starter code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handleRunCode}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Code</span>
              </button>
            </div>
          </div>

          {/* Code Input Area */}
          <textarea
            value={currentCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-64 p-4 bg-zinc-950 text-zinc-100 font-mono text-xs focus:outline-none resize-none leading-relaxed"
            placeholder="Write your JavaScript solution here..."
            spellCheck={false}
          />

          {/* Output / Console Window */}
          <div className="border-t border-zinc-800 bg-zinc-900/60 p-4 min-h-[120px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono block mb-2">
              Console Output
            </span>
            {outputMap[currentEx.id] ? (
              <pre className={`text-xs font-mono whitespace-pre-wrap ${
                outputMap[currentEx.id].isError ? 'text-rose-400' : 'text-emerald-400'
              }`}>
                {outputMap[currentEx.id].text}
              </pre>
            ) : (
              <p className="text-xs font-mono text-zinc-500 italic">
                Press "Run Code" above to execute your solution in the browser console.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
