export interface PerspectiveAnalysis {
  supporting: {
    title: string;
    points: string[];
  };
  opposing: {
    title: string;
    points: string[];
  };
  blindspots: {
    title: string;
    points: string[];
  };
  stakeholders: {
    beneficiaries: { group: string; reason: string }[];
    losers: { group: string; reason: string }[];
  };
}

export interface LogicFallacy {
  type: string;
  description: string;
  location: string;
  suggestion: string;
}

export interface LogicAnalysis {
  structure: string;
  premises: string[];
  conclusion: string;
  fallacies: LogicFallacy[];
  strength: 'weak' | 'moderate' | 'strong';
}

export interface ThoughtRecord {
  id: string;
  originalBelief: string;
  changedBelief: string;
  reason: string;
  date: string;
}
