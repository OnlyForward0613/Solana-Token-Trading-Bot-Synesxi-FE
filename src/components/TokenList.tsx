'use client'
import { useMutation,useQuery } from '@apollo/client'
import { ArrowPathIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { GET_INITIAL_TOKENS, SEARCH_TOKENS, SIMULATE_TRADE } from '@/lib/queries'

const TokenCard = ({ token, onSelect }: { token: any, onSelect: () => void }) => (
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

    <button
      onClick={onSelect}
      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200"
    >
      Trade
    </button>
  </div>
)

const TradingPanel = ({ token, tradeParams, setTradeParams, handleSimulate, loading, onClose }: { token: any, tradeParams:any, setTradeParams:any, loading: any, handleSimulate: () => void, onClose: () => void }) => (
    
<div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>

          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
              <div>
                <h2 className="text-2xl font-bold dark:text-white">{token.symbol}</h2>
                <p className="text-gray-500 dark:text-gray-400">{token.name}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Price and Change */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                <p className="text-lg font-semibold dark:text-white">${token.price.toFixed(4)}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
                <p className={`text-lg font-semibold ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {token.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(token.priceChange24h).toFixed(2)}%
                </p>
              </div>
            </div>

            {/* Liquidity */}
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Liquidity</p>
              <p className="text-lg font-semibold dark:text-white">
                ${token.liquidity?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 'N/A'}
              </p>
            </div>

            {/* Trade Inputs */}
            <div className="space-y-4">
              {/* Buy/Sell Toggle */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTradeParams({ ...tradeParams, isBuy: true })}
                  className={`p-3 rounded-lg transition-colors ${
                    tradeParams.isBuy 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Buy
                </button>
                <button
                  onClick={() => setTradeParams({ ...tradeParams, isBuy: false })}
                  className={`p-3 rounded-lg transition-colors ${
                    !tradeParams.isBuy 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Sell
                </button>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {tradeParams.isBuy ? 'Buy' : 'Sell'} Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="0.0"
                    value={tradeParams.amount || ''}
                    onChange={e => setTradeParams({ ...tradeParams, amount: parseFloat(e.target.value) })}
                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                  />
                  <button
                    onClick={() => setTradeParams({ ...tradeParams, amount: 100 })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:underline"
                    disabled={loading}
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Slippage Tolerance */}
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Slippage Tolerance
                </label>
                <div className="relative">
                  <div className="grid grid-cols-3 gap-2">
                    {[0.5, 1, 2].map(value => (
                      <button
                        key={value}
                        onClick={() => setTradeParams({ ...tradeParams, slippage: value })}
                        className={`p-2 rounded-lg transition-colors ${
                          tradeParams.slippage === value
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                        disabled={loading}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stop Loss Price */}
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Stop Loss Price (optional)
                </label>
                <input
                  type="number"
                  placeholder="0.0"
                  value={tradeParams.stopLossPrice || ''}
                  onChange={e => setTradeParams({ 
                    ...tradeParams, 
                    stopLossPrice: parseFloat(e.target.value) 
                  })}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Simulate Button */}
            <button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
              onClick={handleSimulate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  <span>Simulating Trade...</span>
                </>
              ) : (
                'Place Trade Order'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
)

export default function TokenList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedToken, setSelectedToken] = useState<any | null>(null)
  const [tradeParams, setTradeParams] = useState({
    tokenAddress: '',
    amount: 100,
    isBuy: true,
    slippage: 0.5,
  });

  const [simulateTrade, { loading, error }] = useMutation(SIMULATE_TRADE);

  const handleSimulate = async () => {
    try {
      const { data } = await simulateTrade({
        variables: {
          tokenAddress: tradeParams.tokenAddress,
          amount: tradeParams.amount,
          isBuy: tradeParams.isBuy,
          slippage: tradeParams.slippage,
        },
      });
      console.log('Simulation Result:', data.simulateTrade);
      alert(`Trade Simulation: ${data.simulateTrade}`);
    } catch (err) {
      console.error('Simulation Failed:', err);
    }
  };

  const { data: initialData, loading: initialLoading } = useQuery(GET_INITIAL_TOKENS)
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_TOKENS, {
    variables: { search: searchTerm },
    skip: !searchTerm
  })

  const tokens = searchTerm ? searchData?.tokens : initialData?.tokens
  const isLoading = initialLoading || (searchTerm && searchLoading)

  return (
    <section className="container mx-auto px-4 py-8">
      {selectedToken && (
        <TradingPanel
          token={selectedToken}
          tradeParams={tradeParams}
          handleSimulate={handleSimulate}
          setTradeParams= {setTradeParams}
          loading={loading}
          onClose={() => setSelectedToken(null)}
        />
      )}

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
              <TokenCard
                key={`${token.address}-${token.chain}`}
                token={token}
                onSelect={() => setSelectedToken(token)}
              />
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
