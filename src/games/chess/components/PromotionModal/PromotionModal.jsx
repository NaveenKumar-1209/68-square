import React from "react";
import { PIECE_SYMBOLS } from "../../game/initialPosition";

/**
 * Promotion Modal Component
 *
 * Displays when a pawn reaches the 8th rank
 * Allows player to choose which piece to promote to
 *
 * Architecture:
 * - Modal overlay for piece selection
 * - Shows available promotion options (queen, rook, bishop, knight)
 */
const PromotionModal = ({ color, onSelect }) => {
  const promotionPieces = [
    { type: "queen", symbol: PIECE_SYMBOLS[color].queen },
    { type: "rook", symbol: PIECE_SYMBOLS[color].rook },
    { type: "bishop", symbol: PIECE_SYMBOLS[color].bishop },
    { type: "knight", symbol: PIECE_SYMBOLS[color].knight },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 shadow-2xl">
        <h3 className="text-white text-xl font-bold mb-4 text-center">
          Promote Pawn to:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {promotionPieces.map((piece) => (
            <button
              key={piece.type}
              onClick={() => onSelect(piece.type)}
              className="bg-gray-700 hover:bg-gray-600 text-white p-4 rounded-lg transition-colors flex flex-col items-center justify-center space-y-2 min-w-[120px]"
            >
              <span className="text-5xl">{piece.symbol}</span>
              <span className="text-sm font-semibold capitalize">
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
