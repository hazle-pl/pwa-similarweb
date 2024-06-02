import React, { useState } from 'react';
import type { NextPage } from 'next';
import DomainForm from '../components/DomainForm';
import Result from 'components/Results';
import { SimilarWebData } from 'types/model';


const Home: NextPage = () => {
  const [data, setData] = useState<SimilarWebData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (domain: string) => {
    try {
      const response = await fetch(`/api/get?domain=${domain}`);
      const result = await response.json();
      if (response.ok) {
        setData(result);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch data');
        setData(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setData(null);
    }
  };

  return (
    <div>
      <h1>SimilarWeb Data Fetcher</h1>
      <DomainForm onSubmit={fetchData} />
      <Result data={data} error={error} />
    </div>
  );
};

export default Home;
