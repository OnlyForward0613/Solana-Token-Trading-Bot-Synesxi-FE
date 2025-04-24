/* eslint-disable react/no-array-index-key */
'use client';
import { GET_TOKENS } from '@/lib/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const TokenCard = ({ token }: { token: any }) => (
  <div className="bg-white p-4 rounded-lg shadow" style={{ backgroundColor: 'gray', width: '50%' }}>
    <h3 className="font-bold">{token.symbol}</h3>
    <p>{token.name}</p>
    <p>
      Price: $
      {token.price.toFixed(4)}
    </p>
    <p className={token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}>
      24h:
      {' '}
      {token.priceChange24h.toFixed(2)}
      %
    </p>
    <p>
      Liquidity: $
      {token.liquidity?.toFixed(2) || 'N/A'}
    </p>
  </div>
);

export default function TokenList() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, error } = useQuery(GET_TOKENS, {
    variables: { search: searchTerm || 'SOL' },
  });

  if (error) {
    return <p className="text-red-500">Error loading tokens</p>;
  }

  return (
    <section className="mb-8">
      <input
        type="text"
        placeholder="Search tokens..."
        className="p-2 border rounded w-full max-w-md mb-4"
        onChange={e => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.tokens?.map((token: any, index: any) => (
          <TokenCard key={index} token={token} />
        ))}
      </div>
    </section>
  );
}
