import React from "react";

/**
 * Game Status Component
 *
 * Uses CSS variables from theme for easy customization
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
        Game Status
      </h3>

      {/* Current Turn */}
      <div 
        className="mb-3 p-3 rounded-lg border"
        style={{
          backgroundColor: `rgba(51, 65, 85, 0.5)`,
          borderColor: `var(--card-border)`,
        }}
      >
        <div className="flex items-center justify-between">
          <span style={{ color: `var(--sidebar-text-secondary)` }} className="font-semibold">
            Current Turn:
          </span>
          <div className="flex items-center gap-2">
            <div
              className={`w-4 h-4 rounded-full transition-all ${
                isWhiteTurn ? "bg-white shadow-lg shadow-white/50" : "bg-slate-500"
              }`}
            ></div>
            <span
              className={`font-bold text-lg transition-colors ${
                isWhiteTurn ? "text-white" : "text-slate-400"
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
              isWhiteTurn ? "border-2" : "border"
            }`}
            style={{
              background: isWhiteTurn ? `var(--btn-primary)` : `rgba(51, 65, 85, 0.5)`,
              borderColor: isWhiteTurn ? `var(--accent-primary-light)` : `var(--card-border)`,
              boxShadow: isWhiteTurn ? `0 10px 15px -3px var(--selected-square-shadow)` : 'none',
            }}
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
              !isWhiteTurn ? "border-2" : "border"
            }`}
            style={{
              background: !isWhiteTurn ? `var(--btn-primary)` : `rgba(51, 65, 85, 0.5)`,
              borderColor: !isWhiteTurn ? `var(--accent-primary-light)` : `var(--card-border)`,
              boxShadow: !isWhiteTurn ? `0 10px 15px -3px var(--selected-square-shadow)` : 'none',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-600"></div>
              <span style={{ color: `var(--sidebar-text-secondary)` }} className="font-semibold">
                Black
              </span>
            </div>
            <span style={{ color: `var(--sidebar-text-secondary)` }} className="font-mono font-bold text-lg">
              {blackTime || "10:00"}
            </span>
          </div>
        </div>
      )}

      {/* Status Messages */}
      <div className="space-y-2">
        {isCheckMate && (
          <div 
            className="text-white px-4 py-3 rounded-lg font-bold text-center animate-pulse shadow-lg border-2"
            style={{
              background: `var(--status-checkmate)`,
              borderColor: `var(--status-checkmate-border)`,
            }}
          >
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
          <div 
            className="text-white px-4 py-3 rounded-lg font-bold text-center shadow-lg border-2"
            style={{
              background: `var(--status-stalemate)`,
              borderColor: `var(--status-stalemate-border)`,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">🤝</span>
              <span>Stalemate - Draw!</span>
            </div>
          </div>
        )}

        {isInCheck && !isCheckMate && !isStalemate && (
          <div 
            className="text-white px-4 py-3 rounded-lg font-bold text-center shadow-lg border-2 animate-pulse"
            style={{
              background: `var(--status-check)`,
              borderColor: `var(--status-check-border)`,
            }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">⚠️</span>
              <span>
                {isWhiteTurn ? "White King in Check!" : "Black King in Check!"}
              </span>
            </div>
          </div>
        )}

        {!isInCheck && !isCheckMate && !isStalemate && (
          <div 
            className="text-white px-4 py-3 rounded-lg text-center shadow-lg border-2"
            style={{
              background: `var(--status-progress)`,
              borderColor: `var(--status-progress-border)`,
            }}
          >
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
