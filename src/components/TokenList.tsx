'use client'
import { useQuery } from '@apollo/client'
import { ArrowPathIcon,MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { GET_INITIAL_TOKENS, SEARCH_TOKENS } from '@/lib/queries'

const TokenCard = ({ token }: { token: any }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
        <div>
          <h3 className="font-bold text-lg dark:text-white">{token.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{token.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          ${token.price.toFixed(4)}
        </p>
        <p className={`text-sm ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {token.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(token.priceChange24h).toFixed(2)}%
        </p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">Liquidity</span>
        <span className="font-medium dark:text-gray-200">
          ${token.liquidity?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 'N/A'}
        </span>
      </div>
    </div>

    <button className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200">
      Select to Trade
    </button>
  </div>
)

export default function TokenList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const { data: initialData, loading: initialLoading } = useQuery(GET_INITIAL_TOKENS)
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_TOKENS, {
    variables: { search: searchTerm },
    skip: !searchTerm
  })

  const tokens = searchTerm ? searchData?.tokens : initialData?.tokens
  const isLoading = initialLoading || (searchTerm && searchLoading)

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tokens..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 dark:text-white transition-all duration-200"
            onChange={e => {
              setSearchTerm(e.target.value)
              setIsSearching(e.target.value.length > 0)
            }}
            value={searchTerm}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <ArrowPathIcon className="w-8 h-8 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading market data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tokens?.length ? (
            tokens.map((token: any) => (
              <TokenCard key={`${token.address}-${token.chain}`} token={token} />
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-3xl mb-4">🪙</div>
              <p className="text-gray-600 dark:text-gray-400">
                {isSearching ? 'No matching tokens found' : 'Failed to load market data'}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
