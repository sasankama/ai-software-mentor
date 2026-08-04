export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CodeExample {
  title: string;
  language: string;
  code: string;
  explanation: string;
}

export interface Lesson {
  topic: string;
  difficulty: Difficulty;
  estimatedTime: string; // e.g. "20 min"
  learningObjectives: string[];
  simpleExplanation: string;
  realWorldExample: string;
  visualAnalogy: string;
  codeExamples: CodeExample[];
  commonMistakes: string[];
  bestPractices: string[];
  summary: string;
}

export interface PracticeExercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate';
  prompt: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: { input: string; expectedOutput: string }[];
}

export interface ChallengeExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: Difficulty;
  problemStatement: string;
  inputFormat: string;
  outputFormat: string;
  examples: ChallengeExample[];
  constraints: string[];
  hints: string[];
  starterCode: string;
  solution: string;
}

export interface ProjectTask {
  id: string;
  projectTitle: string; // e.g., "Calculator", "To-do App"
  taskNumber: number; // e.g. Task 1
  totalTasksInProject: number;
  title: string;
  description: string;
  requirements: string[];
  starterCode: string;
  hints: string[];
  solutionExplanation: string;
}

export type QuestionType = 'multiple_choice' | 'true_false' | 'fill_in_blank';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string;
  explanation: string;
}

export interface DailyContent {
  day: number;
  month: number;
  topicTitle: string;
  lesson: Lesson;
  practice: PracticeExercise[];
  challenge: CodingChallenge;
  projectTask: ProjectTask;
  quiz: QuizQuestion[];
}

export interface DayCompletionStatus {
  lessonDone: boolean;
  practiceDone: boolean;
  challengeDone: boolean;
  projectDone: boolean;
  quizDone: boolean;
  quizScore?: number;
  quizTotal?: number;
  completedAt?: string;
}

export interface UserProgress {
  currentDay: number; // 1 to 180
  completedDays: number[];
  studyStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalStudyHours: number;
  completedLessonsCount: number;
  quizScores: { day: number; score: number; total: number; date: string }[];
  codingChallengesCompleted: number;
  completedProjectTasksCount: number;
  currentProjectName: string;
  completedProjects: string[];
  topicsCompleted: string[];
  githubCommits: number;
  weakTopics: string[];
  dayProgressMap: Record<number, DayCompletionStatus>;
  unlockedBadges: string[];
  darkMode: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Streak' | 'Projects' | 'Challenges' | 'Milestone';
  unlocked: boolean;
  progress: number; // 0 to 100
  targetLabel: string;
  unlockedAt?: string;
}

export interface CodeReviewResult {
  score: number; // 1-10
  strengths: string[];
  areasForImprovement: string[];
  bugsOrEdgeCases: string[];
  suggestedRefactoring: string;
  mentorFeedback: string;
}
