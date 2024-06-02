export interface SimilarWebData {
  description: string;
  siteName: string;
  domain: string;
  globalRank: number;
  countryRank: { country: string; rank: number };
  categoryRank: { rank: number; category: string };
  topCountryShares: { country: string; share: number }[];
  trafficSources: { [key: string]: number };
  engagements: { bounceRate: number; pagesPerVisit: number; visits: number; timeOnSite: number };
}
