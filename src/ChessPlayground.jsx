import React from "react";
import Board from "./components/Board/Board";
import { useStore } from "./store/store";
import { useSuggestedMove } from "./hooks/useSuggestedMove";
import { getRankFile } from "./utils/conversion";

const ChessPlayground = () => {
  const {
    position,
    selectedSquare,
    highlightedSquares,
    setSelectedSquare,
    setHighlightedSquares,
    suggestedMoves,
    isWhiteTurn,
    setMovingPiece,
    movingPiece,
    setPosition,
    setIsWhiteTurn,
  } = useStore();
  const { calculateSuggestedMoves } = useSuggestedMove();

  const handleSquareClick = (squareId) => {
    setSelectedSquare(squareId);
    setHighlightedSquares([]);
    calculateSuggestedMoves(squareId);
    const { rank, file } = getRankFile(squareId);
    if (position[rank][file]) {
      if (position[rank][file].color === (isWhiteTurn ? "white" : "black")) {
        setMovingPiece({
          ...position[rank][file],
          rank,
          file,
        });
      }
    }

    if (movingPiece && suggestedMoves?.includes(squareId)) {
      const { rank, file } = getRankFile(squareId);
      const newBoard = [...position];
      newBoard[rank][file] = movingPiece;
      newBoard[movingPiece.rank][movingPiece.file] = null;
      setPosition(newBoard);
      setMovingPiece(null);
      setSelectedSquare(null);
      setHighlightedSquares([]);
      calculateSuggestedMoves();
      setIsWhiteTurn(!isWhiteTurn);
    }
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
          suggestedMoves={suggestedMoves}
        />
      </div>
    </div>
  );
};

export default ChessPlayground;
