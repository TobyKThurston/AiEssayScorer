export type SchoolFit = {
  score: number;
  feedback: string;
  tips: string[];
};

export type AdmissionsView = {
  firstImpression: string;
  strengths: string[];
  concerns: string[];
  blendRisk: "Low" | "Medium" | "High";
  standoutPotential: string;
};

export type EssayRating = {
  score: number;
  contentScore?: number;
  structureScore?: number;
  styleScore?: number;
  strengths: string[];
  improvements: string[];
  contentFeedback: string;
  structureFeedback: string;
  styleFeedback: string;
  recommendation: string;
  lineSuggestions?: Array<{
    original: string;
    suggestion: string;
    reason: string;
  }>;
  specificityScore?: number;
  grammarScore?: number;
  schoolFit?: SchoolFit;
  admissionsView?: AdmissionsView;
  hooks?: {
    narrative: string;
    boldStatement: string;
    reflective: string;
  };
};

export type Essay = {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
};

export type EssayVersion = {
  id: string;
  essay_id: string;
  content: string;
  target_schools: string[];
  essay_prompt: string;
  essay_type: string;
  analysis: EssayRating | null;
  version_number: number;
  label: string | null;
  created_at: string;
};

export type MetadataFields = {
  essayType: string;
  targetSchools: string[];
  essayPrompt: string;
};

export type AnnotatedSegment = {
  text: string;
  highlightIndex?: number;
};
