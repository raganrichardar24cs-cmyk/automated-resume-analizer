
export interface AnalysisResult {
  relevanceScore: number;
  verdict: 'High' | 'Medium' | 'Low';
  candidateName: string;
  jobTitle: string;
  missingSkills: string[];
  missingCertifications: string[];
  missingProjects: string[];
  feedback: string;
}

export interface AnalysisRecord extends AnalysisResult {
  id: string;
  date: string;
}
