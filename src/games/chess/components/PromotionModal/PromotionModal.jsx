import React from "react";
import { PIECE_SYMBOLS } from "../../game/initialPosition";

/**
 * Promotion Modal Component
 *
 * Enhanced with:
 * - Modern glassmorphism design
 * - Better animations
 * - Elegant hover effects
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
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border-2 border-gray-700 animate-scaleIn max-w-md w-full mx-4">
        <h3 className="text-white text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Promote Pawn to:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {promotionPieces.map((piece) => (
            <button
              key={piece.type}
              onClick={() => onSelect(piece.type)}
              className="bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white p-6 rounded-xl transition-all duration-200 flex flex-col items-center justify-center space-y-3 min-w-[140px] border-2 border-gray-600 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 active:scale-95"
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
