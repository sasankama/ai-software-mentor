import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';
import { UserProgress, DailyContent, DayCompletionStatus, Achievement } from '../types';
import { generateDefaultDayContent, INITIAL_ACHIEVEMENTS } from '../data/roadmapData';

const LOCAL_STORAGE_KEY = 'ai_se_mentor_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  currentDay: 1,
  completedDays: [],
  studyStreak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalStudyHours: 0,
  completedLessonsCount: 0,
  quizScores: [],
  codingChallengesCompleted: 0,
  completedProjectTasksCount: 0,
  currentProjectName: 'Calculator App',
  completedProjects: [],
  topicsCompleted: [],
  githubCommits: 3,
  weakTopics: [],
  dayProgressMap: {},
  unlockedBadges: [],
  darkMode: false
};

interface ProgressContextType {
  progress: UserProgress;
  achievements: Achievement[];
  currentDailyContent: DailyContent | null;
  isLoadingDay: boolean;
  isCloudSynced: boolean;
  isSyncing: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  fetchDayContent: (day: number) => Promise<void>;
  markTaskDone: (
    day: number,
    taskType: 'lesson' | 'practice' | 'challenge' | 'project' | 'quiz',
    extraData?: { score?: number; total?: number }
  ) => void;
  toggleDarkMode: () => void;
  resetProgress: () => void;
  exportProgressJSON: () => string;
  importProgressJSON: (jsonStr: string) => boolean;
  addWeakTopic: (topic: string) => void;
  removeWeakTopic: (topic: string) => void;
  addGithubCommit: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  // Prevent the initial local progress state from overwriting the user's cloud data
  // while Firestore is still loading after sign-in.
  const cloudReadyUid = useRef<string | null>(null);

  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROGRESS, ...parsed };
      }
    } catch (e) {
      console.error('Error loading progress from localStorage:', e);
    }
    return DEFAULT_PROGRESS;
  });

  const [currentDailyContent, setCurrentDailyContent] = useState<DailyContent | null>(null);
  const [isLoadingDay, setIsLoadingDay] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Load user progress from Firestore when authenticated.
  // Firestore must become the source of truth before any local state is saved
  // back to the user's document. This prevents a new device's Day 1/default
  // state from overwriting an existing Day 2+ cloud state during sign-in.
  useEffect(() => {
    cloudReadyUid.current = null;

    if (!user) {
      setIsCloudSynced(false);
      setIsSyncing(false);
      return;
    }

    const uid = user.uid;
    let cancelled = false;

    const loadUserProgress = async () => {
      setIsSyncing(true);
      setIsCloudSynced(false);

      try {
        const userDocRef = doc(db, 'users', uid);
        const snapshot = await getDoc(userDocRef);

        if (cancelled) return;

        if (snapshot.exists()) {
          const cloudData = snapshot.data() as UserProgress;
          setProgress({
            ...DEFAULT_PROGRESS,
            ...cloudData,
          });
        } else {
          // First login for a new account: migrate the current local progress once.
          await setDoc(userDocRef, {
            ...progress,
            updatedAt: new Date().toISOString(),
          }, { merge: true });
        }

        // Only allow Firestore writes after the initial cloud load/migration
        // has completed for this exact authenticated user.
        cloudReadyUid.current = uid;
        setIsCloudSynced(true);
      } catch (err) {
        console.error('Error loading user progress from Firestore:', err);
        if (!cancelled) {
          cloudReadyUid.current = null;
          setIsCloudSynced(false);
        }
      } finally {
        if (!cancelled) {
          setIsSyncing(false);
        }
      }
    };

    loadUserProgress();

    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  // Save progress changes to localStorage and Firestore.
  // Never write to Firestore until the authenticated user's cloud data
  // has finished loading.
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving progress to localStorage:', e);
    }

    if (user && cloudReadyUid.current === user.uid) {
      const saveToFirestore = async () => {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          await setDoc(userDocRef, {
            ...progress,
            updatedAt: new Date().toISOString(),
          }, { merge: true });
          setIsCloudSynced(true);
        } catch (err) {
          console.error('Error saving progress to Firestore:', err);
          setIsCloudSynced(false);
        }
      };

      saveToFirestore();
    }
  }, [progress, user?.uid]);

  // Handle Dark Mode class on <html> element
  useEffect(() => {
    if (progress.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.darkMode]);

  // Load content for current day on startup or when currentDay changes
  useEffect(() => {
    fetchDayContent(progress.currentDay);
  }, [progress.currentDay]);

  const fetchDayContent = async (dayNumber: number) => {
    setIsLoadingDay(true);
    try {
      const response = await fetch('/api/generate-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ day: dayNumber }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setCurrentDailyContent(result.data);
          setIsLoadingDay(false);
          return;
        }
      }
    } catch (err) {
      console.warn('API generate-day unavailable, using local generator:', err);
    }

    // Fallback to local default curriculum
    const fallback = generateDefaultDayContent(dayNumber);
    setCurrentDailyContent(fallback);
    setIsLoadingDay(false);
  };

  const markTaskDone = (
    day: number,
    taskType: 'lesson' | 'practice' | 'challenge' | 'project' | 'quiz',
    extraData?: { score?: number; total?: number }
  ) => {
    setProgress((prev) => {
      const dayMap = { ...(prev.dayProgressMap[day] || {
        lessonDone: false,
        practiceDone: false,
        challengeDone: false,
        projectDone: false,
        quizDone: false,
      }) };

      let newLessonsCount = prev.completedLessonsCount;
      let newChallengesCount = prev.codingChallengesCompleted;
      let newProjectTasksCount = prev.completedProjectTasksCount;

      if (taskType === 'lesson' && !dayMap.lessonDone) {
        dayMap.lessonDone = true;
        newLessonsCount += 1;
      } else if (taskType === 'practice' && !dayMap.practiceDone) {
        dayMap.practiceDone = true;
      } else if (taskType === 'challenge' && !dayMap.challengeDone) {
        dayMap.challengeDone = true;
        newChallengesCount += 1;
      } else if (taskType === 'project' && !dayMap.projectDone) {
        dayMap.projectDone = true;
        newProjectTasksCount += 1;
      } else if (taskType === 'quiz') {
        dayMap.quizDone = true;
        if (extraData?.score !== undefined) {
          dayMap.quizScore = extraData.score;
          dayMap.quizTotal = extraData.total || 5;
        }
      }

      // Check if all 5 modules for this day are complete!
      const isDayFullyComplete =
        dayMap.lessonDone &&
        dayMap.practiceDone &&
        dayMap.challengeDone &&
        dayMap.projectDone &&
        dayMap.quizDone;

      const updatedCompletedDays = isDayFullyComplete && !prev.completedDays.includes(day)
        ? [...prev.completedDays, day].sort((a, b) => a - b)
        : prev.completedDays;

      // If day was completed just now, add to topics, total study hours (+2h), check streak
      let updatedStreak = prev.studyStreak;
      let updatedStudyHours = prev.totalStudyHours;
      const todayStr = new Date().toISOString().split('T')[0];

      if (isDayFullyComplete && !prev.completedDays.includes(day)) {
        updatedStudyHours += 2;
        if (prev.lastActiveDate !== todayStr) {
          updatedStreak += 1;
        }
      }

      const updatedTopics = currentDailyContent && isDayFullyComplete && !prev.topicsCompleted.includes(currentDailyContent.topicTitle)
        ? [...prev.topicsCompleted, currentDailyContent.topicTitle]
        : prev.topicsCompleted;

      // Automatically unlock next day if current day is completed!
      const nextDay = isDayFullyComplete && day === prev.currentDay && prev.currentDay < 180
        ? prev.currentDay + 1
        : prev.currentDay;

      // Save quiz scores history
      const newQuizScores = extraData?.score !== undefined
        ? [...prev.quizScores.filter(q => q.day !== day), { day, score: extraData.score, total: extraData.total || 5, date: todayStr }]
        : prev.quizScores;

      return {
        ...prev,
        currentDay: nextDay,
        completedDays: updatedCompletedDays,
        completedLessonsCount: newLessonsCount,
        codingChallengesCompleted: newChallengesCount,
        completedProjectTasksCount: newProjectTasksCount,
        studyStreak: updatedStreak,
        totalStudyHours: updatedStudyHours,
        lastActiveDate: todayStr,
        topicsCompleted: updatedTopics,
        quizScores: newQuizScores,
        dayProgressMap: {
          ...prev.dayProgressMap,
          [day]: dayMap
        }
      };
    });
  };

  const toggleDarkMode = () => {
    setProgress((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const resetProgress = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setProgress(DEFAULT_PROGRESS);
  };

  const exportProgressJSON = () => {
    return JSON.stringify(progress, null, 2);
  };

  const importProgressJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed.currentDay === 'number' && Array.isArray(parsed.completedDays)) {
        setProgress(parsed);
        return true;
      }
    } catch (e) {
      console.error('Failed to parse progress JSON:', e);
    }
    return false;
  };

  const addWeakTopic = (topic: string) => {
    if (!topic.trim()) return;
    setProgress((prev) => ({
      ...prev,
      weakTopics: Array.from(new Set([...prev.weakTopics, topic.trim()]))
    }));
  };

  const removeWeakTopic = (topic: string) => {
    setProgress((prev) => ({
      ...prev,
      weakTopics: prev.weakTopics.filter((t) => t !== topic)
    }));
  };

  const addGithubCommit = () => {
    setProgress((prev) => ({ ...prev, githubCommits: prev.githubCommits + 1 }));
  };

  // Compute Achievements dynamically
  const achievements: Achievement[] = INITIAL_ACHIEVEMENTS.map((ach) => {
    let unlocked = false;
    let progressPct = 0;
    let label = ach.targetLabel;

    if (ach.id === 'streak_7') {
      const val = progress.studyStreak;
      progressPct = Math.min(100, Math.round((val / 7) * 100));
      unlocked = val >= 7;
      label = `${val} / 7 Days`;
    } else if (ach.id === 'streak_30') {
      const val = progress.studyStreak;
      progressPct = Math.min(100, Math.round((val / 30) * 100));
      unlocked = val >= 30;
      label = `${val} / 30 Days`;
    } else if (ach.id === 'first_project') {
      const val = progress.completedProjectTasksCount;
      progressPct = Math.min(100, Math.round((val / 5) * 100));
      unlocked = val >= 5;
      label = `${Math.min(1, Math.floor(val / 5))} / 1 Project`;
    } else if (ach.id === 'challenges_10') {
      const val = progress.codingChallengesCompleted;
      progressPct = Math.min(100, Math.round((val / 10) * 100));
      unlocked = val >= 10;
      label = `${val} / 10 Challenges`;
    } else if (ach.id === 'problems_50') {
      const val = progress.codingChallengesCompleted + progress.completedLessonsCount;
      progressPct = Math.min(100, Math.round((val / 50) * 100));
      unlocked = val >= 50;
      label = `${val} / 50 Solved`;
    } else if (ach.id === 'problems_100') {
      const val = progress.codingChallengesCompleted + progress.completedLessonsCount;
      progressPct = Math.min(100, Math.round((val / 100) * 100));
      unlocked = val >= 100;
      label = `${val} / 100 Solved`;
    } else if (ach.id === 'internship_ready') {
      const val = progress.completedDays.length;
      progressPct = Math.min(100, Math.round((val / 180) * 100));
      unlocked = val >= 180;
      label = `Day ${progress.currentDay} / 180`;
    }

    return { ...ach, unlocked, progress: progressPct, targetLabel: label };
  });

  return (
    <ProgressContext.Provider
      value={{
        progress,
        achievements,
        currentDailyContent,
        isLoadingDay,
        isCloudSynced,
        isSyncing,
        activeTab,
        setActiveTab,
        fetchDayContent,
        markTaskDone,
        toggleDarkMode,
        resetProgress,
        exportProgressJSON,
        importProgressJSON,
        addWeakTopic,
        removeWeakTopic,
        addGithubCommit,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
