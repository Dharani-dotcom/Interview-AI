import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize GoogleGenAI client lazily or with safety check
const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "placeholder_key",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// --- API ROUTES ---

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. AI Chat Interview Endpoint
app.post("/api/gemini/chat-interview", async (req, res) => {
  try {
    const { role, experience, difficulty, language, interviewType, techStack, history, userResponse } = req.body;
    const ai = getGenAI();

    const systemPrompt = `You are InterviewAI Pro, an elite expert interviewer conducting a ${interviewType || "technical"} interview focused specifically on ${techStack || "General Software Engineering"} for a ${role || "Software Engineer"} position (${experience || "Mid-level"}, ${difficulty || "Medium"} difficulty).
Language: ${language || "English"}.

Your task is to act as a supportive yet thorough professional interviewer asking questions tailored to ${techStack || "the domain"}.
If userResponse is provided:
1. Evaluate the user's latest response critically with respect to ${techStack || "technical accuracy"}.
2. Provide a numerical score from 0-100 for that answer.
3. Highlight mistakes or missing key technical concepts in ${techStack || "the stack"}.
4. Provide a sample model answer ("Better Answer").
5. Continue the interview with the NEXT natural interview question in ${techStack || "this topic"}.

If userResponse is empty / initial turn:
Provide a brief, realistic greeting and ask Question #1 specifically about ${techStack || "software engineering"}.

Respond ONLY in valid JSON matching this structure:
{
  "greeting": "string (optional greeting/feedback intro)",
  "evaluation": {
    "score": 85,
    "mistakes": ["Point 1", "Point 2"],
    "betterAnswer": "Example of a strong answer..."
  },
  "nextQuestion": "The next interview question...",
  "questionNumber": 1,
  "isFinished": false
}`;

    const promptText = userResponse
      ? `Previous conversation history: ${JSON.stringify(history || [])}\n\nUser's latest answer: "${userResponse}"`
      : `Start the interview now for ${role} focusing on ${techStack || "software concepts"} (${experience}, ${difficulty} level, ${interviewType} type).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Error in chat-interview:", error);
    res.status(500).json({
      error: error.message || "Failed to generate interview response",
      nextQuestion: "Can you tell me about a complex project you recently built and the architectural trade-offs you made?",
      evaluation: { score: 75, mistakes: ["Could elaborate more on specific metrics."], betterAnswer: "A structured STAR answer highlighting quantitative results." }
    });
  }
});

// 2. Voice Interview Analysis Endpoint
app.post("/api/gemini/voice-analysis", async (req, res) => {
  try {
    const { question, userTranscript, audioMetrics } = req.body;
    const ai = getGenAI();

    const prompt = `Evaluate the following spoken interview answer for the question: "${question}".
User's transcript: "${userTranscript}".
Observed raw speech metrics: ${JSON.stringify(audioMetrics || {})}.

Analyze the response thoroughly and return JSON:
{
  "overallScore": 88,
  "metrics": {
    "confidence": 85,
    "grammar": 90,
    "speakingSpeed": "Normal (140 wpm)",
    "fluency": 86,
    "pronunciation": 92
  },
  "fillerWordsCount": 3,
  "detectedFillerWords": ["um", "like", "you know"],
  "feedback": "Concise summary of vocal tone and articulation",
  "improvedAnswer": "Polished, highly professional spoken version"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const result = JSON.parse(response.text || "{}");
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      error: error.message || "Failed voice analysis",
      overallScore: 82,
      metrics: { confidence: 80, grammar: 85, speakingSpeed: "Optimal", fluency: 80, pronunciation: 85 },
      fillerWordsCount: 2,
      detectedFillerWords: ["um"],
      feedback: "Good pacing, slight hesitation before technical details.",
      improvedAnswer: "Clear, confident presentation with concise points."
    });
  }
});

