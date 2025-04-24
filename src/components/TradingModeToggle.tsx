/* eslint-disable @typescript-eslint/no-explicit-any */
export default function TradingModeToggle({ mode, onToggle }: any) {
  return (
    <div className="my-2">
      <label className="mr-2 font-bold">Trading Mode:</label>
      <button
        className={`px-3 py-1 rounded ${mode === 'Auto' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => onToggle('Auto')}
      >
        Auto
      </button>
      <button
        className={`px-3 py-1 rounded ml-2 ${mode === 'Manual' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        onClick={() => onToggle('Manual')}
      >
        Manual
      </button>
    </div>
  );
}
