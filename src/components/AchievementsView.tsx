import React from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  Trophy,
  Flame,
  Zap,
  FolderCheck,
  Code,
  Award,
  GraduationCap,
  Lock,
  CheckCircle2
} from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements } = useProgress();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-6 h-6 text-amber-500" />;
      case 'Zap': return <Zap className="w-6 h-6 text-yellow-500" />;
      case 'FolderCheck': return <FolderCheck className="w-6 h-6 text-blue-500" />;
      case 'Code': return <Code className="w-6 h-6 text-emerald-500" />;
      case 'Trophy': return <Trophy className="w-6 h-6 text-purple-500" />;
      case 'Award': return <Award className="w-6 h-6 text-indigo-500" />;
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-sky-500" />;
      default: return <Trophy className="w-6 h-6 text-amber-500" />;
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bento-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Milestone Badges
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Engineering Achievements
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Unlock badges by maintaining study streaks, solving problems, and building projects.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 font-mono font-bold text-sm">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>{unlockedCount} / {achievements.length} Badges Unlocked</span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((badge) => (
          <div
            key={badge.id}
            className={`bento-card p-5 transition relative flex flex-col justify-between ${
              badge.unlocked
                ? 'border-emerald-500/40 bg-zinc-900/90'
                : 'border-zinc-800 bg-zinc-900/40 opacity-75'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-xl border ${
                  badge.unlocked
                    ? 'bg-zinc-950 border-zinc-800'
                    : 'bg-zinc-950/60 border-zinc-900'
                }`}>
                  {getIcon(badge.iconName)}
                </div>

                {badge.unlocked ? (
                  <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Unlocked
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-mono font-medium text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded-full border border-zinc-800">
                    <Lock className="w-3.5 h-3.5" />
                    Locked
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white">
                {badge.title}
              </h3>

              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {badge.description}
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono font-semibold text-zinc-400">
                <span>Progress</span>
                <span>{badge.targetLabel}</span>
              </div>

              <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden border border-zinc-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    badge.unlocked ? 'bg-emerald-500' : 'bg-blue-600'
                  }`}
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
