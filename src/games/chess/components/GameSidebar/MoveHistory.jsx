import React from "react";

/**
 * Move History Component
 * 
 * Displays the move history in algebraic notation
 * 
 * Architecture:
 * - Scrollable list of moves
 * - Shows move numbers and notation
 * - Highlights current position if viewing history
 */
const MoveHistory = ({ moveHistory }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3 text-center">Move History</h3>
      
      <div className="bg-gray-800 rounded p-3 max-h-64 overflow-y-auto">
        {moveHistory.length === 0 ? (
          <div className="text-gray-500 text-center text-sm">No moves yet</div>
        ) : (
          <div className="space-y-1">
            {moveHistory.map((move, index) => (
              <div
                key={index}
                className="text-sm py-1 px-2 hover:bg-gray-700 rounded transition-colors"
              >
                <span className="text-gray-400">{move.moveNumber}.</span>{" "}
                <span className="text-white">{move.notation}</span>
                {move.isCheck && <span className="text-yellow-400 ml-1">+</span>}
                {move.isCheckmate && <span className="text-red-400 ml-1">#</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveHistory;

