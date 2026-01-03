import React from "react";

/**
 * Game Status Component
 *
 * Enhanced with:
 * - Modern card design with gradients
 * - Icons for better visual feedback
 * - Better color coding
 * - Smooth animations
 */
const GameStatus = ({
  isWhiteTurn,
  isInCheck,
  isCheckMate,
  isStalemate,
  whiteTime,
  blackTime,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 shadow-lg border border-gray-600">
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Game Status
      </h3>

      {/* Current Turn */}
      <div className="mb-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-semibold">Current Turn:</span>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full ${
                isWhiteTurn ? "bg-white shadow-lg" : "bg-gray-400"
              }`}
            ></div>
            <span
              className={`font-bold text-lg ${
                isWhiteTurn ? "text-white" : "text-gray-400"
              }`}
            >
              {isWhiteTurn ? "White" : "Black"}
            </span>
          </div>
        </div>
      </div>

      {/* Game Timer */}
      {(whiteTime || blackTime) && (
        <div className="mb-3 space-y-2">
          <div
            className={`flex justify-between items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              isWhiteTurn
                ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 border-2 border-blue-400"
                : "bg-gray-700 border border-gray-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <span className="text-white font-semibold">White</span>
            </div>
            <span className="text-white font-mono font-bold text-lg">
              {whiteTime || "10:00"}
            </span>
          </div>
          <div
            className={`flex justify-between items-center px-4 py-3 rounded-lg transition-all duration-300 ${
              !isWhiteTurn
                ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 border-2 border-blue-400"
                : "bg-gray-700 border border-gray-600"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
              <span className="text-gray-300 font-semibold">Black</span>
            </div>
            <span className="text-gray-300 font-mono font-bold text-lg">
              {blackTime || "10:00"}
            </span>
          </div>
        </div>
      )}

      {/* Status Messages */}
      <div className="space-y-2">
        {isCheckMate && (
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-bold text-center animate-pulse shadow-lg border-2 border-red-500">
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">🏆</span>
              <span>
                {isWhiteTurn
                  ? "Black Wins - Checkmate!"
                  : "White Wins - Checkmate!"}
              </span>
              <span className="text-2xl">🏆</span>
            </div>
          </div>
        )}

        {isStalemate && !isCheckMate && (
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-4 py-3 rounded-lg font-bold text-center shadow-lg border-2 border-yellow-500">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🤝</span>
              <span>Stalemate - Draw!</span>
            </div>
          </div>
        )}

        {isInCheck && !isCheckMate && !isStalemate && (
          <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-3 rounded-lg font-bold text-center shadow-lg border-2 border-yellow-400 animate-pulse">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>
                {isWhiteTurn ? "White King in Check!" : "Black King in Check!"}
              </span>
            </div>
          </div>
        )}

        {!isInCheck && !isCheckMate && !isStalemate && (
          <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-lg text-center shadow-lg border-2 border-green-500">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">✓</span>
              <span className="font-semibold">Game in Progress</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStatus;