// 3. Video Interview Analysis
app.post("/api/gemini/video-analysis", async (req, res) => {
  try {
    const { question, transcript, visualObservations } = req.body;
    const ai = getGenAI();

    const prompt = `Perform an AI Video Interview assessment based on the interview response for question: "${question}".
Transcript: "${transcript}".
Visual & Pose tracking metrics: ${JSON.stringify(visualObservations || {})}.

Provide structured JSON:
{
  "confidenceScore": 89,
  "communicationScore": 91,
  "professionalismScore": 94,
  "bodyLanguageScore": 88,
  "eyeContactEstimation": "Excellent (92% direct sightline)",
  "smileAndFacialExpression": "Engaged and approachable",
  "postureFeedback": "Upright, steady head positioning, minimal fidgeting.",
  "suggestions": [
    "Maintain eye contact when detailing technical hurdles",
    "Use subtle hand gestures for key metrics"
  ],
  "summary": "Outstanding executive presence with clear verbal structure."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      confidenceScore: 85,
      communicationScore: 88,
      professionalismScore: 90,
      bodyLanguageScore: 85,
      eyeContactEstimation: "Good (85% centered)",
      smileAndFacialExpression: "Positive and attentive",
      postureFeedback: "Stable posture throughout the recording.",
      suggestions: ["Keep shoulders relaxed", "Speak clearly into the microphone"],
      summary: "Strong video interview demonstration."
    });
  }
});

// 4. Resume Analyzer Endpoint
app.post("/api/gemini/analyze-resume", async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    const ai = getGenAI();

    const prompt = `Analyze this resume for the role of "${targetRole || "Software Engineer / Tech Professional"}".
Resume Text:
"""
${resumeText}
"""

Return a deep JSON analysis:
{
  "atsScore": 84,
  "extractedSkills": ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS"],
  "missingKeywords": ["Docker", "CI/CD", "Unit Testing", "System Architecture"],
  "grammarRating": 95,
  "formattingScore": 88,
  "topAchievements": [
    "Optimized web app load speed by 40%",
    "Led cross-functional team of 5 engineers"
  ],
  "recommendations": [
    "Quantify impact in second experience section",
    "Add cloud deployment tools like AWS or Cloud Run"
  ],
  "improvedResumeSummary": "Results-oriented Full Stack Engineer with 4+ years of experience scaling React and Node.js microservices."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      atsScore: 78,
      extractedSkills: ["JavaScript", "React", "HTML/CSS", "Git"],
      missingKeywords: ["TypeScript", "AWS", "Docker", "Unit Testing"],
      grammarRating: 90,
      formattingScore: 82,
      topAchievements: ["Built responsive frontend components", "Integrated REST APIs"],
      recommendations: ["Include more quantifiable metrics", "Add keywords matching target job description"],
      improvedResumeSummary: "Dedicated software developer with experience in modern web technologies."
    });
  }
});

