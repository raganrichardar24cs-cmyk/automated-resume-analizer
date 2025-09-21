
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

// Use a singleton pattern to lazy-initialize the client.
// This prevents the app from crashing on load if the API key is not immediately available.
let ai: GoogleGenAI | undefined;
function getAiClient() {
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    relevanceScore: {
      type: Type.INTEGER,
      description: "A score from 0-100 indicating how well the resume matches the job description."
    },
    verdict: {
      type: Type.STRING,
      description: "A verdict of 'High', 'Medium', or 'Low' suitability."
    },
    candidateName: {
      type: Type.STRING,
      description: "The full name of the candidate extracted from the resume."
    },
    jobTitle: {
      type: Type.STRING,
      description: "The job title extracted from the job description."
    },
    missingSkills: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of key skills from the job description missing in the resume."
    },
    missingCertifications: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of certifications from the job description missing in the resume."
    },
    missingProjects: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of relevant project experiences mentioned in the job description but not found in the resume."
    },
    feedback: {
      type: Type.STRING,
      description: "Constructive feedback for the candidate to improve their resume for this role."
    }
  },
  required: ['relevanceScore', 'verdict', 'candidateName', 'jobTitle', 'missingSkills', 'missingCertifications', 'missingProjects', 'feedback']
};


export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  try {
    const client = getAiClient();
    const prompt = `
      You are an expert AI-powered recruitment assistant. Your task is to analyze a candidate's resume against a provided job description and return a detailed evaluation in a structured JSON format.

      Here is the job description:
      ---
      ${jobDescription}
      ---

      Here is the candidate's resume:
      ---
      ${resumeText}
      ---

      Please perform the following analysis:
      1.  **Extract Candidate Name:** Identify and extract the full name of the candidate from the resume.
      2.  **Extract Job Title:** Identify and extract the job title from the job description.
      3.  **Calculate Relevance Score:** On a scale of 0 to 100, score how well the resume matches the job description. Consider skills, experience, education, and overall semantic relevance.
      4.  **Determine Verdict:** Based on the score, provide a suitability verdict: 'High' (score > 75), 'Medium' (score 45-75), or 'Low' (score < 45).
      5.  **Identify Gaps:** List key skills, certifications, and project types mentioned in the job description that are missing from the resume. If none are missing in a category, return an empty array.
      6.  **Provide Feedback:** Write a short, constructive paragraph with personalized suggestions for the candidate to improve their resume for this specific role.

      Return ONLY the JSON object that adheres to the provided schema. Do not include any other text, explanations, or markdown formatting.
    `;

    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        },
    });

    const jsonString = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonString);

    return result;

  } catch (error) {
    console.error("Error analyzing resume with Gemini API:", error);
    throw new Error("Failed to analyze resume. The content may be blocked or the API may be unavailable.");
  }
};
