import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { CodeReviewResult } from '../types';
import {
  Code2,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Eye,
  EyeOff,
  Lightbulb,
  Bot,
  Star,
  AlertTriangle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const CodingChallengeView: React.FC = () => {
  const { currentDailyContent, isLoadingDay, progress, markTaskDone, setActiveTab } = useProgress();
  const [userCode, setUserCode] = useState<string>('');
  const [output, setOutput] = useState<{ text: string; isError: boolean } | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [isReviewing, setIsReviewing] = useState<boolean>(false);
  const [reviewResult, setReviewResult] = useState<CodeReviewResult | null>(null);

  if (isLoadingDay || !currentDailyContent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Generating Today's LeetCode-style Coding Challenge...
        </p>
      </div>
    );
  }

  const { challenge, day } = currentDailyContent;
  const isDone = Boolean(progress.dayProgressMap[day]?.challengeDone);

  // Initialize starter code
  const codeToEdit = userCode || challenge.starterCode;

  const handleRunCode = () => {
    try {
      const logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' ')),
        error: (...args: any[]) => logs.push('Error: ' + args.join(' ')),
      };

      const runFn = new Function('console', codeToEdit);
      runFn(customConsole);

      setOutput({
        text: logs.length > 0 ? logs.join('\n') : 'Code executed successfully without error.',
        isError: false
      });
    } catch (err: any) {
      setOutput({
        text: `Runtime Error: ${err.message}`,
        isError: true
      });
    }
  };

  const handleRequestReview = async () => {
    setIsReviewing(true);
    setReviewResult(null);

    try {
      const response = await fetch('/api/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: codeToEdit,
          taskTitle: challenge.title,
          problemStatement: challenge.problemStatement,
          language: 'javascript'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setReviewResult(data);
      }
    } catch (e) {
      console.error('Code review error:', e);
    } finally {
      setIsReviewing(false);
    }
  };

  const handleComplete = () => {
    markTaskDone(day, 'challenge');
    setActiveTab('project');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bento-card flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
              Day {day} • 20 Min Challenge
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
              {challenge.difficulty}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
            {challenge.title}
          </h1>
        </div>

        <button
          id="finish-challenge-btn"
          onClick={handleComplete}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition ${
            isDone
              ? 'bg-emerald-600 text-white hover:bg-emerald-500'
              : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          <span>{isDone ? 'Challenge Completed! Go to Project' : 'Mark Complete & Go to Project'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Challenge Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side: Problem Statement & Specs */}
        <div className="bento-card space-y-5 overflow-y-auto max-h-[700px]">
          <div>
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Problem Statement
            </h3>
            <p className="text-sm text-zinc-200 leading-relaxed font-medium">
              {challenge.problemStatement}
            </p>
          </div>

          {/* Formats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <span className="font-bold text-white block mb-1">Input Format</span>
              <p className="text-zinc-400">{challenge.inputFormat}</p>
            </div>

            <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
              <span className="font-bold text-white block mb-1">Output Format</span>
              <p className="text-zinc-400">{challenge.outputFormat}</p>
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
              Examples
            </h3>
            {challenge.examples.map((ex, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs space-y-1">
                <div><span className="text-zinc-500">Input:</span> {ex.input}</div>
                <div><span className="text-emerald-400">Output:</span> {ex.output}</div>
                {ex.explanation && (
                  <div className="text-[11px] text-zinc-400 font-sans italic pt-1 border-t border-zinc-800">
                    {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div>
            <h3 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-2">
              Constraints
            </h3>
            <ul className="space-y-1 text-xs text-zinc-400 font-mono list-disc list-inside">
              {challenge.constraints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Hints & Hidden Solution */}
          <div className="pt-3 border-t border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:underline"
              >
                <Lightbulb className="w-4 h-4" />
                <span>{showHints ? 'Hide Hints' : 'Get Hints'}</span>
              </button>

              <button
                onClick={() => setShowSolution(!showSolution)}
                className="flex items-center space-x-1.5 text-xs font-bold text-blue-400 hover:underline"
              >
                {showSolution ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showSolution ? 'Hide Solution' : 'Reveal Official Solution'}</span>
              </button>
            </div>

            {showHints && (
              <ul className="bg-amber-950/30 border border-amber-800/50 rounded-xl p-3.5 space-y-1 text-xs text-amber-200">
                {challenge.hints.map((h, i) => (
                  <li key={i}>• {h}</li>
                ))}
              </ul>
            )}

            {showSolution && (
              <div className="bg-zinc-950 text-zinc-200 rounded-xl p-4 text-xs font-mono border border-zinc-800 overflow-x-auto">
                <code>{challenge.solution}</code>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Code Editor & AI Code Review */}
        <div className="space-y-4">
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 shadow-md flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
              <span className="text-xs font-bold text-zinc-300 font-mono">Solution Workspace</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setUserCode(challenge.starterCode)}
                  className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleRunCode}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>Run</span>
                </button>

                <button
                  onClick={handleRequestReview}
                  disabled={isReviewing}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition disabled:opacity-50"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>{isReviewing ? 'Reviewing...' : 'AI Review'}</span>
                </button>
              </div>
            </div>

            <textarea
              value={codeToEdit}
              onChange={(e) => setUserCode(e.target.value)}
              className="w-full h-80 p-4 bg-zinc-950 text-zinc-100 font-mono text-xs focus:outline-none resize-none leading-relaxed"
              spellCheck={false}
            />

            {/* Output Window */}
            <div className="border-t border-zinc-800 bg-zinc-900/60 p-4 min-h-[100px]">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 font-mono block mb-1">
                Execution Output
              </span>
              {output ? (
                <pre className={`text-xs font-mono whitespace-pre-wrap ${output.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {output.text}
                </pre>
              ) : (
                <p className="text-xs font-mono text-zinc-500 italic">
                  Run your code or request an AI Review above.
                </p>
              )}
            </div>
          </div>

          {/* AI Senior Code Review Card */}
          {reviewResult && (
            <div className="bento-card border-blue-500/40 bg-zinc-900/90 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span className="font-bold text-sm text-white">
                    Senior Staff Engineer Review
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-amber-400 font-mono font-extrabold text-sm">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{reviewResult.score} / 10 Score</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 italic bg-zinc-950/80 p-3 rounded-xl border border-zinc-800">
                "{reviewResult.mentorFeedback}"
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-bold text-emerald-400 block mb-1 font-mono">Strengths</span>
                  <ul className="space-y-1 text-zinc-300">
                    {reviewResult.strengths.map((s, idx) => (
                      <li key={idx}>✓ {s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-bold text-amber-400 block mb-1 font-mono">Areas to Improve</span>
                  <ul className="space-y-1 text-zinc-300">
                    {reviewResult.areasForImprovement.map((a, idx) => (
                      <li key={idx}>• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {reviewResult.suggestedRefactoring && (
                <div className="pt-2">
                  <span className="font-bold text-xs text-white block mb-1 font-mono">
                    Suggested Refactored Clean Code:
                  </span>
                  <pre className="p-3 bg-zinc-950 text-zinc-200 rounded-xl text-[11px] font-mono overflow-x-auto border border-zinc-800">
                    <code>{reviewResult.suggestedRefactoring}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
