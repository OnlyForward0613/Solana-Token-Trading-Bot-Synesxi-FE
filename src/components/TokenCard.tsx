
const TokenCard = ({ token, onSelect }: { token: any, onSelect: () => void }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
        <div>
          <h3 className="font-bold text-lg dark:text-white">{token.symbol}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{token.name}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-800 dark:text-gray-100">
          ${token.price.toFixed(4)}
        </p>
        <p className={`text-sm ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {token.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(token.priceChange24h).toFixed(2)}%
        </p>
      </div>
    </div>

    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500 dark:text-gray-400">Liquidity</span>
        <span className="font-medium dark:text-gray-200">
          ${token.liquidity?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 'N/A'}
        </span>
      </div>
    </div>

    <button
      onClick={onSelect}
      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity duration-200"
    >
      Trade
    </button>
  </div>
)

export default TokenCard;