import React from "react";

/**
 * Game Status Component
 *
 * Displays current game status:
 * - Current player's turn
 * - Check indicator
 * - Checkmate indicator
 * - Stalemate indicator
 */
const GameStatus = ({ isWhiteTurn, isInCheck, isCheckMate, isStalemate }) => {
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
