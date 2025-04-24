import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SnipeNewTokenForm({ onAdd }: any) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  function handleAdd() {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      setError('Invalid address');
      return;
    }
    setError('');
    onAdd(address);
    setAddress('');
  }

  return (
    <div className="my-4">
      <input
        className="border p-1 mr-2"
        placeholder="Token address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleAdd}>
        Add to Watchlist
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}
