export type Tier = "Reach" | "Match" | "Safety";

export type TestType = "SAT" | "ACT" | "None";

export type GpaScale = "weighted" | "unweighted";

export interface Activity {
  title: string;
  tier: 1 | 2 | 3 | 4;
  role?: string;
  hoursPerWeek?: number;
  years?: number;
  description?: string;
}

export interface Profile {
  test: TestType;
  satScore?: number;
  actScore?: number;
  gpa?: number;
  gpaScale: GpaScale;
  state: string;
  international: boolean;
  schoolSlugs: string[];
  activities: Activity[];
  intendedMajor?: string;
  demographics?: string;
  hooks?: string;
}

export interface SchoolOdds {
  slug: string;
  name: string;
  /**
   * The real admit percentage. Intentionally OMITTED from the client-facing
   * locked payload returned by /api/calculate-odds — it is the paid value and
   * must never reach the pre-payment DOM. Present only when read server-side
   * from the database on /odds/result (post-payment reveal).
   */
  percent?: number;
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

export const STATE_NAMES: Record<(typeof US_STATES)[number], string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", DC: "District of Columbia",
};

export function resolveStateInput(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const upper = trimmed.toUpperCase();
  if ((US_STATES as readonly string[]).includes(upper)) return upper;
  const lower = trimmed.toLowerCase();
  for (const code of US_STATES) {
    if (STATE_NAMES[code].toLowerCase() === lower) return code;
  }
  return "";
}
