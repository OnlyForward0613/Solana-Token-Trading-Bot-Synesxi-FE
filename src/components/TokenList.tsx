'use client'
import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { GET_INITIAL_TOKENS, GET_TOKENS, SEARCH_TOKENS } from '@/lib/queries';

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
  const [isSearching, setIsSearching] = useState(false);
  const { data: initialData, loading: initialLoading } = useQuery(GET_INITIAL_TOKENS);
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_TOKENS, {
    variables: { search: searchTerm },
    skip: !searchTerm
  });

  const tokens = searchTerm ? searchData?.tokens : initialData?.tokens;
  const isLoading = initialLoading || (searchTerm && searchLoading);

  const { data, loading, error } = useQuery(GET_TOKENS, {
    variables: {
      search: searchTerm,
      limit: searchTerm ? 9 : 9, // Always show 9 items
      offset: 0
    },
    fetchPolicy: 'cache-and-network'
  });

  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="mb-8">
      <input
        type="text"
        placeholder="Search tokens..."
        className="p-2 border rounded w-full max-w-md mb-4"
        onChange={e => {
          setSearchTerm(e.target.value);
          setIsSearching(e.target.value.length > 0);
        }}
        value={searchTerm}
      />

      {isLoading ? (
        <p>Loading tokens...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens?.length ? (
            tokens.map((token:any) => (
              <TokenCard key={token.address} token={token} />
            ))
          ) : (
            <p className="text-gray-500">
              {isSearching ? 'No tokens found' : 'Failed to load tokens'}
            </p>
          )}
        </div>
      )}
    </section>
  );
}
