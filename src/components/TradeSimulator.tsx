/* eslint-disable style/jsx-one-expression-per-line */
/* eslint-disable unicorn/prefer-number-properties */
/* eslint-disable no-console */
/* eslint-disable no-alert */
'use client';
import { SIMULATE_TRADE } from '@/lib/queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';

export default function TradeSimulator() {
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

  return (
    <div className="trade-simulator">
      <input
        placeholder="Token Address"
        value={tradeParams.tokenAddress}
        onChange={e => setTradeParams({ ...tradeParams, tokenAddress: e.target.value })}
      />

      <input
        type="number"
        value={tradeParams.amount}
        onChange={e => setTradeParams({ ...tradeParams, amount: parseFloat(e.target.value) })}
      />

      <select
        value={tradeParams.isBuy ? 'buy' : 'sell'}
        onChange={e => setTradeParams({ ...tradeParams, isBuy: e.target.value === 'buy' })}
      >
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
      </select>

      <input
        type="number"
        step="0.1"
        value={tradeParams.slippage}
        onChange={e => setTradeParams({ ...tradeParams, slippage: parseFloat(e.target.value) })}
      />

      <button onClick={handleSimulate} disabled={loading}>
        {loading ? 'Simulating...' : 'Run Simulation'}
      </button>

      {error && <div className="error">Error: {error.message}</div>}
    </div>
  );
}
