import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import { HeaderNavigation } from './components/HeaderNavigation';
import { DashboardView } from './components/DashboardView';
import { LessonView } from './components/LessonView';
import { PracticeView } from './components/PracticeView';
import { CodingChallengeView } from './components/CodingChallengeView';
import { ProjectTaskView } from './components/ProjectTaskView';
import { QuizView } from './components/QuizView';
import { ProgressView } from './components/ProgressView';
import { AchievementsView } from './components/AchievementsView';
import { SettingsView } from './components/SettingsView';
import { AiMentorModal } from './components/AiMentorModal';
import { AuthModal } from './components/AuthModal';

const AppContent: React.FC = () => {
  const { activeTab } = useProgress();
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [aiMentorQuery, setAiMentorQuery] = useState<string | undefined>(undefined);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const handleOpenAiMentor = (initialQuery?: string) => {
    setAiMentorQuery(initialQuery);
    setIsAiMentorOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'lesson':
        return <LessonView onOpenAiMentor={handleOpenAiMentor} />;
      case 'practice':
        return <PracticeView />;
      case 'challenge':
        return <CodingChallengeView />;
      case 'project':
        return <ProjectTaskView />;
      case 'quiz':
        return <QuizView />;
      case 'progress':
        return <ProgressView />;
      case 'achievements':
        return <AchievementsView />;
      case 'settings':
        return <SettingsView onOpenAuthModal={() => setIsAuthModalOpen(true)} />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 transition-colors duration-200 selection:bg-blue-500/30">
      <HeaderNavigation
        onOpenAiMentorModal={() => handleOpenAiMentor()}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>

      <AiMentorModal
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
        initialQuery={aiMentorQuery}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <AppContent />
      </ProgressProvider>
    </AuthProvider>
  );
}

