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

  // Helper function to execute a move
  const executeMove = (squareId, rank, file) => {
    // Deep copy the board properly
    const newBoard = position.map(row => [...row]);

    newBoard[rank][file] = movingPiece;
    newBoard[movingPiece.rank][movingPiece.file] = null;

    setPosition(newBoard);
    setIsWhiteTurn(!isWhiteTurn);
    clearSelection();
  };

  // Helper function to select a piece
  const selectPiece = (squareId, rank, file, piece) => {
    setSelectedSquare(squareId);
    setMovingPiece({ ...piece, rank, file });
    calculateSuggestedMoves(squareId);
    setHighlightedSquares([]); // Or set to suggested moves if needed
  };

  // Helper function to clear selection
  const clearSelection = () => {
    setSelectedSquare(null);
    setMovingPiece(null);
    setHighlightedSquares([]);
    calculateSuggestedMoves(); // Clear suggested moves
  };

  const handleSquareClick = (squareId) => {
    const { rank, file } = getRankFile(squareId);
    const clickedPiece = position[rank][file];

    // CASE 1: Attempting to move a previously selected piece
    if (movingPiece && suggestedMoves?.includes(squareId) && clickedPiece?.color !== movingPiece.color) {
      executeMove(squareId, rank, file);
      return;
    }

    // CASE 2: Clicking the same square (deselect)
    if (selectedSquare === squareId) {
      clearSelection();
      return;
    }

    // CASE 3: Selecting a piece of the current player's color
    if (clickedPiece && clickedPiece.color === (isWhiteTurn ? "white" : "black")) {
      selectPiece(squareId, rank, file, clickedPiece);
      return;
    }

    // CASE 4: Invalid selection (empty square or opponent's piece)
    clearSelection();
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
