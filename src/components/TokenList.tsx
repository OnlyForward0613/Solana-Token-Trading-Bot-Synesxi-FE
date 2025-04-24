'use client'
import { useMutation, useQuery } from '@apollo/client'
import { ArrowPathIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import { GET_INITIAL_TOKENS, SEARCH_TOKENS, SIMULATE_TRADE } from '@/lib/queries'

import TokenCard from '@/components/TokenCard'
import TradingPanel from '@/components/TradingPanel'

interface SimulationHistory {
  id: string
  timestamp: string
  symbol: string
  amount: number
  isBuy: boolean
  slippage: number
  result: string
}

export default function TokenList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [selectedToken, setSelectedToken] = useState<any | null>(null)
  const [tradeParams, setTradeParams] = useState({
    tokenAddress: '',
    amount: 100,
    isBuy: true,
    slippage: 0.5,
  })
  const [simulationHistory, setSimulationHistory] = useState<SimulationHistory[]>([])

  const [simulateTrade, { loading }] = useMutation(SIMULATE_TRADE)

  const handleSimulate = async () => {
    try {
      const { data } = await simulateTrade({
        variables: {
          tokenAddress: tradeParams.tokenAddress,
          amount: tradeParams.amount,
          isBuy: tradeParams.isBuy,
          slippage: tradeParams.slippage,
        },
      })
      
      const newEntry = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString(),
        symbol: selectedToken.symbol,
        amount: tradeParams.amount,
        isBuy: tradeParams.isBuy,
        slippage: tradeParams.slippage,
        result: data.simulateTrade,
      }
      
      setSimulationHistory(prev => [newEntry, ...prev].slice(0, 10)) // Keep last 10 entries
      setSelectedToken(null);
    } catch (err) {
      console.error('Simulation Failed:', err)
    }
  }

  const { data: initialData, loading: initialLoading } = useQuery(GET_INITIAL_TOKENS)
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH_TOKENS, {
    variables: { search: searchTerm },
    skip: !searchTerm
  })

  const tokens = searchTerm ? searchData?.tokens : initialData?.tokens
  const isLoading = initialLoading || (searchTerm && searchLoading)

  return (
    <section className="mx-auto px-4 py-8">
      {selectedToken && (
        <TradingPanel
          token={selectedToken}
          tradeParams={tradeParams}
          handleSimulate={handleSimulate}
          setTradeParams={setTradeParams}
          loading={loading}
          onClose={() => setSelectedToken(null)}
        />
      )}

      <div className="flex gap-8">
        {/* Left Column */}
        <div className="flex-1">
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
                    onSelect={() => {
                      setSelectedToken(token)
                      setTradeParams(prev => ({
                        ...prev,
                        tokenAddress: token.address
                      }))
                    }}
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
        </div>

        {/* Simulation History Panel */}
        <div className="w-1/4 hidden xl:block">
          <div className="sticky top-4">
            <h2 className="text-xl font-bold mb-6 dark:text-white">Simulation History</h2>
            
            <div className="space-y-4">
              {simulationHistory.length === 0 ? (
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No simulations yet
                  </p>
                </div>
              ) : (
                simulationHistory.map(entry => (
                  <div key={entry.id} className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`flex items-center gap-2 ${entry.isBuy ? 'text-green-500' : 'text-red-500'}`}>
                        <span className="font-medium">{entry.symbol}</span>
                        <span className="text-sm">{entry.isBuy ? 'Buy' : 'Sell'}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {entry.timestamp}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Amount</span>
                        <span>{entry.amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Slippage</span>
                        <span>{entry.slippage}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Result</span>
                        <p className="font-medium break-all pl-2">{entry.result}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
