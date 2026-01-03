import React from "react";
import Piece from "../Pieces/Pieces";

/**
 * Captured Pieces Component
 * 
 * Displays pieces captured by each player
 * 
 * Architecture:
 * - Shows white captured pieces and black captured pieces separately
 * - Uses the Pieces component for consistent piece rendering
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
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center">Captured Pieces</h3>
      
      <div className="space-y-4">
        {/* White Captured Pieces */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">White Captured</span>
            <span className="text-gray-300 text-sm">
              {getTotalValue(capturedPieces.white)} points}
            </span>
          </div>
          <div className="flex flex-wrap gap-1 min-h-[40px] bg-gray-800 p-2 rounded">
            {capturedPieces.white.length === 0 ? (
              <span className="text-gray-500 text-sm">None</span>
            ) : (
              capturedPieces.white.map((piece, index) => (
                <div key={index} className="w-8 h-8 flex items-center justify-center">
                  <Piece piece={piece} className="text-2xl" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Black Captured Pieces */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-300 font-semibold">Black Captured</span>
            <span className="text-gray-400 text-sm">
              {getTotalValue(capturedPieces.black)} points
            </span>
          </div>
          <div className="flex flex-wrap gap-1 min-h-[40px] bg-gray-800 p-2 rounded">
            {capturedPieces.black.length === 0 ? (
              <span className="text-gray-500 text-sm">None</span>
            ) : (
              capturedPieces.black.map((piece, index) => (
                <div key={index} className="w-8 h-8 flex items-center justify-center">
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

