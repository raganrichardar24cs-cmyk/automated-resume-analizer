
import React, { useState } from 'react';
import { AnalysisResult, AnalysisRecord } from './types';
import Header from './components/Header';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import ResultsDisplay from './components/ResultsDisplay';
import AnalysisDashboard from './components/AnalysisDashboard';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'analyzer' | 'dashboard'>('analyzer');

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    const newRecord: AnalysisRecord = {
      ...result,
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
    };
    setAnalysisHistory(prevHistory => [newRecord, ...prevHistory]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="mb-8 flex justify-center border-b border-gray-700">
          <button 
            onClick={() => setActiveView('analyzer')}
            className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${activeView === 'analyzer' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-cyan-300'}`}
          >
            New Analysis
          </button>
          <button 
            onClick={() => setActiveView('dashboard')}
            className={`px-6 py-3 text-lg font-medium transition-colors duration-200 ${activeView === 'dashboard' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-cyan-300'}`}
          >
            Dashboard ({analysisHistory.length})
          </button>
        </div>

        {activeView === 'analyzer' && (
          <div>
            <ResumeAnalyzer 
              onAnalysisComplete={handleAnalysisComplete} 
              setIsLoading={setIsLoading}
              setError={setError}
              isLoading={isLoading}
            />
            {error && <div className="mt-6 p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg text-center">{error}</div>}
            {isLoading && !analysisResult && (
                 <div className="mt-8 text-center">
                    <p className="text-lg text-cyan-400 animate-pulse">Analyzing... this may take a moment.</p>
                </div>
            )}
            {analysisResult && !isLoading && <ResultsDisplay result={analysisResult} />}
          </div>
        )}

        {activeView === 'dashboard' && (
          <AnalysisDashboard history={analysisHistory} />
        )}
      </main>
    </div>
  );
};

export default App;
