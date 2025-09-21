
import React, { useState, useMemo } from 'react';
import { AnalysisRecord } from '../types';

const AnalysisDashboard: React.FC<{ history: AnalysisRecord[] }> = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof AnalysisRecord; direction: 'asc' | 'desc' } | null>({ key: 'relevanceScore', direction: 'desc' });

  const filteredHistory = useMemo(() => {
    return history.filter(record =>
      record.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [history, searchTerm]);
  
  const sortedHistory = useMemo(() => {
    let sortableItems = [...filteredHistory];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredHistory, sortConfig]);

  const requestSort = (key: keyof AnalysisRecord) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getVerdictChipClass = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case 'high': return 'bg-green-500/20 text-green-300';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300';
      case 'low': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getSortIndicator = (key: keyof AnalysisRecord) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  if (history.length === 0) {
    return (
      <div className="text-center p-10 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-300">No Analyses Yet</h3>
        <p className="text-gray-500 mt-2">Perform a new analysis to see results here.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">Analysis History</h2>
        <input
          type="text"
          placeholder="Search by name or title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-lg py-2 px-4 text-gray-300 focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-900/50">
            <tr>
              {['candidateName', 'jobTitle', 'relevanceScore', 'verdict', 'date'].map((key) => (
                  <th key={key} scope="col" className="px-6 py-3 text-left text-xs font-medium text-cyan-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(key as keyof AnalysisRecord)}>
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      {getSortIndicator(key as keyof AnalysisRecord)}
                  </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {sortedHistory.map((record) => (
              <tr key={record.id} className="hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{record.candidateName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{record.jobTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-bold">{record.relevanceScore}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getVerdictChipClass(record.verdict)}`}>
                    {record.verdict}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
         {sortedHistory.length === 0 && (
            <div className="text-center py-10">
                <p className="text-gray-400">No results match your search criteria.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisDashboard;
