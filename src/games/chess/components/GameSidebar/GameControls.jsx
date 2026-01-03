import React from "react";

/**
 * Game Controls Component
 *
 * Enhanced with:
 * - Modern button design with gradients
 * - Better hover effects
 * - Icons for visual clarity
 * - Smooth transitions
 */
const GameControls = ({ onUndo, onRedo, onNewGame, canUndo, canRedo }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 shadow-lg border border-gray-600">
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Controls
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform ${
            canUndo
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              : "bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600"
          }`}
        >
          ↶ Undo
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform ${
            canRedo
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              : "bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600"
          }`}
        >
          ↷ Redo
        </button>

        <button
          onClick={onNewGame}
          className="px-4 py-3 rounded-lg font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform"
        >
          🎮 New
        </button>
      </div>
    </div>
  );
};

export default GameControls;
