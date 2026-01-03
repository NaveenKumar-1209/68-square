import React from "react";

/**
 * Move History Component
 *
 * Enhanced with:
 * - Modern card design
 * - Better typography
 * - Scrollable list
 */
const MoveHistory = ({ moveHistory }) => {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-4 shadow-lg border border-gray-600">
      <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Move History
      </h3>

      <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar">
        {moveHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8 italic">
            No moves yet
          </div>
        ) : (
          <div className="space-y-1">
            {moveHistory.map((move, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  move.isWhiteMove
                    ? "bg-gray-700/50 hover:bg-gray-700"
                    : "bg-gray-800/50 hover:bg-gray-800"
                }`}
              >
                <span className="text-gray-400 font-mono">
                  {move.moveNumber}.{move.isWhiteMove ? "" : ".."}
                </span>
                <span
                  className={`font-semibold ${
                    move.isCheckmate
                      ? "text-red-400"
                      : move.isCheck
                      ? "text-yellow-400"
                      : "text-white"
                  }`}
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
