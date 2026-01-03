import React from "react";
import MoveHistory from "./MoveHistory";
import CapturedPieces from "./CapturedPieces";
import GameControls from "./GameControls";
import GameStatus from "./GameStatus";

/**
 * Game Sidebar Component
 *
 * Displays game information and controls:
 * - Move history
 * - Captured pieces
 * - Game status
 * - Game controls (undo, redo, new game)
 *
 * Architecture:
 * - Composed of smaller specialized components
 * - Responsive layout that works on different screen sizes
 */
const GameSidebar = ({
  moveHistory,
  capturedPieces,
  isWhiteTurn,
  isInCheck,
  isCheckMate,
  isStalemate,
  positionHistory,
  currentMoveIndex,
  whiteTime,
  blackTime,
  onUndo,
  onRedo,
  onNewGame,
}) => {
  return (
    <div className="w-full md:w-80 lg:w-96 bg-gray-800 text-white rounded-lg shadow-xl p-4 space-y-4 overflow-y-auto h-full">
      {/* Game Status */}
      <GameStatus
        isWhiteTurn={isWhiteTurn}
        isInCheck={isInCheck}
        isCheckMate={isCheckMate}
        isStalemate={isStalemate}
        whiteTime={whiteTime}
        blackTime={blackTime}
      />

      {/* Game Controls */}
      <GameControls
        onUndo={onUndo}
        onRedo={onRedo}
        onNewGame={onNewGame}
        canUndo={currentMoveIndex > 0}
        canRedo={currentMoveIndex < positionHistory.length - 1}
      />

      {/* Captured Pieces */}
      <CapturedPieces capturedPieces={capturedPieces} />

      {/* Move History */}
      <MoveHistory moveHistory={moveHistory} />
    </div>
  );
};

export default GameSidebar;
