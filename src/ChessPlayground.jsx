import React from "react";
import Board from "./components/Board/Board";
import { useStore } from "./store/store";

const ChessPlayground = () => {
  const {
    position,
    selectedSquare,
    highlightedSquares,
    setSelectedSquare,
    setHighlightedSquares,
  } = useStore();

  const handleSquareClick = (squareId) => {
    setSelectedSquare(squareId);
    setHighlightedSquares([]);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Chess Game
        </h1>
        <Board
          position={position}
          onSquareClick={handleSquareClick}
          selectedSquare={selectedSquare}
          highlightedSquares={highlightedSquares}
        />
      </div>
    </div>
  );
};

export default ChessPlayground;
