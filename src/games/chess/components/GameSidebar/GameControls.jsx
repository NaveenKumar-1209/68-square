import React from "react";

/**
 * Game Controls Component
 *
 * Uses CSS variables from theme for easy customization
 */
const GameControls = ({ onUndo, onRedo, onNewGame, canUndo, canRedo }) => {
  return (
    <div
      className="chess-card rounded-xl p-4 shadow-lg border"
      style={{
        background: `var(--card-bg)`,
        borderColor: `var(--card-border)`,
      }}
    >
      <h3
        className="text-xl font-bold mb-4 text-center"
        style={{ color: `var(--accent-primary)` }}
      >
        Controls
      </h3>

      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform ${
            canUndo
              ? "text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              : "cursor-not-allowed border"
          }`}
          style={
            canUndo
              ? {
                  background: `var(--btn-primary)`,
                }
              : {
                  background: `var(--btn-disabled-bg)`,
                  color: `var(--btn-disabled-text)`,
                  borderColor: `var(--card-border)`,
                }
          }
          onMouseEnter={(e) => {
            if (canUndo) {
              e.target.style.background = `var(--btn-primary-hover)`;
            }
          }}
          onMouseLeave={(e) => {
            if (canUndo) {
              e.target.style.background = `var(--btn-primary)`;
            }
          }}
        >
          ↶ Undo
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`px-4 py-3 rounded-lg font-semibold transition-all duration-200 transform ${
            canRedo
              ? "text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
              : "cursor-not-allowed border"
          }`}
          style={
            canRedo
              ? {
                  background: `var(--btn-primary)`,
                }
              : {
                  background: `var(--btn-disabled-bg)`,
                  color: `var(--btn-disabled-text)`,
                  borderColor: `var(--card-border)`,
                }
          }
          onMouseEnter={(e) => {
            if (canRedo) {
              e.target.style.background = `var(--btn-primary-hover)`;
            }
          }}
          onMouseLeave={(e) => {
            if (canRedo) {
              e.target.style.background = `var(--btn-primary)`;
            }
          }}
        >
          ↷ Redo
        </button>

        <button
          onClick={onNewGame}
          className="px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transform"
          style={{
            background: `var(--btn-success)`,
          }}
          onMouseEnter={(e) => {
            e.target.style.background = `var(--btn-success-hover)`;
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `var(--btn-success)`;
          }}
        >
          🎮 New
        </button>
      </div>
    </div>
  );
};

export default GameControls;
