/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TradeHistory({ trades }:any) {
  if (!trades.length) return <p>No trades yet.</p>;
  return (
    <div className="my-4">
      <h3 className="font-bold mb-2">Trade History</h3>
      <ul className="bg-white p-2 rounded">
        {trades.map((trade:any, i:any) => (
          <li key={i}>
            {trade.type.toUpperCase()} {trade.amount} {trade.token.symbol} @ ${trade.token.price} (slippage: {trade.slippage}%, stop-loss: {trade.stopLoss || 'N/A'})
          </li>
        ))}
      </ul>
    </div>
  );
}
