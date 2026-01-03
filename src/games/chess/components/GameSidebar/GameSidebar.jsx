import React from "react";
import MoveHistory from "./MoveHistory";
import CapturedPieces from "./CapturedPieces";
import GameControls from "./GameControls";
import GameStatus from "./GameStatus";

/**
 * Game Sidebar Component
 *
 * Uses CSS variables from theme for easy customization
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
    <div
      className="chess-sidebar w-full text-white rounded-2xl shadow-2xl p-4 space-y-4 border"
      style={{
        background: `var(--sidebar-bg)`,
        borderColor: `var(--sidebar-border)`,
      }}
    >
      {/* Game Status */}
      <div className="flex-shrink-0">
        <GameStatus
          isWhiteTurn={isWhiteTurn}
          isInCheck={isInCheck}
          isCheckMate={isCheckMate}
          isStalemate={isStalemate}
          whiteTime={whiteTime}
          blackTime={blackTime}
        />
      </div>

      {/* Game Controls */}
      <div className="flex-shrink-0">
        <GameControls
          onUndo={onUndo}
          onRedo={onRedo}
          onNewGame={onNewGame}
          canUndo={currentMoveIndex > 0}
          canRedo={currentMoveIndex < positionHistory.length - 1}
        />
      </div>

      {/* Captured Pieces */}
      <div className="flex-shrink-0">
        <CapturedPieces capturedPieces={capturedPieces} />
      </div>

      {/* Move History */}
      <div className="flex-shrink-0">
        <MoveHistory moveHistory={moveHistory} />
      </div>
    </div>
  );
};

export default GameSidebar;
