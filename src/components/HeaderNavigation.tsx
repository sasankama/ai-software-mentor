import React from 'react';
import { useProgress } from '../context/ProgressContext';
import {
  LayoutDashboard,
  BookOpen,
  Dumbbell,
  Code2,
  FolderGit2,
  HelpCircle,
  TrendingUp,
  Trophy,
  Settings as SettingsIcon,
  Flame,
  Sun,
  Moon,
  Bot
} from 'lucide-react';

interface HeaderNavigationProps {
  onOpenAiMentorModal: () => void;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({ onOpenAiMentorModal }) => {
  const { progress, activeTab, setActiveTab, toggleDarkMode } = useProgress();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'lesson', label: "Today's Lesson", icon: BookOpen },
    { id: 'practice', label: 'Practice', icon: Dumbbell },
    { id: 'challenge', label: 'Challenge', icon: Code2 },
    { id: 'project', label: 'Project', icon: FolderGit2 },
    { id: 'quiz', label: 'Quiz', icon: HelpCircle },
    { id: 'progress', label: 'Roadmap', icon: TrendingUp },
    { id: 'achievements', label: 'Badges', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20 group-hover:bg-blue-500 transition-colors">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight text-white">
                  AI SE Mentor
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md font-mono font-bold bg-blue-600/10 text-blue-400 border border-blue-500/20">
                  Day {progress.currentDay}/180
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 -mt-0.5 font-medium">
                2 Hrs/Day • Internship Ready
              </p>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center space-x-3">
            {/* Streak Counter Badge */}
            <div
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-amber-400 text-xs font-semibold"
              title="Current Daily Study Streak"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span className="stat-value font-bold">{progress.studyStreak} Day 🔥</span>
            </div>

            {/* AI Senior Mentor Assistant Button */}
            <button
              id="ai-mentor-btn"
              onClick={onOpenAiMentorModal}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm shadow-blue-600/30"
              title="Ask your Senior AI Mentor a question"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Ask AI Mentor</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition"
              aria-label="Toggle theme"
            >
              {progress.darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-300" />}
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex space-x-1 overflow-x-auto no-scrollbar py-2 border-t border-zinc-900">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
