'use client';
import { useState, Suspense } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingIndicator from '@/components/LoadingIndicator';
import TokenList from '@/components/TokenList';

import SnipeNewTokenForm from '@/components/SnipeNewTokenForm';
import TradingModeToggle from '@/components/TradingModeToggle';
import Watchlist from '@/components/WatchList';

export default function DeFiDashboard() {

  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [tradingMode, setTradingMode] = useState('Manual');

  function handleAddToWatchlist(address: string) {
    setWatchlist([...watchlist, address]);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-center">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex flex-row justify-between">
          <h1 className="text-2xl font-bold">DeFi Dashboard</h1>
          <div>
            <label className="mr-2 font-bold">Trading Mode:</label>
            <button
              className={`px-3 py-1 rounded ${tradingMode === 'Manual' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setTradingMode('Auto')}
            >
              Auto
            </button>
            <button
              className={`px-3 py-1 rounded ml-2 ${tradingMode === 'Auto' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setTradingMode('Manual')}
            >
              Manual
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto p-4">
        <ErrorBoundary fallback={<p className="text-red-500">Critical error occurred</p>}>
          <Suspense fallback={<LoadingIndicator />}>
            <TokenList />
            <SnipeNewTokenForm onAdd={handleAddToWatchlist} />
            <Watchlist watchList={watchlist}></Watchlist>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
