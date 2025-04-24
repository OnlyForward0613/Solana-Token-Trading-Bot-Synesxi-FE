'use client';
import { Suspense } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import LoadingIndicator from '@/components/LoadingIndicator';
import TokenList from '@/components/TokenList';
import TradeSimulator from '@/components/TradeSimulator';

export default function DeFiDashboard() {
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
            <TokenList />
            <TradeSimulator />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}
