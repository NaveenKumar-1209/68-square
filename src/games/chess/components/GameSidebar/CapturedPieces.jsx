import React from "react";
import Piece from "../Pieces/Pieces";

/**
 * Captured Pieces Component
 *
 * Enhanced with:
 * - Modern card design
 * - Better visual hierarchy
 * - Smooth animations
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 shadow-lg border border-gray-600">
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Captured Pieces
      </h3>

      <div className="space-y-4">
        {/* White Captured Pieces */}
        <div>
          <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-white font-semibold flex items-center gap-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              White Captured
            </span>
            <span className="text-blue-300 text-sm font-bold bg-blue-900/30 px-2 py-1 rounded">
              {getTotalValue(capturedPieces.white)} pts
            </span>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[50px] max-h-32 overflow-y-auto bg-gray-900/50 p-3 rounded-lg border border-gray-600 custom-scrollbar">
            {capturedPieces.white.length === 0 ? (
              <span className="text-gray-500 text-sm italic w-full text-center">
                None captured
              </span>
            ) : (
              capturedPieces.white.map((piece, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-700 hover:scale-110 transition-transform"
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
            <span className="text-gray-300 font-semibold flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-900 rounded-full border border-gray-600"></div>
              Black Captured
            </span>
            <span className="text-blue-300 text-sm font-bold bg-blue-900/30 px-2 py-1 rounded">
              {getTotalValue(capturedPieces.black)} pts
            </span>
          </div>
          <div className="flex flex-wrap gap-2 min-h-[50px] max-h-32 overflow-y-auto bg-gray-900/50 p-3 rounded-lg border border-gray-600 custom-scrollbar">
            {capturedPieces.black.length === 0 ? (
              <span className="text-gray-500 text-sm italic w-full text-center">
                None captured
              </span>
            ) : (
              capturedPieces.black.map((piece, index) => (
                <div
                  key={index}
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-lg border border-gray-700 hover:scale-110 transition-transform"
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
