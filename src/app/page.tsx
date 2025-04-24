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

  function handleAddToWatchlist(address:string) {
    setWatchlist([...watchlist, address]);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-center">
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">DeFi Dashboard</h1>
        </div>
      </header>

      <main className="mx-auto p-4">
        <ErrorBoundary fallback={<p className="text-red-500">Critical error occurred</p>}>
          <Suspense fallback={<LoadingIndicator />}>
            <TradingModeToggle mode={tradingMode} onToggle={setTradingMode} />
            <TokenList />
            <SnipeNewTokenForm onAdd={handleAddToWatchlist} />
            <Watchlist watchList={watchlist}></Watchlist>
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
