import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { generateDefaultDayContent, getTopicMetaForDay } from './src/data/roadmapData.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(apiKey) });
});

// Dynamic Day Generation endpoint
app.post('/api/generate-day', async (req, res) => {
  const { day } = req.body;
  const targetDay = typeof day === 'number' && day >= 1 && day <= 180 ? day : 1;
  const meta = getTopicMetaForDay(targetDay);

  if (!ai) {
    // Fallback to static/generated default curriculum if API key is not available
    console.log(`Using built-in curriculum for Day ${targetDay}`);
    return res.json({
      success: true,
      data: generateDefaultDayContent(targetDay),
      source: 'built-in'
    });
  }

  try {
    const prompt = `You are a Senior Software Engineer with 15+ years of experience and a university computer science professor.
Your task is to generate Day ${targetDay} (Month ${meta.month}) of a 6-month internship-readiness curriculum for a complete beginner studying 2 hours per day.

Topic: ${meta.topicName}
Project assigned: ${meta.projectTitle}

Return a valid JSON object matching this structure:
{
  "day": ${targetDay},
  "month": ${meta.month},
  "topicTitle": "Day ${targetDay}: ${meta.topicName}",
  "lesson": {
    "topic": "${meta.topicName}",
    "difficulty": "Beginner",
    "estimatedTime": "20 min",
    "learningObjectives": ["4 clear learning objectives"],
    "simpleExplanation": "Simple, beginner-friendly explanation avoiding jargon",
    "realWorldExample": "How top tech companies use this in real production software",
    "visualAnalogy": "A memorable real-life visual analogy",
    "codeExamples": [
      {
        "title": "Clear example title",
        "language": "javascript",
        "code": "executable javascript code sample",
        "explanation": "Explanation of code lines"
      }
    ],
    "commonMistakes": ["3 common mistakes beginners make"],
    "bestPractices": ["3 industry best practices"],
    "summary": "Concise 2-sentence key takeaway"
  },
  "practice": [
    {
      "id": "ex1",
      "title": "Exercise 1: Beginner",
      "difficulty": "Beginner",
      "prompt": "Exercise description",
      "starterCode": "// Starter code",
      "solution": "// Complete solution code",
      "hints": ["Hint 1", "Hint 2"],
      "testCases": [{"input": "sample input", "expectedOutput": "expected output"}]
    },
    {
      "id": "ex2",
      "title": "Exercise 2: Beginner",
      "difficulty": "Beginner",
      "prompt": "Exercise description",
      "starterCode": "// Starter code",
      "solution": "// Complete solution code",
      "hints": ["Hint 1"],
      "testCases": [{"input": "sample input", "expectedOutput": "expected output"}]
    },
    {
      "id": "ex3",
      "title": "Exercise 3: Beginner",
      "difficulty": "Beginner",
      "prompt": "Exercise description",
      "starterCode": "// Starter code",
      "solution": "// Complete solution code",
      "hints": ["Hint 1"],
      "testCases": [{"input": "sample input", "expectedOutput": "expected output"}]
    },
    {
      "id": "ex4",
      "title": "Exercise 4: Intermediate",
      "difficulty": "Intermediate",
      "prompt": "Intermediate exercise description",
      "starterCode": "// Starter code",
      "solution": "// Complete solution code",
      "hints": ["Hint 1"],
      "testCases": [{"input": "sample input", "expectedOutput": "expected output"}]
    },
    {
      "id": "ex5",
      "title": "Exercise 5: Intermediate",
      "difficulty": "Intermediate",
      "prompt": "Intermediate exercise description",
      "starterCode": "// Starter code",
      "solution": "// Complete solution code",
      "hints": ["Hint 1"],
      "testCases": [{"input": "sample input", "expectedOutput": "expected output"}]
    }
  ],
  "challenge": {
    "id": "challenge_${targetDay}",
    "title": "Day ${targetDay} Coding Challenge: ${meta.topicName}",
    "difficulty": "Beginner",
    "problemStatement": "Clear problem statement for today's 20-min LeetCode style problem",
    "inputFormat": "Description of input parameters",
    "outputFormat": "Description of expected return value",
    "examples": [
      {
        "input": "Example input",
        "output": "Example output",
        "explanation": "Why this output is produced"
      }
    ],
    "constraints": ["Constraint 1", "Constraint 2"],
    "hints": ["Hint 1", "Hint 2"],
    "starterCode": "// Starter function definition",
    "solution": "// Complete solution function"
  },
  "projectTask": {
    "id": "proj_${targetDay}",
    "projectTitle": "${meta.projectTitle}",
    "taskNumber": ${((targetDay - 1) % 5) + 1},
    "totalTasksInProject": 5,
    "title": "Task ${((targetDay - 1) % 5) + 1}: ${meta.topicName} Module",
    "description": "Specific task for today's project module",
    "requirements": ["Requirement 1", "Requirement 2", "Requirement 3"],
    "starterCode": "// Starter project template code",
    "hints": ["Project hint 1", "Project hint 2"],
    "solutionExplanation": "Why this architecture is clean and maintainable"
  },
  "quiz": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Multiple choice question 1",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option A",
      "explanation": "Detailed explanation"
    },
    {
      "id": "q2",
      "type": "true_false",
      "question": "True/false question 2",
      "options": ["True", "False"],
      "correctAnswer": "True",
      "explanation": "Detailed explanation"
    },
    {
      "id": "q3",
      "type": "fill_in_blank",
      "question": "Fill in the blank question 3",
      "correctAnswer": "expected_word",
      "explanation": "Detailed explanation"
    },
    {
      "id": "q4",
      "type": "multiple_choice",
      "question": "Multiple choice question 4",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option B",
      "explanation": "Detailed explanation"
    },
    {
      "id": "q5",
      "type": "multiple_choice",
      "question": "Multiple choice question 5",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Option C",
      "explanation": "Detailed explanation"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const responseText = response.text || '';
    const parsedData = JSON.parse(responseText);

    return res.json({
      success: true,
      data: parsedData,
      source: 'gemini-ai'
    });
  } catch (err: any) {
    console.error('Error generating day with Gemini:', err?.message || err);
    // Graceful fallback to built-in curriculum
    return res.json({
      success: true,
      data: generateDefaultDayContent(targetDay),
      source: 'fallback-built-in'
    });
  }
});

// AI Senior Code Review endpoint
app.post('/api/code-review', async (req, res) => {
  const { code, taskTitle, problemStatement, language = 'javascript' } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: 'Code is required for review' });
  }

  if (!ai) {
    // Mock mentor review if key is missing
    return res.json({
      score: 8,
      strengths: [
        'Code is clean and properly formatted.',
        'Logic correctly addresses the main requirements.',
        'Variable naming is clear and descriptive.'
      ],
      areasForImprovement: [
        'Add guard clauses for unexpected null/undefined inputs.',
        'Consider time complexity for large datasets.'
      ],
      bugsOrEdgeCases: [
        'Check edge cases with empty strings or 0 inputs.'
      ],
      suggestedRefactoring: code.includes('function') ? code : `// Refactored clean code:\n${code}`,
      mentorFeedback: "Great effort! Your implementation shows good understanding of fundamentals. Keep practicing edge case handling to reach senior engineer standards!"
    });
  }

  try {
    const prompt = `You are a Staff Software Engineer at Google conducting a code review for an intern student.
Task Title: ${taskTitle || 'Coding Challenge'}
Problem Statement: ${problemStatement || 'Not provided'}
Language: ${language}

Student's Submitted Code:
\`\`\`${language}
${code}
\`\`\`

Review the code thoroughly. Return a JSON object with this EXACT structure:
{
  "score": number between 1 and 10,
  "strengths": ["array of 2-3 specific strengths in the code"],
  "areasForImprovement": ["array of 2-3 concrete areas to improve"],
  "bugsOrEdgeCases": ["array of edge cases or potential bugs"],
  "suggestedRefactoring": "cleaner, refactored version of their code with comments",
  "mentorFeedback": "Encouraging, constructive 3-sentence summary from a senior mentor"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const reviewData = JSON.parse(response.text || '{}');
    return res.json(reviewData);
  } catch (err: any) {
    console.error('Code review error:', err);
    return res.status(500).json({ error: 'Failed to complete AI code review' });
  }
});

// AI Ask Mentor endpoint
app.post('/api/ask-mentor', async (req, res) => {
  const { query, topicContext, currentCode } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!ai) {
    return res.json({
      answer: `As your Senior SE mentor: regarding "${query}", remember to focus on core principles of ${topicContext || 'software engineering'}. Break the problem into small, testable pieces and verify each step in the terminal or console!`
    });
  }

  try {
    const prompt = `You are a Senior Software Engineer (15+ YOE) and CS professor mentoring a beginner software engineering intern.
Current Topic: ${topicContext || 'General SWE'}
Current Code Context: ${currentCode ? `\`\`\`javascript\n${currentCode}\n\`\`\`` : 'None'}

Student's Question: "${query}"

Guidelines:
- Explain in simple English using a real-world analogy.
- Be supportive, friendly, and structured.
- Never give away full exam/interview answers directly without giving a helpful hint first.
- Keep the response under 250 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });

    return res.json({ answer: response.text });
  } catch (err: any) {
    console.error('Ask mentor error:', err);
    return res.status(500).json({ error: 'Failed to contact AI mentor' });
  }
});

// Vite middleware integration for Express
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Software Engineering Mentor Server running on http://localhost:${PORT}`);
  });
}

startServer();
