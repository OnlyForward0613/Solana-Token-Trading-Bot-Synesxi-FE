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
      <label className="inline-flex items-center me-5 cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" checked>
        </input>
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600">
          </div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Green</span>
      </label>
    </div>
  );
}
