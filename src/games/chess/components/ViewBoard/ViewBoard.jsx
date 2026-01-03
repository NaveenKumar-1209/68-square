import React, { useState, useEffect } from "react";
import Board from "../Board/Board";
import { findKingSquare } from "../../utils/kingPosition";
import { isKingInCheck } from "../../utils/checkDetection";
import { checkIsMate } from "../../utils/checkMate";

/**
 * View Board Component
 *
 * Displays a read-only board for viewing move history
 * Allows navigation through moves with forward/backward buttons
 *
 * Architecture:
 * - Separate from the playable board
 * - Shows position at a specific move index
 * - Provides navigation controls
 */
const ViewBoard = ({ positionHistory, moveHistory, currentMoveIndex }) => {
  const [viewIndex, setViewIndex] = useState(
    positionHistory.length > 0 ? positionHistory.length - 1 : 0
  );

  // Update view index when current move changes
  useEffect(() => {
    if (positionHistory.length > 0) {
      setViewIndex(positionHistory.length - 1);
    }
  }, [positionHistory.length]);

  const currentPosition = positionHistory[viewIndex] || positionHistory[0];
  const canGoBack = viewIndex > 0;
  const canGoForward = viewIndex < positionHistory.length - 1;

  // Determine turn for this position
  // Even indices (0, 2, 4...) are white's turn, odd are black's
  const isWhiteTurnAtPosition = viewIndex % 2 === 0;

  // Check if king is in check at this position
  const kingColor = isWhiteTurnAtPosition ? "white" : "black";
  const isInCheck = currentPosition
    ? isKingInCheck(currentPosition, kingColor)
    : false;
  const isCheckMate = currentPosition
    ? checkIsMate(currentPosition, isWhiteTurnAtPosition)
    : false;

  const kingInCheckSquare =
    (isInCheck || isCheckMate) && currentPosition
      ? findKingSquare(currentPosition, kingColor)
      : null;

  const handlePrevious = () => {
    if (canGoBack) {
      setViewIndex(viewIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      setViewIndex(viewIndex + 1);
    }
  };

  const handleFirst = () => {
    setViewIndex(0);
  };

  const handleLast = () => {
    setViewIndex(positionHistory.length - 1);
  };

  if (!currentPosition) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-400">No position to display</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
      {/* Navigation Controls */}
      <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-2">
        <button
          onClick={handleFirst}
          disabled={!canGoBack}
          className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
            canGoBack
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          title="First move"
        >
          ⏮
        </button>
        <button
          onClick={handlePrevious}
          disabled={!canGoBack}
          className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
            canGoBack
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          title="Previous move"
        >
          ⏪
        </button>
        <span className="px-4 py-1 text-white text-sm font-medium">
          Move {viewIndex} / {positionHistory.length - 1}
        </span>
        <button
          onClick={handleNext}
          disabled={!canGoForward}
          className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
            canGoForward
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          title="Next move"
        >
          ⏩
        </button>
        <button
          onClick={handleLast}
          disabled={!canGoForward}
          className={`px-3 py-1 rounded text-sm font-semibold transition-colors ${
            canGoForward
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
          title="Last move"
        >
          ⏭
        </button>
      </div>

      {/* Board Display */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <Board
            position={currentPosition}
            onSquareClick={() => {}} // No interaction on view board
            selectedSquare={null}
            highlightedSquares={[]}
            suggestedMoves={[]}
            kingInCheckSquare={kingInCheckSquare}
          />
        </div>
      </div>

      {/* Position Info */}
      <div className="text-center text-sm text-gray-300">
        {isCheckMate && (
          <div className="text-red-400 font-bold">
            {isWhiteTurnAtPosition
              ? "Black Wins - Checkmate!"
              : "White Wins - Checkmate!"}
          </div>
        )}
        {isInCheck && !isCheckMate && (
          <div className="text-yellow-400">
            {isWhiteTurnAtPosition
              ? "White King in Check"
              : "Black King in Check"}
          </div>
        )}
        {!isInCheck && !isCheckMate && (
          <div className="text-gray-400">
            {isWhiteTurnAtPosition ? "White to move" : "Black to move"}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBoard;
