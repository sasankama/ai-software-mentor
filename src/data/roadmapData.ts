import { DailyContent, Achievement } from '../types';

export interface MonthInfo {
  monthNumber: number;
  title: string;
  focus: string;
  projectAssigned: string;
  topics: string[];
}

export const ROADMAP_MONTHS: MonthInfo[] = [
  {
    monthNumber: 1,
    title: 'Month 1: Programming Fundamentals',
    focus: 'Variables, Logic, Control Flow, Functions, Objects, Git & Terminal',
    projectAssigned: 'Calculator & To-do App',
    topics: [
      'Variables & Data Types',
      'Operators & Expressions',
      'Input/Output & String Formatting',
      'Conditional Statements (if/else/switch)',
      'Loops (for, while, do-while)',
      'Functions & Scope',
      'Arrays & Memory Concepts',
      'Strings & String Manipulation',
      'Objects & Key-Value Structures',
      'File Handling Basics',
      'Git Fundamentals (init, add, commit)',
      'GitHub & Remote Repositories',
      'Terminal & CLI Mastery',
      'Debugging Techniques & DevTools',
      'Month 1 Consolidation & Mini-Project'
    ]
  },
  {
    monthNumber: 2,
    title: 'Month 2: Object Oriented Programming & Data Structures',
    focus: 'OOP Principles, Searching, Sorting, Linked Lists, Stacks, Queues, Trees',
    projectAssigned: 'Weather App & Expense Tracker',
    topics: [
      'Classes & Object Creation',
      'Inheritance & Method Overriding',
      'Polymorphism & Dynamic Binding',
      'Abstraction & Abstract Classes',
      'Interfaces & Contracts',
      'Collections & Array Lists',
      'Searching Algorithms (Linear, Binary)',
      'Sorting Algorithms (Bubble, Selection, Insertion)',
      'Advanced Sorting (Merge Sort, Quick Sort)',
      'Recursion & Call Stack Analysis',
      'Singly & Doubly Linked Lists',
      'Stacks & LIFO Operations',
      'Queues & Priority Queues',
      'Trees & Binary Search Trees (BST)',
      'Graphs & Adjacency Representations'
    ]
  },
  {
    monthNumber: 3,
    title: 'Month 3: Frontend Web Development',
    focus: 'HTML5, CSS3, Flexbox/Grid, Modern JavaScript (ES6+), Fetch API, React',
    projectAssigned: 'Student Management System & Library Management System',
    topics: [
      'HTML5 Semantic Structure & Forms',
      'CSS3 Styling & Box Model',
      'CSS Flexbox Layout Engine',
      'CSS Grid Layout System',
      'Responsive Design & Media Queries',
      'JavaScript DOM Manipulation',
      'Event Listeners & Event Bubbling',
      'ES6+ Features (Arrow functions, Destructuring, Spread)',
      'Asynchronous JS, Promises & Async/Await',
      'Fetch API & Consuming REST Endpoints',
      'Tailwind CSS Essentials',
      'React Components, JSX & Props',
      'React State Hook (useState) & Events',
      'React Side Effects Hook (useEffect)',
      'React Mini Project Build'
    ]
  },
  {
    monthNumber: 4,
    title: 'Month 4: Backend Engineering & API Design',
    focus: 'Node.js, Express, REST APIs, Database Design, SQL, Authentication & JWT',
    projectAssigned: 'Inventory System & Blog Website',
    topics: [
      'Node.js Runtime & Event Loop',
      'Express.js Server Setup & Routing',
      'REST API Architectural Design Principles',
      'Middleware in Express',
      'Database Fundamentals & Relational Design',
      'SQL Queries (SELECT, INSERT, UPDATE, DELETE)',
      'SQL Joins & Foreign Keys',
      'MVC (Model-View-Controller) Architecture',
      'User Authentication & Password Hashing (bcrypt)',
      'JSON Web Tokens (JWT) & Protected Routes',
      'Input Validation & Sanitization',
      'Centralized Error Handling in Node.js',
      'Automated API Testing (Jest & Supertest)',
      'Database Migrations & ORMs',
      'Month 4 Capstone Integration'
    ]
  },
  {
    monthNumber: 5,
    title: 'Month 5: Advanced Full Stack & Production Engineering',
    focus: 'Full Stack Integration, Deployment, Security, Performance, CI/CD',
    projectAssigned: 'Chat Application & Hospital Management System',
    topics: [
      'Connecting React Frontend to Express Backend',
      'CORS, Environment Variables & Config Management',
      'Advanced State Management (Context API / Redux)',
      'Real-time WebSockets (Socket.io) Basics',
      'Web Security Essentials (XSS, CSRF, Rate Limiting)',
      'Caching & Performance Optimization',
      'Containerization Basics (Docker)',
      'CI/CD Pipelines (GitHub Actions)',
      'Cloud Deployment (Cloud Run, Render, Vercel)',
      'Monitoring, Logging & Error Tracking',
      'Database Query Optimization & Indexing',
      'Full Stack Refactoring & Code Quality',
      'End-to-End Testing (Cypress / Playwright)',
      'Production Deployment Walkthrough',
      'Month 5 Full Stack Review'
    ]
  },
  {
    monthNumber: 6,
    title: 'Month 6: Career, Portfolio & Internship Readiness',
    focus: 'Resume Optimization, Portfolio Showcase, System Design, Tech Interviews',
    projectAssigned: 'E-Commerce Website & Portfolio Showcase',
    topics: [
      'Crafting an ATS-Friendly Tech Resume',
      'Polishing Your GitHub & Profile Readme',
      'LinkedIn Networking for SWE Internships',
      'Building a High-Impact Portfolio Website',
      'System Design Basics (Scalability, Load Balancers, Caching)',
      'System Design: Designing a URL Shortener',
      'System Design: Designing a Chat Service',
      'LeetCode Top Interview Patterns (Two Pointers, Sliding Window)',
      'Data Structure Blitz: Trees & Graphs Practice',
      'Dynamic Programming & Greedy Algorithms Essentials',
      'Behavioral Interview Mastery (STAR Method)',
      'Answering "Tell Me About Yourself" & Technical Trade-offs',
      'Mock Technical Coding Interview 1',
      'Mock Behavioral & System Architecture Interview 2',
      'Final Internship Readiness Evaluation & Job Applications'
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'streak_7',
    title: '7 Day Study Streak',
    description: 'Study for 7 consecutive days without breaking momentum.',
    iconName: 'Flame',
    category: 'Streak',
    unlocked: false,
    progress: 14,
    targetLabel: '1 / 7 Days'
  },
  {
    id: 'streak_30',
    title: '30 Day Habit',
    description: 'Build a solid habit with a 30-day continuous study streak.',
    iconName: 'Zap',
    category: 'Streak',
    unlocked: false,
    progress: 3,
    targetLabel: '1 / 30 Days'
  },
  {
    id: 'first_project',
    title: 'First Project Completed',
    description: 'Finish all tasks for your first real-world software project.',
    iconName: 'FolderCheck',
    category: 'Projects',
    unlocked: false,
    progress: 0,
    targetLabel: '0 / 1 Project'
  },
  {
    id: 'challenges_10',
    title: '10 Challenges Solved',
    description: 'Successfully complete 10 daily coding challenges.',
    iconName: 'Code',
    category: 'Challenges',
    unlocked: false,
    progress: 0,
    targetLabel: '0 / 10 Challenges'
  },
  {
    id: 'problems_50',
    title: '50 Problems Mastered',
    description: 'Solve 50 practice exercises and challenges.',
    iconName: 'Trophy',
    category: 'Challenges',
    unlocked: false,
    progress: 0,
    targetLabel: '0 / 50 Solved'
  },
  {
    id: 'problems_100',
    title: '100 Problem Milestone',
    description: 'Solve 100 coding problems across the curriculum.',
    iconName: 'Award',
    category: 'Challenges',
    unlocked: false,
    progress: 0,
    targetLabel: '0 / 100 Solved'
  },
  {
    id: 'internship_ready',
    title: 'Internship Ready!',
    description: 'Complete Month 6 curriculum and achieve internship readiness.',
    iconName: 'GraduationCap',
    category: 'Milestone',
    unlocked: false,
    progress: 0,
    targetLabel: 'Day 1 / 180'
  }
];

// Helper to get month and main topic for a given day (1..180)
export function getTopicMetaForDay(day: number): { month: number; topicName: string; projectTitle: string } {
  const month = Math.min(6, Math.ceil(day / 30));
  const monthInfo = ROADMAP_MONTHS[month - 1];
  const topicIndex = Math.floor(((day - 1) % 30) / 2);
  const topicName = monthInfo.topics[Math.min(topicIndex, monthInfo.topics.length - 1)];
  const projectTitle = monthInfo.projectAssigned.split(' & ')[(day % 2 === 0) ? 1 : 0] || 'Calculator';
  return { month, topicName, projectTitle };
}

export function generateDefaultDayContent(day: number): DailyContent {
  const meta = getTopicMetaForDay(day);

  if (day === 1) {
    return {
      day: 1,
      month: 1,
      topicTitle: 'Variables & Data Types in JavaScript/TypeScript',
      lesson: {
        topic: 'Variables & Data Types',
        difficulty: 'Beginner',
        estimatedTime: '20 min',
        learningObjectives: [
          'Understand how computer memory holds data using variables.',
          'Differentiate between let, const, and var declarations.',
          'Identify primitive data types: string, number, boolean, null, undefined.',
          'Avoid common mutability bugs by preferring const by default.'
        ],
        simpleExplanation:
          'Think of a variable as a labeled storage box in your computer memory. You place a value (a text string, a number, or a boolean) inside the box so you can reuse or update it later in your code.',
        realWorldExample:
          'When you log into your online banking app, your account balance ($1,450.50) is stored in a numeric variable, your full name ("Jane Doe") is in a string variable, and your login status (true/false) is stored in a boolean variable.',
        visualAnalogy:
          'Imagine a row of cubbies at a school gym. Each cubbie has a name tag taped to the front (variable name). Inside the cubbie, you can place your coat (data value). Using "const" means locking the cubbie door after placing the item inside so nobody can swap it.',
        codeExamples: [
          {
            title: 'Declaring Variables with const and let',
            language: 'javascript',
            code: `// Preferred: const for values that shouldn't be reassigned\nconst userRole = "Software Engineering Intern";\nconst dailyStudyHours = 2;\n\n// Use let when the value will change over time\nlet currentStreak = 1;\ncurrentStreak = currentStreak + 1; // updated to 2\n\nconsole.log(userRole); // Output: Software Engineering Intern\nconsole.log(currentStreak); // Output: 2`,
            explanation:
              'Always default to const. Only use let when you know the variable value will be reassigned later.'
          },
          {
            title: 'Primitive Data Types Overview',
            language: 'javascript',
            code: `const studentName = "Alex";      // String\nconst age = 21;                 // Number\nconst isEnrolled = true;        // Boolean\nlet graduationYear = null;      // Null (intentionally empty)\nlet middleName;                 // Undefined (value not yet assigned)\n\nconsole.log(typeof studentName); // "string"\nconsole.log(typeof age);         // "number"`,
            explanation:
              'The typeof operator reveals the underlying type of any variable in JavaScript.'
          }
        ],
        commonMistakes: [
          'Using "var" in modern JavaScript (leads to unpredictable function-scoping bugs).',
          'Attempting to reassign a "const" variable (causes a TypeError: Assignment to constant variable).',
          'Confusing undefined (uninitialized) with null (explicitly cleared by developer).'
        ],
        bestPractices: [
          'Use camelCase for variable names (e.g., studentName, studyHours).',
          'Name variables meaningfully; avoid single letter names like x, y, z.',
          'Default to "const" for all variables unless reassignment is explicitly needed.'
        ],
        summary:
          'Variables are labeled containers in memory. In modern JS/TS, declare values with "const" by default, and use "let" when mutability is required. Master string, number, boolean, null, and undefined.'
      },
      practice: [
        {
          id: 'ex_1',
          title: 'Exercise 1: Correct Declarations',
          difficulty: 'Beginner',
          prompt: 'Declare a constant variable named `appName` set to "Engineering Mentor" and a mutable variable named `completedModules` set to 0. Increment `completedModules` by 1.',
          starterCode: `// Write your code below:\n`,
          solution: `const appName = "Engineering Mentor";\nlet completedModules = 0;\ncompletedModules += 1;\nconsole.log(appName, completedModules);`,
          hints: ['Use const for appName', 'Use let for completedModules', 'Use += 1 to increment'],
          testCases: [
            { input: '', expectedOutput: 'Engineering Mentor 1' }
          ]
        },
        {
          id: 'ex_2',
          title: 'Exercise 2: Type Checker',
          difficulty: 'Beginner',
          prompt: 'Create a function `getVariableType(val)` that returns the string representation of `val`\'s data type using `typeof`.',
          starterCode: `function getVariableType(val) {\n  // Return the type of val\n}\n\nconsole.log(getVariableType(42));`,
          solution: `function getVariableType(val) {\n  return typeof val;\n}\n\nconsole.log(getVariableType(42));`,
          hints: ['Use the typeof operator', 'return typeof val'],
          testCases: [
            { input: '42', expectedOutput: 'number' }
          ]
        },
        {
          id: 'ex_3',
          title: 'Exercise 3: String Interpolation',
          difficulty: 'Beginner',
          prompt: 'Given name = "Jordan" and hours = 2, produce the string "Jordan studied for 2 hours today" using template literals.',
          starterCode: `const name = "Jordan";\nconst hours = 2;\n// Construct message using template literals backticks (\`...\`)\nconst message = "";\nconsole.log(message);`,
          solution: `const name = "Jordan";\nconst hours = 2;\nconst message = \`\${name} studied for \${hours} hours today\`;\nconsole.log(message);`,
          hints: ['Use backtick keys ` `', 'Use ${variableName} inside backticks'],
          testCases: [
            { input: '', expectedOutput: 'Jordan studied for 2 hours today' }
          ]
        },
        {
          id: 'ex_4',
          title: 'Exercise 4: Temperature Converter Variable Logic',
          difficulty: 'Intermediate',
          prompt: 'Write code to convert celsius (25) to fahrenheit using formula `(celsius * 9/5) + 32`. Store result in constant `fahrenheit`.',
          starterCode: `const celsius = 25;\n// Calculate fahrenheit:\nconst fahrenheit = 0;\nconsole.log(fahrenheit);`,
          solution: `const celsius = 25;\nconst fahrenheit = (celsius * 9 / 5) + 32;\nconsole.log(fahrenheit);`,
          hints: ['Multiply celsius by 9/5, then add 32'],
          testCases: [
            { input: '25', expectedOutput: '77' }
          ]
        },
        {
          id: 'ex_5',
          title: 'Exercise 5: Null vs Undefined Safeguard',
          difficulty: 'Intermediate',
          prompt: 'Write a function `checkValueStatus(val)` that returns "Empty" if val is null or undefined, otherwise returns "Has Value".',
          starterCode: `function checkValueStatus(val) {\n  // Check if val is null or undefined\n}\n\nconsole.log(checkValueStatus(null));`,
          solution: `function checkValueStatus(val) {\n  if (val === null || val === undefined) {\n    return "Empty";\n  }\n  return "Has Value";\n}`,
          hints: ['Use strictly equal === null or === undefined', 'Or check val == null (double equals matches both)'],
          testCases: [
            { input: 'null', expectedOutput: 'Empty' }
          ]
        }
      ],
      challenge: {
        id: 'challenge_d1',
        title: 'Day 1 Challenge: User Profile Validator',
        difficulty: 'Beginner',
        problemStatement:
          'Write a function `validateUserProfile(username, age, isEmailVerified)` that returns "Valid Profile" if `username` is a non-empty string, `age` is a number greater than or equal to 18, and `isEmailVerified` is true. Otherwise return "Invalid Profile".',
        inputFormat: 'Three parameters: username (string), age (number), isEmailVerified (boolean)',
        outputFormat: 'String: "Valid Profile" or "Invalid Profile"',
        examples: [
          {
            input: 'validateUserProfile("alex_dev", 20, true)',
            output: '"Valid Profile"',
            explanation: 'Username is non-empty, age >= 18, email is verified.'
          },
          {
            input: 'validateUserProfile("", 25, true)',
            output: '"Invalid Profile"',
            explanation: 'Username is an empty string.'
          }
        ],
        constraints: [
          'username must be string with length > 0',
          'age must be integer >= 18',
          'isEmailVerified must be boolean true'
        ],
        hints: [
          'Check typeof username === "string" and username.length > 0',
          'Check age >= 18',
          'Combine all conditions using logical AND (&&)'
        ],
        starterCode: `function validateUserProfile(username, age, isEmailVerified) {\n  // Write your validation logic here\n  return "Invalid Profile";\n}\n\n// Test execution:\nconsole.log(validateUserProfile("alex_dev", 20, true));`,
        solution: `function validateUserProfile(username, age, isEmailVerified) {\n  if (\n    typeof username === "string" &&\n    username.trim().length > 0 &&\n    typeof age === "number" &&\n    age >= 18 &&\n    isEmailVerified === true\n  ) {\n    return "Valid Profile";\n  }\n  return "Invalid Profile";\n}`
      },
      projectTask: {
        id: 'project_d1',
        projectTitle: 'Calculator App',
        taskNumber: 1,
        totalTasksInProject: 5,
        title: 'Task 1: Core Calculation Functions & Variable State',
        description:
          'Today you begin building your first real software project: A Command Line / Web Calculator Engine! Your goal for Day 1 is to define four core mathematical functions (`add`, `subtract`, `multiply`, `divide`) and a variable `currentResult` that tracks calculation state.',
        requirements: [
          'Implement `add(a, b)`, `subtract(a, b)`, `multiply(a, b)`, and `divide(a, b)`.',
          'In `divide(a, b)`, check for division by zero and return string "Error: Division by zero".',
          'Maintain a global or closure variable `currentResult` initialized to 0.',
          'Create a function `clearResult()` that resets `currentResult` to 0.'
        ],
        starterCode: `// Project: Calculator Engine - Task 1\nlet currentResult = 0;\n\nfunction add(a, b) {\n  // Your code\n}\n\nfunction subtract(a, b) {\n  // Your code\n}\n\nfunction multiply(a, b) {\n  // Your code\n}\n\nfunction divide(a, b) {\n  // Your code\n}\n\nfunction clearResult() {\n  currentResult = 0;\n  return currentResult;\n}\n\n// Run basic tests:\nconsole.log("Add 5 + 3:", add(5, 3));\nconsole.log("Divide 10 by 0:", divide(10, 0));`,
        hints: [
          'Remember arithmetic operators +, -, *, /',
          'Check if b === 0 inside divide before performing division',
          'Assign result to currentResult and return it'
        ],
        solutionExplanation:
          'Creating simple pure functions to calculate results and guarding against zero division forms the reliable mathematical core of any calculator software.'
      },
      quiz: [
        {
          id: 'q1',
          type: 'multiple_choice',
          question: 'Which keyword should be used by default in modern JavaScript when a variable value will NOT be reassigned?',
          options: ['var', 'let', 'const', 'define'],
          correctAnswer: 'const',
          explanation: 'const signals to fellow developers and the JS compiler that this variable binding is immutable.'
        },
        {
          id: 'q2',
          type: 'true_false',
          question: 'In JavaScript, the expression `typeof null` evaluates to "object" due to an early language implementation quirk.',
          options: ['True', 'False'],
          correctAnswer: 'True',
          explanation: 'True! typeof null returning "object" is a well-known historical bug in JavaScript that was retained for backwards compatibility.'
        },
        {
          id: 'q3',
          type: 'fill_in_blank',
          question: 'To create template strings that allow variable interpolation in JS, enclose the text in _______ characters.',
          correctAnswer: 'backtick',
          explanation: 'Template literals use backticks (`...`) and allow ${expression} interpolation.'
        },
        {
          id: 'q4',
          type: 'multiple_choice',
          question: 'What is the output of `console.log(5 + "5")` in JavaScript?',
          options: ['10', '"55"', 'TypeError', 'NaN'],
          correctAnswer: '"55"',
          explanation: 'The + operator coerces the number 5 into a string "5", resulting in string concatenation "55".'
        },
        {
          id: 'q5',
          type: 'multiple_choice',
          question: 'What happens if you attempt to reassign a variable declared with `const`?',
          options: ['It silently ignores the change', 'It throws a TypeError', 'It automatically converts to a let variable', 'It crashes the operating system'],
          correctAnswer: 'It throws a TypeError',
          explanation: 'JavaScript throws a "TypeError: Assignment to constant variable" when reassigning a const.'
        }
      ]
    };
  }

  // Fallback dynamic content generator for Day 2 to 180
  return {
    day,
    month: meta.month,
    topicTitle: `Day ${day}: ${meta.topicName}`,
    lesson: {
      topic: meta.topicName,
      difficulty: day < 60 ? 'Beginner' : day < 120 ? 'Intermediate' : 'Advanced',
      estimatedTime: '20 min',
      learningObjectives: [
        `Understand core principles of ${meta.topicName}.`,
        `Apply ${meta.topicName} concepts in practical code examples.`,
        `Identify performance bottlenecks and common pitfalls in ${meta.topicName}.`,
        `Integrate ${meta.topicName} into your 6-month software engineering toolkit.`
      ],
      simpleExplanation: `Day ${day} focuses on ${meta.topicName}. As a software engineer, mastering ${meta.topicName} allows you to write cleaner, scalable, and maintainable software code that passes technical interview standards.`,
      realWorldExample: `Production applications like Netflix, Uber, and Google use ${meta.topicName} heavily to handle high scale, reliable execution, and structured software architecture.`,
      visualAnalogy: `Think of ${meta.topicName} like building blocks in engineering. Each block connects predictably to form a sturdy architecture.`,
      codeExamples: [
        {
          title: `Implementing ${meta.topicName}`,
          language: 'javascript',
          code: `// Day ${day}: ${meta.topicName} Demonstration\nfunction execute${meta.topicName.replace(/[^a-zA-Z]/g, '')}() {\n  console.log("Executing Day ${day} curriculum: ${meta.topicName}");\n  return true;\n}\n\nexecute${meta.topicName.replace(/[^a-zA-Z]/g, '')}();`,
          explanation: `Demonstration of ${meta.topicName} in action.`
        }
      ],
      commonMistakes: [
        `Not handling edge cases when applying ${meta.topicName}.`,
        `Over-complicating simple implementation patterns prematurely.`
      ],
      bestPractices: [
        `Keep code clean, modular, and well-tested.`,
        `Document edge cases and adhere to industry conventions.`
      ],
      summary: `Day ${day} gives you hands-on experience with ${meta.topicName}. Complete today's practice, coding challenge, project task, and quiz to unlock Day ${day + 1}!`
    },
    practice: [
      {
        id: `ex_d${day}_1`,
        title: `Exercise 1: Fundamentals of ${meta.topicName}`,
        difficulty: 'Beginner',
        prompt: `Write a function \`solutionDay${day}(val)\` that processes \`val\` according to ${meta.topicName} rules and returns \`true\`.`,
        starterCode: `function solutionDay${day}(val) {\n  // Write your code for ${meta.topicName}\n  return val !== null;\n}\n\nconsole.log(solutionDay${day}("test"));`,
        solution: `function solutionDay${day}(val) {\n  return Boolean(val);\n}`,
        hints: [`Check if val is truthy`, `Return Boolean(val)`],
        testCases: [{ input: '"test"', expectedOutput: 'true' }]
      },
      {
        id: `ex_d${day}_2`,
        title: `Exercise 2: Practical Application`,
        difficulty: 'Beginner',
        prompt: `Implement a helper function \`calculateMetric(items)\` that returns the count of items.`,
        starterCode: `function calculateMetric(items) {\n  return items.length;\n}`,
        solution: `function calculateMetric(items) {\n  return Array.isArray(items) ? items.length : 0;\n}`,
        hints: [`Check Array.isArray(items)`],
        testCases: [{ input: '[1, 2, 3]', expectedOutput: '3' }]
      },
      {
        id: `ex_d${day}_3`,
        title: `Exercise 3: Intermediate Logic`,
        difficulty: 'Intermediate',
        prompt: `Create a function that filters empty values from an array.`,
        starterCode: `function filterValid(arr) {\n  return arr.filter(Boolean);\n}`,
        solution: `function filterValid(arr) {\n  return arr.filter(Boolean);\n}`,
        hints: [`Use arr.filter(Boolean)`],
        testCases: [{ input: '[1, null, 2]', expectedOutput: '[1, 2]' }]
      }
    ],
    challenge: {
      id: `challenge_d${day}`,
      title: `Day ${day} Coding Challenge: ${meta.topicName} Solver`,
      difficulty: day < 60 ? 'Beginner' : day < 120 ? 'Intermediate' : 'Advanced',
      problemStatement: `Solve the Day ${day} challenge involving ${meta.topicName}. Given an input string or array, return the processed output matching the specification.`,
      inputFormat: 'String or Array parameter',
      outputFormat: 'Processed string or number',
      examples: [
        {
          input: `"sample_input"`,
          output: `"SAMPLE_INPUT"`,
          explanation: `Transforms input according to ${meta.topicName} specification.`
        }
      ],
      constraints: ['Input length <= 1000', 'Time complexity O(N) preferred'],
      hints: ['Break down the task into smaller sub-problems', 'Consider edge cases like empty input'],
      starterCode: `function solveDay${day}Challenge(input) {\n  // Write code for Day ${day} challenge\n  if (typeof input === "string") return input.toUpperCase();\n  return input;\n}\n\nconsole.log(solveDay${day}Challenge("hello"));`,
      solution: `function solveDay${day}Challenge(input) {\n  if (typeof input === "string") return input.toUpperCase();\n  return input;\n}`
    },
    projectTask: {
      id: `project_d${day}`,
      projectTitle: meta.projectTitle,
      taskNumber: ((day - 1) % 5) + 1,
      totalTasksInProject: 5,
      title: `Task ${((day - 1) % 5) + 1}: ${meta.projectTitle} Module for ${meta.topicName}`,
      description: `Implement today's sub-feature for the ${meta.projectTitle} project applying your knowledge of ${meta.topicName}.`,
      requirements: [
        `Write code to integrate ${meta.topicName} into ${meta.projectTitle}.`,
        `Ensure clear input handling and error management.`,
        `Test the module output with console.log statements.`
      ],
      starterCode: `// Project: ${meta.projectTitle} - Task ${((day - 1) % 5) + 1}\nfunction runProjectModule() {\n  console.log("Running ${meta.projectTitle} module...");\n  return "OK";\n}\n\nrunProjectModule();`,
      hints: ['Focus on clean modular code', 'Handle missing or invalid arguments'],
      solutionExplanation: `Integrating ${meta.topicName} into ${meta.projectTitle} creates a functional software component ready for production.`
    },
    quiz: [
      {
        id: `q_d${day}_1`,
        type: 'multiple_choice',
        question: `What is the primary objective when applying ${meta.topicName}?`,
        options: [
          'Writing scalable, predictable code',
          'Ignoring edge cases',
          'Writing unformatted code',
          'Using magic numbers'
        ],
        correctAnswer: 'Writing scalable, predictable code',
        explanation: 'In software engineering, predictability, clean design, and edge-case handling are essential.'
      },
      {
        id: `q_d${day}_2`,
        type: 'true_false',
        question: `Testing your code against edge cases is a core responsibility of a software engineer.`,
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Writing unit tests and checking edge cases prevents production outages and bugs.'
      },
      {
        id: `q_d${day}_3`,
        type: 'multiple_choice',
        question: `How should code complexity be managed during Day ${day}?`,
        options: [
          'Break large problems into small, single-responsibility functions',
          'Put all code into one giant function',
          'Avoid using function parameters',
          'Disable code linting'
        ],
        correctAnswer: 'Break large problems into small, single-responsibility functions',
        explanation: 'The Single Responsibility Principle ensures maintainable code.'
      },
      {
        id: `q_d${day}_4`,
        type: 'fill_in_blank',
        question: 'The software design principle DRY stands for Don\'t Repeat ________.',
        correctAnswer: 'Yourself',
        explanation: 'DRY stands for Don\'t Repeat Yourself.'
      },
      {
        id: `q_d${day}_5`,
        type: 'multiple_choice',
        question: `When preparing for SWE internships, what matters most alongside passing test cases?`,
        options: [
          'Clean code, time complexity efficiency, and explaining your thought process',
          'Writing as fast as possible without commenting',
          'Copy-pasting solutions without understanding',
          'Ignoring error messages'
        ],
        correctAnswer: 'Clean code, time complexity efficiency, and explaining your thought process',
        explanation: 'Technical interviewers evaluate communication, code organization, and algorithmic efficiency.'
      }
    ]
  };
}
