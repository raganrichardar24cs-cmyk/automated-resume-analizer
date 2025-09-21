import React from 'react';
import { AnalysisResult } from '../types';
import ScoreDonutChart from './ScoreDonutChart';
import { BriefcaseIcon } from './icons/BriefcaseIcon';
import { DocumentIcon } from './icons/DocumentIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';


interface ResultsDisplayProps {
  result: AnalysisResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const getVerdictChipClass = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case 'high':
        return 'bg-green-500/20 text-green-300 border border-green-500';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border border-yellow-500';
      case 'low':
        return 'bg-red-500/20 text-red-300 border border-red-500';
      default:
        return 'bg-gray-500/20 text-gray-300 border border-gray-500';
    }
  };

  const renderList = (title: string, items: string[], icon: React.ReactNode) => {
    if (items.length === 0) {
      return (
        <div>
          <h3 className="text-lg font-semibold text-gray-300 flex items-center mb-2"><CheckCircleIcon className="w-5 h-5 mr-2 text-green-400" /> No Gaps Found in {title}</h3>
          <p className="text-sm text-gray-400">The resume appears to meet the requirements for {title}.</p>
        </div>
      );
    }
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-300 flex items-center mb-2">{icon} {title} Gaps</h3>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start text-gray-400">
                <XCircleIcon className="w-4 h-4 mr-3 mt-1 text-red-400 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl animate-fade-in">
      <div className="p-6 border-b border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{result.candidateName}</h2>
            <p className="text-md text-cyan-400">{result.jobTitle}</p>
          </div>
          <div className={`px-4 py-1.5 text-sm font-semibold rounded-full ${getVerdictChipClass(result.verdict)}`}>
            Verdict: {result.verdict}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        <div className="md:col-span-1 flex flex-col items-center justify-center bg-gray-900/50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Relevance Score</h3>
          <ScoreDonutChart score={result.relevanceScore} />
        </div>

        <div className="md:col-span-2 space-y-6">
           <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-300 flex items-center mb-2"><LightBulbIcon className="w-5 h-5 mr-2 text-cyan-400" /> AI Feedback</h3>
                <p className="text-gray-400">{result.feedback}</p>
            </div>
             <div className="bg-gray-900/50 p-4 rounded-lg">
                {renderList("Skills", result.missingSkills, <DocumentIcon className="w-5 h-5 mr-2 text-cyan-400" />)}
             </div>
             <div className="bg-gray-900/50 p-4 rounded-lg">
                {renderList("Certifications", result.missingCertifications, <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />)}
             </div>
             <div className="bg-gray-900/50 p-4 rounded-lg">
                {renderList("Projects", result.missingProjects, <BriefcaseIcon className="w-5 h-5 mr-2 text-cyan-400" />)}
             </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;