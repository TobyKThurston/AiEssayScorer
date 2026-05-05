export type Tier = "Reach" | "Match" | "Safety";

export type TestType = "SAT" | "ACT" | "None";

export type GpaScale = "weighted" | "unweighted";

export interface Activity {
  title: string;
  tier: 1 | 2 | 3 | 4;
  description?: string;
}

export interface Profile {
  test: TestType;
  satScore?: number;
  actScore?: number;
  gpa: number;
  gpaScale: GpaScale;
  state: string;
  international: boolean;
  schoolSlugs: string[];
  activities: Activity[];
  intendedMajor?: string;
  demographics?: string;
  hooks?: string;
  essayStrength?: "weak" | "average" | "strong";
}

export interface SchoolOdds {
  slug: string;
  name: string;
  percent: number;
  tier: Tier;
  factors: string[];
}

export interface OddsResult {
  calculationId: string;
  generatedAt: string;
  schools: SchoolOdds[];
}

export const ACTIVITY_TIER_HINTS: Record<Activity["tier"], string> = {
  1: "National / international recognition (e.g., USAMO, ISEF finalist, published research)",
  2: "State-level award, varsity captain, founder of substantial org",
  3: "School-level leadership, club president, regional honors",
  4: "Participation, member, club involvement",
};

export const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
] as const;
