import React from "react";

/**
 * Move History Component
 *
 * Uses CSS variables from theme for easy customization
 */
const MoveHistory = ({ moveHistory }) => {
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
        Move History
      </h3>

      <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
        {moveHistory.length === 0 ? (
          <div
            className="text-center py-8 italic"
            style={{ color: `var(--sidebar-text-muted)` }}
          >
            No moves yet
          </div>
        ) : (
          <div className="space-y-1">
            {moveHistory.map((move, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  move.isWhiteMove ? "hover:bg-slate-700" : "hover:bg-slate-800"
                }`}
                style={{
                  backgroundColor: move.isWhiteMove
                    ? `rgba(51, 65, 85, 0.5)`
                    : `rgba(30, 41, 59, 0.5)`,
                }}
              >
                <span
                  className="font-mono"
                  style={{ color: `var(--sidebar-text-muted)` }}
                >
                  {move.moveNumber}.{move.isWhiteMove ? "" : ".."}
                </span>
                <span
                  className="font-semibold"
                  style={{
                    color: move.isCheckmate
                      ? "#f87171"
                      : move.isCheck
                      ? "#fb923c"
                      : `var(--sidebar-text-primary)`,
                  }}
                >
                  {move.notation}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveHistory;
