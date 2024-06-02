// components/DomainForm.tsx
import React, { useState } from 'react';

type DomainFormProps = {
  onSubmit: (domain: string) => void;
};

const DomainForm: React.FC<DomainFormProps> = ({ onSubmit }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(domain);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        placeholder="Enter domain"
        required
      />
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default DomainForm;
