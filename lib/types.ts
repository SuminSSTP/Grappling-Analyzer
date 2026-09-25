export type Sport = "grappling" | "climbing";
export type Importance = "high" | "medium" | "low";
export type CategoryStatus = "strong" | "developing" | "focus";

export interface Moment {
  id: string;
  timestamp: number;
  endTimestamp: number;
  category: string;
  title: string;
  description: string;
  whyItMatters: string;
  recommendation: string;
  importance: Importance;
  position?: string;
}

export interface ImprovementPriority {
  title: string;
  detail: string;
}

export interface CategoryBreakdownItem {
  category: string;
  status: CategoryStatus;
  count: number;
}

export interface SessionAnalysis {
  id: string;
  sport: Sport;
  title: string;
  discipline: string;
  date: string;
  duration: number;
  videoUrl?: string;
  videoName?: string;
  summary: string;
  strengths: string[];
  priorities: ImprovementPriority[];
  suggestedDrills: string[];
  categories: CategoryBreakdownItem[];
  moments: Moment[];
  isDemo?: boolean;
}

export interface AnalyzeInput {
  sport: Sport;
  discipline: string;
  context: string;
  file?: File;
  duration?: number;
}

export interface AnalysisService {
  analyze(input: AnalyzeInput): Promise<SessionAnalysis>;
}

export interface SavedSession extends Omit<SessionAnalysis, "videoUrl"> {
  thumbnail: "grappling" | "climbing";
}
