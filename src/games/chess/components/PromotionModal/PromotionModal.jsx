import React from "react";
import { PIECE_SYMBOLS } from "../../game/initialPosition";

/**
 * Promotion Modal Component
 *
 * Uses CSS variables from theme for easy customization
 */
const PromotionModal = ({ color, onSelect }) => {
  const promotionPieces = [
    { type: "queen", symbol: PIECE_SYMBOLS[color].queen },
    { type: "rook", symbol: PIECE_SYMBOLS[color].rook },
    { type: "bishop", symbol: PIECE_SYMBOLS[color].bishop },
    { type: "knight", symbol: PIECE_SYMBOLS[color].knight },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div
        className="rounded-2xl p-8 shadow-2xl border-2 animate-scaleIn max-w-md w-full mx-4"
        style={{
          background: `var(--card-bg)`,
          borderColor: `var(--card-border)`,
        }}
      >
        <h3
          className="text-white text-2xl font-bold mb-6 text-center"
          style={{ color: `var(--accent-primary)` }}
        >
          Promote Pawn to:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {promotionPieces.map((piece) => (
            <button
              key={piece.type}
              onClick={() => onSelect(piece.type)}
              className="text-white p-6 rounded-xl transition-all duration-200 flex flex-col items-center justify-center space-y-3 min-w-[140px] border-2 transform hover:scale-105 active:scale-95"
              style={{
                background: `var(--card-bg)`,
                borderColor: `var(--card-border)`,
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = `var(--accent-primary)`;
                e.target.style.boxShadow = `0 10px 15px -3px var(--selected-square-shadow)`;
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = `var(--card-border)`;
                e.target.style.boxShadow = `none`;
              }}
            >
              <span className="text-6xl drop-shadow-2xl">{piece.symbol}</span>
              <span className="text-base font-semibold capitalize tracking-wide">
                {piece.type}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionModal;
