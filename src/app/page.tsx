'use client';
import { useState, Suspense } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingIndicator from '@/components/LoadingIndicator';
import TokenList from '@/components/TokenList';
import TradeSimulator from '@/components/TradeSimulator';

import SnipeNewTokenForm from '@/components/SnipeNewTokenForm';
import TradeHistory from '@/components/TradeHistory';
import TradingModeToggle from '@/components/TradingModeToggle';

export default function DeFiDashboard() {

  const [selectedToken, setSelectedToken] = useState(null);
  const [tradeHistory, setTradeHistory] = useState([]);
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

      <main className="container mx-auto p-4">
        <ErrorBoundary fallback={<p className="text-red-500">Critical error occurred</p>}>
          <Suspense fallback={<LoadingIndicator />}>
            <TradingModeToggle mode={tradingMode} onToggle={setTradingMode} />
            <SnipeNewTokenForm onAdd={handleAddToWatchlist} />
            <TokenList />
            <TradeSimulator />
            <TradeHistory trades={tradeHistory} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