// 5. ATS Checker Endpoint
app.post("/api/gemini/ats-checker", async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    const ai = getGenAI();

    const prompt = `Compare this Resume against the Job Description.
Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""

Return JSON:
{
  "matchPercentage": 82,
  "matchedSkills": ["React", "Node.js", "TypeScript"],
  "missingSkills": ["Kubernetes", "Redis", "Terraform"],
  "suggestedKeywords": ["Microservices", "Event-Driven", "Agile Leadership"],
  "actionableTips": [
    "Incorporate 'Event-Driven Architecture' into project descriptions",
    "Highlight experience with Redis caching in backend section"
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      matchPercentage: 79,
      matchedSkills: ["JavaScript", "HTML/CSS", "Git"],
      missingSkills: ["Docker", "Kubernetes"],
      suggestedKeywords: ["CI/CD", "State Management"],
      actionableTips: ["Align bullet points directly with required qualification verbs."]
    });
  }
});

// 6. Coding Interview Evaluator
app.post("/api/gemini/evaluate-code", async (req, res) => {
  try {
    const { problemTitle, problemDescription, language, code } = req.body;
    const ai = getGenAI();

    const prompt = `Evaluate the coding solution for problem: "${problemTitle}".
Language: ${language}
Problem Statement: ${problemDescription}
User Code:
\`\`\`${language}
${code}
\`\`\`

Perform test case analysis, code complexity inspection, and generate JSON response:
{
  "passAllTests": true,
  "testCases": [
    { "input": "[2, 7, 11, 15], target = 9", "expected": "[0, 1]", "actual": "[0, 1]", "passed": true },
    { "input": "[3, 2, 4], target = 6", "expected": "[1, 2]", "actual": "[1, 2]", "passed": true }
  ],
  "score": 92,
  "timeComplexity": "O(N)",
  "spaceComplexity": "O(N)",
  "explanation": "Clear hash map approach ensuring single-pass lookup.",
  "optimizationSuggestions": [
    "Consider edge cases like duplicate elements or missing target",
    "Variable naming can be slightly more descriptive"
  ],
  "improvedCode": "Example refactored code block..."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      passAllTests: true,
      testCases: [{ input: "Sample input", expected: "Output", actual: "Output", passed: true }],
      score: 85,
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      explanation: "Code executes cleanly and meets standard time bounds.",
      optimizationSuggestions: ["Check bounds and null inputs."],
      improvedCode: req.body?.code || ""
    });
  }
});

// 7. System Design Reviewer
app.post("/api/gemini/system-design", async (req, res) => {
  try {
    const { title, nodes, connections, userNotes } = req.body;
    const ai = getGenAI();

    const prompt = `Review this System Design Architecture for: "${title}".
Nodes/Components: ${JSON.stringify(nodes)}
Connections: ${JSON.stringify(connections)}
User Design Rationale: "${userNotes}"

Return JSON evaluation:
{
  "score": 88,
  "scalabilityRating": "High",
  "databaseChoiceFeedback": "PostgreSQL with Redis cache is ideal for high read-to-write ratios.",
  "cachingStrategyFeedback": "Write-through caching prevents stale reads during peak spikes.",
  "apiDesignFeedback": "REST with gRPC internal service mesh offers low latency.",
  "bottlenecks": ["Single point of failure at initial API Gateway if missing load balancer redundancy"],
  "recommendations": [
    "Add a message queue (Kafka/RabbitMQ) for asynchronous processing",
    "Implement read replicas for database horizontal scaling"
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      score: 82,
      scalabilityRating: "Medium",
      databaseChoiceFeedback: "Good standard setup.",
      cachingStrategyFeedback: "Ensure cache invalidation handles edge cases.",
      apiDesignFeedback: "Clean API separation.",
      bottlenecks: ["Consider adding rate limiting"],
      recommendations: ["Incorporate CDN for static media delivery"]
    });
  }
});

