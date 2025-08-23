export type UserProfile = {
  income: number;           // annual USD
  borough: string;          // e.g., "Manhattan"
  householdSize: number;    // e.g., 2
  immigrationStatus?: string; // optional text
  language?: string;        // e.g., 'en', 'ru', 'es', 'zh'
};

export type BenefitProgram = {
  id: string;
  name: string;
  agency?: string;
  summary: string;
  eligibilityBullets: string[];
  applyUrl?: string;
  sources: { title: string; url: string }[];
};

export type SearchRequest = {
  query: string;            // constructed search query
  profile?: UserProfile;
};
