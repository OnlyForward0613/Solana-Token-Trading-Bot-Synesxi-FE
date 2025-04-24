import { ArrowPathIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

const TradingPanel = ({ token, tradeParams, setTradeParams, handleSimulate, loading, onClose }: { token: any, tradeParams: any, setTradeParams: any, loading: any, handleSimulate: () => void, onClose: () => void }) => (

  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
            <div>
              <h2 className="text-2xl font-bold dark:text-white">{token.symbol}</h2>
              <p className="text-gray-500 dark:text-gray-400">{token.name}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Price and Change */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
              <p className="text-lg font-semibold dark:text-white">${token.price.toFixed(4)}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <p className="text-sm text-gray-500 dark:text-gray-400">24h Change</p>
              <p className={`text-lg font-semibold ${token.priceChange24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {token.priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(token.priceChange24h).toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Liquidity */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Liquidity</p>
            <p className="text-lg font-semibold dark:text-white">
              ${token.liquidity?.toLocaleString('en-US', { maximumFractionDigits: 2 }) || 'N/A'}
            </p>
          </div>

          {/* Trade Inputs */}
          <div className="space-y-4">
            {/* Buy/Sell Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTradeParams({ ...tradeParams, isBuy: true })}
                className={`p-3 rounded-lg transition-colors ${tradeParams.isBuy
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
              >
                Buy
              </button>
              <button
                onClick={() => setTradeParams({ ...tradeParams, isBuy: false })}
                className={`p-3 rounded-lg transition-colors ${!tradeParams.isBuy
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
              >
                Sell
              </button>
            </div>

            {/* Amount Input */}
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                {tradeParams.isBuy ? 'Buy' : 'Sell'} Amount
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="0.0"
                  value={tradeParams.amount || ''}
                  onChange={e => setTradeParams({ ...tradeParams, amount: parseFloat(e.target.value) })}
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
                <button
                  onClick={() => setTradeParams({ ...tradeParams, amount: 100 })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500 hover:underline"
                  disabled={loading}
                >
                  Max
                </button>
              </div>
            </div>

            {/* Slippage Tolerance */}
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Slippage Tolerance
              </label>
              <div className="relative">
                <div className="grid grid-cols-3 gap-2">
                  {[0.5, 1, 2].map(value => (
                    <button
                      key={value}
                      onClick={() => setTradeParams({ ...tradeParams, slippage: value })}
                      className={`p-2 rounded-lg transition-colors ${tradeParams.slippage === value
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                        }`}
                      disabled={loading}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stop Loss Price */}
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                Stop Loss Price (optional)
              </label>
              <input
                type="number"
                placeholder="0.0"
                value={tradeParams.stopLossPrice || ''}
                onChange={e => setTradeParams({
                  ...tradeParams,
                  stopLossPrice: parseFloat(e.target.value)
                })}
                className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
          </div>

          {/* Simulate Button */}
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2"
            onClick={handleSimulate}
            disabled={loading}
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Simulating Trade...</span>
              </>
            ) : (
              'Place Trade Order'
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default TradingPanel;