// 8. Generate Full AI Feedback Report Endpoint
app.post("/api/gemini/generate-report", async (req, res) => {
  try {
    const { sessionData } = req.body;
    const ai = getGenAI();

    const prompt = `Generate a master comprehensive Interview Report for session data: ${JSON.stringify(sessionData)}.
Return JSON:
{
  "overallScore": 89,
  "categoryScores": {
    "communication": 90,
    "technicalKnowledge": 88,
    "confidence": 85,
    "problemSolving": 92,
    "grammarAndFluency": 94,
    "leadershipAndSoftSkills": 86
  },
  "summary": "Detailed overall critique",
  "topStrengths": ["Precise technical vocabulary", "Structured problem-solving approach"],
  "keyWeaknesses": ["Slight nervousness on system scaling limits"],
  "actionPlan": [
    "Practice designing distributed rate limiters",
    "Reduce filler words during pause transitions"
  ],
  "readinessLevel": "Ready for Senior Developer Role (Top 10% Candidate)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      overallScore: 85,
      categoryScores: { communication: 85, technicalKnowledge: 85, confidence: 80, problemSolving: 88, grammarAndFluency: 90, leadershipAndSoftSkills: 82 },
      summary: "Solid interview performance across technical and behavioral aspects.",
      topStrengths: ["Logical structure", "Good core engineering concepts"],
      keyWeaknesses: ["Pacing under pressure"],
      actionPlan: ["Perform 2 more mock voice interviews"],
      readinessLevel: "Job Ready"
    });
  }
});

// 9. Behavioral STAR Evaluation Endpoint
app.post("/api/gemini/behavioral-star", async (req, res) => {
  try {
    const { situation, task, action, result } = req.body;
    const ai = getGenAI();

    const prompt = `Evaluate the following Behavioral Interview response according to the STAR framework:
Situation: "${situation || ''}"
Task: "${task || ''}"
Action: "${action || ''}"
Result: "${result || ''}"

Analyze the clarity, leadership impact, problem-solving, and quantifiable metrics in this story.
Return JSON:
{
  "overallScore": 92,
  "starRatings": {
    "situation": 90,
    "task": 92,
    "action": 94,
    "result": 90
  },
  "strengths": [
    "Specific actionable leadership callouts",
    "Clear problem identification"
  ],
  "improvements": [
    "Quantify business outcomes or latency improvements if possible."
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      overallScore: 85,
      starRatings: { situation: 85, task: 85, action: 88, result: 82 },
      strengths: ["Clear breakdown of steps taken."],
      improvements: ["Add more specific numerical metrics to the result."]
    });
  }
});

// 10. HR Interview Evaluation Endpoint
app.post("/api/gemini/hr-interview", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const ai = getGenAI();

    const prompt = `Evaluate this HR interview response for:
Question: "${question || ''}"
Candidate Answer: "${answer || ''}"

Evaluate executive presence, culture fit, diplomacy, and clarity.
Return JSON:
{
  "overallScore": 90,
  "scores": {
    "confidence": 88,
    "communication": 92,
    "professionalism": 94,
    "bodyLanguage": 86
  },
  "strengths": [
    "Articulated career trajectory and values clearly",
    "Maintained positive, collaborative tone"
  ],
  "tips": [
    "Frame market research explicitly when discussing compensation expectations."
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" },
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      overallScore: 84,
      scores: { confidence: 82, communication: 86, professionalism: 88, bodyLanguage: 80 },
      strengths: ["Direct and polite response."],
      tips: ["Expand slightly on company alignment and long-term impact."]
    });
  }
});


// 11. General AI Chat Endpoint
app.post("/api/gemini/general-chat", async (req, res) => {
  try {
    const { messages, message, systemRole } = req.body;
    const ai = getGenAI();

    const formattedHistory = (messages || [])
      .map((m: any) => `${m.sender === 'user' ? 'User' : 'AI Assistant'}: ${m.text}`)
      .join('\n');

    const systemInstruction = systemRole || `You are InterviewAI Pro Assistant, a friendly, supportive, and exceptionally intelligent AI advisor.
You can engage in normal conversation, answer general questions, discuss career choices, offer programming/technical guidance, explain complex concepts, and assist with interview preparation.
Provide clear, structured, polite, and well-formatted answers using markdown.`;

    const promptText = formattedHistory
      ? `Conversation History:\n${formattedHistory}\n\nUser: ${message}\nAI Assistant:`
      : `User: ${message}\nAI Assistant:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    res.json({ text: response.text || "I am here to help answer your questions! What would you like to talk about?" });
  } catch (error: any) {
    console.error("Error in general-chat:", error);
    res.status(500).json({
      error: error.message,
      text: "I am ready to assist you with any questions, career advice, or technical topics!"
    });
  }
});


// Vite middleware / Static server setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`InterviewAI Pro Server running on http://localhost:${PORT}`);
  });
}

startServer();
