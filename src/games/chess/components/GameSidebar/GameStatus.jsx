import React from "react";

/**
 * Game Status Component
 *
 * Displays current game status:
 * - Current player's turn
 * - Check indicator
 * - Checkmate indicator
 * - Stalemate indicator
 * - Game timer
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
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center">Game Status</h3>

      {/* Current Turn */}
      <div className="mb-2">
        <span className="text-gray-300">Current Turn: </span>
        <span
          className={`font-bold ${
            isWhiteTurn ? "text-white" : "text-gray-400"
          }`}
        >
          {isWhiteTurn ? "White" : "Black"}
        </span>
      </div>

      {/* Game Timer */}
      {(whiteTime || blackTime) && (
        <div className="mb-3 space-y-1">
          <div
            className={`flex justify-between items-center px-2 py-1 rounded ${
              isWhiteTurn ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <span className="text-white font-semibold">White</span>
            <span className="text-white font-mono font-bold">
              {whiteTime || "10:00"}
            </span>
          </div>
          <div
            className={`flex justify-between items-center px-2 py-1 rounded ${
              !isWhiteTurn ? "bg-blue-600" : "bg-gray-600"
            }`}
          >
            <span className="text-gray-300 font-semibold">Black</span>
            <span className="text-gray-300 font-mono font-bold">
              {blackTime || "10:00"}
            </span>
          </div>
        </div>
      )}

      {/* Status Messages */}
      <div className="space-y-2">
        {isCheckMate && (
          <div className="bg-red-600 text-white px-3 py-2 rounded font-bold text-center animate-pulse">
            🏆{" "}
            {isWhiteTurn
              ? "Black Wins - Checkmate!"
              : "White Wins - Checkmate!"}{" "}
            🏆
          </div>
        )}

        {isStalemate && !isCheckMate && (
          <div className="bg-yellow-600 text-white px-3 py-2 rounded font-bold text-center">
            Stalemate - Draw!
          </div>
        )}

        {isInCheck && !isCheckMate && !isStalemate && (
          <div className="bg-yellow-500 text-white px-3 py-2 rounded font-bold text-center">
            {isWhiteTurn ? "White King in Check!" : "Black King in Check!"}
          </div>
        )}

        {!isInCheck && !isCheckMate && !isStalemate && (
          <div className="bg-green-600 text-white px-3 py-2 rounded text-center">
            Game in Progress
          </div>
        )}
      </div>
    </div>
  );
};

export default GameStatus;
