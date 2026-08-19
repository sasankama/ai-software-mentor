import React, { useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import {
  Settings,
  Moon,
  Sun,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Bot,
  CloudCheck,
  User,
  LogOut,
  ShieldCheck
} from 'lucide-react';

interface SettingsViewProps {
  onOpenAuthModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onOpenAuthModal }) => {
  const {
    progress,
    toggleDarkMode,
    resetProgress,
    exportProgressJSON,
    importProgressJSON,
    isCloudSynced,
    isSyncing
  } = useProgress();

  const { user, logout } = useAuth();

  const [importText, setImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<{ msg: string; isError: boolean } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);

  const handleExport = () => {
    const jsonStr = exportProgressJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-swe-mentor-progress-day${progress.currentDay}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importText.trim()) return;

    const success = importProgressJSON(importText);
    if (success) {
      setImportStatus({ msg: 'Progress successfully imported!', isError: false });
      setImportText('');
    } else {
      setImportStatus({ msg: 'Invalid JSON format. Please check the file contents.', isError: true });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setImportText(content);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Banner */}
      <div className="bento-card">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
          Preferences & Data Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Settings
        </h1>
      </div>

      {/* Cloud Account & Firebase Sync */}
      <div className="bento-card space-y-4 border-blue-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Cloud Sync & Firebase Auth
              </h3>
              <p className="text-xs text-zinc-400">
                Automatic Firestore backup across all your devices
              </p>
            </div>
          </div>

          {user && (
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              <CloudCheck className="w-3.5 h-3.5" />
              {isSyncing ? 'Syncing...' : 'Connected'}
            </span>
          )}
        </div>

        {user ? (
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-mono font-bold text-zinc-200">
                Logged in as: <span className="text-blue-400">{user.email}</span>
              </p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
                UID: {user.uid.substring(0, 16)}...
              </p>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold transition"
            >
              <LogOut className="w-4 h-4 text-rose-400" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-zinc-200">
                Guest Mode (Local Storage Only)
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Sign in with Google or Email to save current day, quiz scores, and streak to Firestore.
              </p>
            </div>

            {onOpenAuthModal && (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm shadow-blue-600/30"
              >
                <User className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Theme Settings */}
      <div className="bento-card flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">
            Appearance Mode
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Switch between Light and Dark mode interface.
          </p>
        </div>

        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs font-mono font-bold transition hover:bg-zinc-800"
        >
          {progress.darkMode ? (
            <>
              <Sun className="w-4 h-4 text-amber-400" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-blue-400" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Export & Import Data */}
      <div className="bento-card space-y-5">
        <div>
          <h3 className="text-base font-bold text-white">
            Export & Import Learning Data
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Backup your 180-day progress or restore it on another computer.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Progress JSON</span>
          </button>

          <label className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 text-xs font-mono font-bold transition cursor-pointer hover:bg-zinc-800">
            <Upload className="w-4 h-4" />
            <span>Upload JSON File</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        {/* Paste JSON Form */}
        <form onSubmit={handleImportSubmit} className="space-y-3 pt-2 border-t border-zinc-800">
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            rows={4}
            placeholder="Paste exported JSON progress content here..."
            className="w-full p-3 rounded-xl border border-zinc-800 bg-zinc-950 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={!importText.trim()}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition disabled:opacity-50"
          >
            Import JSON Progress
          </button>

          {importStatus && (
            <p className={`text-xs font-mono font-semibold ${importStatus.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
              {importStatus.msg}
            </p>
          )}
        </form>
      </div>

      {/* Danger Zone: Reset Progress */}
      <div className="bento-card border-rose-900/60 bg-rose-950/20 space-y-4">
        <div>
          <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone: Reset Progress</span>
          </h3>
          <p className="text-xs text-rose-300/80 mt-0.5">
            Reset all study streaks, completed lessons, quizzes, and project records back to Day 1.
          </p>
        </div>

        {!showResetConfirm ? (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition"
          >
            Reset All Progress
          </button>
        ) : (
          <div className="p-4 rounded-xl bg-zinc-950 border border-rose-800 space-y-3">
            <p className="text-xs font-bold text-rose-300">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-200 text-xs font-bold hover:bg-zinc-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
