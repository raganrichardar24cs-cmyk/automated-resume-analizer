
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { analyzeResume } from '../services/geminiService';
import Loader from './Loader';

interface ResumeAnalyzerProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  isLoading: boolean;
}

const ResumeAnalyzer: React.FC<ResumeAnalyzerProps> = ({ onAnalysisComplete, setIsLoading, setError, isLoading }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !resumeText.trim()) {
      setError("Please provide both a job description and a resume.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeResume(resumeText, jobDescription);
      onAnalysisComplete(result);
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleData = () => {
    setJobDescription(`Job Title: Senior Frontend Developer

Location: Bangalore

We are looking for an experienced Senior Frontend Developer to join our dynamic team. The ideal candidate will have a passion for creating beautiful and performant user interfaces.

Responsibilities:
- Develop new user-facing features using React.js
- Build reusable components and front-end libraries for future use
- Translate designs and wireframes into high-quality code
- Optimize components for maximum performance across a vast array of web-capable devices and browsers

Must-Have Skills:
- 5+ years of experience with JavaScript, CSS, and HTML
- Proficient in React.js and its core principles
- Experience with popular React.js workflows (such as Flux or Redux)
- Familiarity with modern front-end build pipelines and tools (e.g., Webpack, Babel, NPM)
- Experience with RESTful APIs

Good-to-Have Skills:
- Experience with TypeScript
- Knowledge of modern authorization mechanisms, such as JSON Web Token
- Experience with data visualization libraries (e.g., D3.js, Chart.js)
- Familiarity with code versioning tools such as Git

Qualifications:
- Bachelor's degree in Computer Science or a related field.
- A knack for benchmarking and optimization.
- Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model.
`);
    setResumeText(`Priya Sharma
Bengaluru, India | priya.sharma@email.com | (555) 123-4567

Summary
A results-oriented Frontend Developer with 6 years of experience in building and maintaining responsive web applications. Proficient in React, JavaScript, and modern frontend technologies, with a strong focus on user experience and performance.

Experience
Lead Frontend Developer, Tech Solutions Inc. - Bengaluru
June 2020 - Present
- Led the development of a new customer-facing dashboard using React.js and Redux, resulting in a 20% increase in user engagement.
- Mentored a team of 3 junior developers, providing code reviews and technical guidance.
- Collaborated with UX/UI designers to translate mockups into interactive and responsive features.
- Implemented RESTful APIs for data integration.

Frontend Developer, Web Innovators - Bengaluru
July 2018 - May 2020
- Developed and maintained components for a large-scale e-commerce platform using React.
- Improved website performance by 15% through code optimization and lazy loading techniques.
- Worked in an Agile environment, participating in daily stand-ups and sprint planning.

Skills
- Languages: JavaScript (ES6+), HTML5, CSS3
- Frameworks/Libraries: React.js, Redux, Webpack
- Tools: Git, Babel, NPM, JIRA
- Other: RESTful APIs, Responsive Design, Agile Methodologies

Education
Bachelor of Technology in Computer Science
Indian Institute of Technology, Delhi - 2018
`);
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="job-description" className="block text-sm font-medium text-cyan-400 mb-2">Job Description</label>
          <textarea
            id="job-description"
            rows={15}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Paste the job description here..."
          />
        </div>
        <div>
          <label htmlFor="resume" className="block text-sm font-medium text-cyan-400 mb-2">Resume</label>
          <textarea
            id="resume"
            rows={15}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="Paste the candidate's resume text here..."
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-transform transform hover:scale-105"
        >
          {isLoading ? <><Loader /> Analyzing...</> : 'Analyze Resume'}
        </button>
         <button
          onClick={handleSampleData}
          disabled={isLoading}
          className="w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Load Sample Data
        </button>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
