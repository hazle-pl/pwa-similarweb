import React from 'react';
import { SimilarWebData } from 'types/model';


type ResultProps = {
  data: SimilarWebData | null;
  error: string | null;
};

const Result: React.FC<ResultProps> = ({ data, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data to display</div>;
  }

  return (
    <div>
      <h2>Fetched Data:</h2>
      <p>Description: {data.description}</p>
      <p>Site Name: {data.siteName}</p>
      <p>Domain: {data.domain}</p>
      <p>Global Rank: {data.globalRank}</p>
      <p>Country Rank: {data.countryRank.country} - {data.countryRank.rank}</p>
      <p>Category Rank: {data.categoryRank.rank} - {data.categoryRank.category}</p>
      <p>Top Country Shares:</p>
      <ul>
        {data.topCountryShares.map((countryShare, index) => (
          <li key={index}>{countryShare.country}: {countryShare.share}</li>
        ))}
      </ul>
      <p>Traffic Sources:</p>
      <ul>
        {Object.entries(data.trafficSources).map(([source, value]) => (
          <li key={source}>{source}: {value}</li>
        ))}
      </ul>
      <p>Engagements:</p>
      <ul>
        <li>Bounce Rate: {data.engagements.bounceRate}</li>
        <li>Pages Per Visit: {data.engagements.pagesPerVisit}</li>
        <li>Visits: {data.engagements.visits}</li>
        <li>Time On Site: {data.engagements.timeOnSite}</li>
      </ul>
    </div>
  );
};

export default Result;
