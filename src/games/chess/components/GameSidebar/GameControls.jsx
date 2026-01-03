import React from "react";

/**
 * Game Controls Component
 * 
 * Provides game control buttons:
 * - Undo move
 * - Redo move
 * - New game
 */
const GameControls = ({ onUndo, onRedo, onNewGame, canUndo, canRedo }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center">Controls</h3>
      
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            canUndo
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Undo
        </button>
        
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`px-4 py-2 rounded font-semibold transition-colors ${
            canRedo
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Redo
        </button>
        
        <button
          onClick={onNewGame}
          className="px-4 py-2 rounded font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default GameControls;

