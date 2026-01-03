import React from "react";

/**
 * Game Mode Selector Component
 *
 * Enhanced with:
 * - Modern card design
 * - Better visual feedback
 * - Smooth transitions
 */
const GameModeSelector = ({
  gameMode,
  botColor,
  onModeChange,
  onBotColorChange,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 shadow-lg border border-gray-600">
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Game Mode
      </h3>

      <div className="space-y-3">
        {/* Two-Player Mode */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="gameMode"
            value="two-player"
            checked={gameMode === "two-player"}
            onChange={(e) => onModeChange(e.target.value)}
            className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
          />
          <div
            className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
              gameMode === "two-player"
                ? "bg-blue-600/30 border-2 border-blue-500"
                : "bg-gray-700/50 border-2 border-transparent group-hover:bg-gray-700"
            }`}
          >
            <span className="text-white font-semibold">👥 Two Players</span>
          </div>
        </label>

        {/* One-Player Mode */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="gameMode"
            value="one-player"
            checked={gameMode === "one-player"}
            onChange={(e) => onModeChange(e.target.value)}
            className="mr-3 w-5 h-5 text-blue-600 focus:ring-blue-500 focus:ring-2"
          />
          <div
            className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
              gameMode === "one-player"
                ? "bg-blue-600/30 border-2 border-blue-500"
                : "bg-gray-700/50 border-2 border-transparent group-hover:bg-gray-700"
            }`}
          >
            <span className="text-white font-semibold">🤖 Play vs Bot</span>
          </div>
        </label>

        {/* Bot Color Selection (only in one-player mode) */}
        {gameMode === "one-player" && (
          <div className="ml-8 mt-3 space-y-2 animate-fadeIn">
            <div className="text-sm text-gray-300 mb-3 font-semibold">
              You play as:
            </div>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="botColor"
                value="white"
                checked={botColor === "black"}
                onChange={() => onBotColorChange("black")}
                className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <div
                className={`flex-1 p-2 rounded-lg transition-all ${
                  botColor === "black"
                    ? "bg-blue-600/30 border border-blue-500"
                    : "bg-gray-700/30 border border-transparent group-hover:bg-gray-700/50"
                }`}
              >
                <span className="text-white text-sm">
                  ⚪ White (You move first)
                </span>
              </div>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="botColor"
                value="black"
                checked={botColor === "white"}
                onChange={() => onBotColorChange("white")}
                className="mr-3 w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2"
              />
              <div
                className={`flex-1 p-2 rounded-lg transition-all ${
                  botColor === "white"
                    ? "bg-blue-600/30 border border-blue-500"
                    : "bg-gray-700/30 border border-transparent group-hover:bg-gray-700/50"
                }`}
              >
                <span className="text-gray-300 text-sm">
                  ⚫ Black (Bot moves first)
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModeSelector;
