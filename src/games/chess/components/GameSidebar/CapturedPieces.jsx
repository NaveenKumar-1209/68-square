import React from "react";
import Piece from "../Pieces/Pieces";

/**
 * Captured Pieces Component
 *
 * Uses CSS variables from theme for easy customization
 */
const CapturedPieces = ({ capturedPieces }) => {
  const getPieceValue = (piece) => {
    const values = {
      pawn: 1,
      knight: 3,
      bishop: 3,
      rook: 5,
      queen: 9,
    };
    return values[piece.type] || 0;
  };

  const getTotalValue = (pieces) => {
    return pieces.reduce((sum, piece) => sum + getPieceValue(piece), 0);
  };

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
        Captured Pieces
      </h3>

      <div className="space-y-4">
        {/* White Captured Pieces */}
        <div>
          <div className="flex items-center justify-between mb-2 px-2">
            <span
              className="font-semibold flex items-center gap-2"
              style={{ color: `var(--sidebar-text-primary)` }}
            >
              <div className="w-3 h-3 bg-white rounded-full"></div>
              White Captured
            </span>
            <span
              className="text-sm font-bold px-2 py-1 rounded"
              style={{
                color: `var(--accent-primary-light)`,
                backgroundColor: `rgba(6, 182, 212, 0.2)`,
              }}
            >
              {getTotalValue(capturedPieces.white)} pts
            </span>
          </div>
          <div
            className="flex flex-wrap gap-2 min-h-[50px] max-h-32 overflow-y-auto p-3 rounded-lg border custom-scrollbar"
            style={{
              backgroundColor: `rgba(15, 23, 42, 0.5)`,
              borderColor: `var(--card-border)`,
            }}
          >
            {capturedPieces.white.length === 0 ? (
              <span
                className="text-sm italic w-full text-center"
                style={{ color: `var(--sidebar-text-muted)` }}
              >
                None captured
              </span>
            ) : (
              capturedPieces.white.map((piece, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `rgba(30, 41, 59, 1)`,
                    borderColor: `var(--card-border)`,
                  }}
                >
                  <Piece piece={piece} className="text-2xl" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Black Captured Pieces */}
        <div>
          <div className="flex items-center justify-between mb-2 px-2">
            <span
              className="font-semibold flex items-center gap-2"
              style={{ color: `var(--sidebar-text-secondary)` }}
            >
              <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-600"></div>
              Black Captured
            </span>
            <span
              className="text-sm font-bold px-2 py-1 rounded"
              style={{
                color: `var(--accent-primary-light)`,
                backgroundColor: `rgba(6, 182, 212, 0.2)`,
              }}
            >
              {getTotalValue(capturedPieces.black)} pts
            </span>
          </div>
          <div
            className="flex flex-wrap gap-2 min-h-[50px] max-h-32 overflow-y-auto p-3 rounded-lg border custom-scrollbar"
            style={{
              backgroundColor: `rgba(15, 23, 42, 0.5)`,
              borderColor: `var(--card-border)`,
            }}
          >
            {capturedPieces.black.length === 0 ? (
              <span
                className="text-sm italic w-full text-center"
                style={{ color: `var(--sidebar-text-muted)` }}
              >
                None captured
              </span>
            ) : (
              capturedPieces.black.map((piece, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border hover:scale-110 transition-transform"
                  style={{
                    backgroundColor: `rgba(30, 41, 59, 1)`,
                    borderColor: `var(--card-border)`,
                  }}
                >
                  <Piece piece={piece} className="text-2xl" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapturedPieces;
