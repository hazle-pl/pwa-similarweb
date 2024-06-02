// pages/api/fetchData.ts
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  domain?: string,
  globalRank?: number,
  countryRank?: { country: string, rank: number },
  categoryRank?: { rank: string, category: string },
  topCountryShares?: { country: string, share: number }[],
  trafficSources?: { [source: string]: number },
  engagements?: { bounceRate: number, pagesPerVisit: number, visits: number, timeOnSite: number },
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { domain } = req.query;

  if (!domain || typeof domain !== 'string') {
    return res.status(400).json({ error: 'Domain parameter is required and should be a string' });
  }

  try {
    const response = await fetch(`https://data.similarweb.com/api/v1/data?domain=${domain}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data from SimilarWeb API');
    }

    const data = await response.json();

    // Extracting and formatting the necessary data
    const formattedData: Data = {
      domain: data.SiteName,
      globalRank: data.GlobalRank?.Rank,
      countryRank: data.CountryRank ? { country: data.CountryRank.CountryCode, rank: data.CountryRank.Rank } : undefined,
      categoryRank: data.CategoryRank ? { rank: data.CategoryRank.Rank, category: data.CategoryRank.Category } : undefined,
      topCountryShares: data.TopCountryShares?.map((country: any) => ({
        country: country.CountryCode,
        share: country.Value
      })),
      trafficSources: data.TrafficSources,
      engagements: data.Engagments ? {
        bounceRate: parseFloat(data.Engagments.BounceRate),
        pagesPerVisit: parseFloat(data.Engagments.PagePerVisit),
        visits: parseInt(data.Engagments.Visits),
        timeOnSite: parseFloat(data.Engagments.TimeOnSite)
      } : undefined
    };

    res.status(200).json(formattedData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
}
