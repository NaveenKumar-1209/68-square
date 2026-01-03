import React, { useEffect, useRef } from "react";
import Board from "./components/Board/Board";
import GameSidebar from "./components/GameSidebar/GameSidebar";
import { useChessStore } from "./store/store";
import { useSuggestedMove } from "./hooks/useSuggestedMove";
import { getRankFile } from "./utils/conversion";
import { checkIsMate } from "./utils/checkMate";
import { isKingInCheck } from "./utils/checkDetection";
import { isStalemate as checkIsStalemate } from "./utils/stalemate";
import { getMoveNotation } from "./utils/moveNotation";
import { INITIAL_POSITION } from "./game/initialPosition";

/**
 * Chess Playground Component
 * Main chess game component
 *
 * Architecture:
 * - Self-contained chess game with its own store and components
 * - Handles piece selection and movement
 * - Tracks move history, captured pieces, and game state
 * - Provides undo/redo functionality
 * - Displays board and game sidebar with status information
 */

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
    setIsCheckMate,
    isCheckMate,
    setIsInCheck,
    isInCheck,
    setIsStalemate,
    isStalemate,
    setCapturedPieces,
    capturedPieces,
    setMoveHistory,
    moveHistory,
    setMoveStack,
    moveStack,
    positionHistory,
    resetGame,
  } = useChessStore();
  const { calculateSuggestedMoves } = useSuggestedMove();

  // Initialize position history on mount
  useEffect(() => {
    if (moveStack.length === 0) {
      setMoveStack([JSON.parse(JSON.stringify(INITIAL_POSITION))]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update position history for undo/redo when position changes (but not from undo)
  const positionRef = useRef(JSON.stringify(position));
  const isUndoingRef = useRef(false);
  const isInitialMount = useRef(true);
  const moveStackRef = useRef(moveStack);

  // Keep moveStackRef in sync with moveStack
  useEffect(() => {
    moveStackRef.current = moveStack;
  }, [moveStack]);

  useEffect(() => {
    // Skip on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      positionRef.current = JSON.stringify(position);
      return;
    }

    // Skip if this is from an undo operation
    if (isUndoingRef.current) {
      isUndoingRef.current = false;
      positionRef.current = JSON.stringify(position);
      return;
    }

    // Only update if position actually changed
    const currentPositionStr = JSON.stringify(position);
    if (positionRef.current !== currentPositionStr) {
      const currentHistory =
        moveStackRef.current.length > 0
          ? moveStackRef.current
          : [INITIAL_POSITION];
      const newHistory = [
        ...currentHistory,
        JSON.parse(JSON.stringify(position)),
      ];
      setMoveStack(newHistory);
      positionRef.current = currentPositionStr;
    }
  }, [position, setMoveStack]);

  // Check game status after position or turn changes
  useEffect(() => {
    const currentPlayerColor = isWhiteTurn ? "white" : "black";

    // Check if current player is in check
    const currentInCheck = isKingInCheck(position, currentPlayerColor);
    setIsInCheck(currentInCheck);

    // Check if opponent is in checkmate
    const opponentCheckMate = checkIsMate(position, !isWhiteTurn);
    setIsCheckMate(opponentCheckMate);

    // Check if current player is in stalemate
    const currentStalemate = checkIsStalemate(position, isWhiteTurn);
    setIsStalemate(currentStalemate);
    // Note: Action setters are stable and don't need to be in dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position, isWhiteTurn]);

  // Helper function to execute a move
  const executeMove = (squareId, rank, file) => {
    // Deep copy the board properly
    const newBoard = position.map((row) => [...row]);

    // Track captured piece
    const capturedPiece = newBoard[rank][file];
    const newCapturedPieces = { ...capturedPieces };

    // Move the piece
    newBoard[rank][file] = movingPiece;
    newBoard[movingPiece.rank][movingPiece.file] = null;

    // Update captured pieces if a piece was captured
    if (capturedPiece) {
      const capturedColor = capturedPiece.color;
      newCapturedPieces[capturedColor] = [
        ...newCapturedPieces[capturedColor],
        capturedPiece,
      ];
      setCapturedPieces(newCapturedPieces);
    }

    // Create move notation
    const moveNotation = getMoveNotation(
      {
        piece: movingPiece,
        fromRank: movingPiece.rank,
        fromFile: movingPiece.file,
        toRank: rank,
        toFile: file,
      },
      position,
      !!capturedPiece,
      false, // Will be updated after move
      false // Will be updated after move
    );

    // Update the board position
    setPosition(newBoard);

    // Switch turns
    const newTurn = !isWhiteTurn;
    setIsWhiteTurn(newTurn);

    // Check game status after move
    const opponentColor = newTurn ? "white" : "black";
    const opponentInCheck = isKingInCheck(newBoard, opponentColor);
    const opponentCheckMate = checkIsMate(newBoard, newTurn);
    const currentStalemate = checkIsStalemate(newBoard, newTurn);

    // Update move history
    const moveNumber = Math.floor(moveHistory.length / 2) + 1;
    const isWhiteMove = !isWhiteTurn; // The move that was just made
    const updatedNotation = opponentCheckMate
      ? moveNotation.replace(/\+?$/, "#")
      : opponentInCheck
      ? moveNotation.replace(/#?$/, "+")
      : moveNotation;

    const newMoveHistory = [
      ...moveHistory,
      {
        moveNumber,
        notation: updatedNotation,
        isWhiteMove,
        isCheck: opponentInCheck,
        isCheckmate: opponentCheckMate,
      },
    ];
    setMoveHistory(newMoveHistory);

    clearSelection();
  };

  // Helper function to select a piece
  const selectPiece = (squareId, rank, file, piece) => {
    setSelectedSquare(squareId);
    setMovingPiece({ ...piece, rank, file });
    calculateSuggestedMoves(squareId);
    setHighlightedSquares([]);
  };

  // Helper function to clear selection
  const clearSelection = () => {
    setSelectedSquare(null);
    setMovingPiece(null);
    setHighlightedSquares([]);
    calculateSuggestedMoves();
  };

  // Undo functionality
  const handleUndo = () => {
    const currentHistory =
      moveStack.length > 0 ? moveStack : [INITIAL_POSITION];
    if (currentHistory.length > 1) {
      isUndoingRef.current = true;
      const newHistory = currentHistory.slice(0, -1);
      const previousPosition = newHistory[newHistory.length - 1];
      setPosition(previousPosition);
      setMoveStack(newHistory);

      // Update turn (go back one move)
      setIsWhiteTurn(!isWhiteTurn);

      // Remove last move from history
      if (moveHistory.length > 0) {
        setMoveHistory(moveHistory.slice(0, -1));
      }

      clearSelection();
    }
  };

  // Redo functionality
  const handleRedo = () => {
    // This would require storing future positions, which is more complex
    // For now, we'll keep it simple and disable redo after new moves
    // A full implementation would require a separate redo stack
  };

  // New game functionality
  const handleNewGame = () => {
    resetGame();
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    clearSelection();
  };

  const handleSquareClick = (squareId) => {
    // Don't allow moves if game is over
    if (isCheckMate || isStalemate) {
      return;
    }

    const { rank, file } = getRankFile(squareId);
    const clickedPiece = position[rank][file];

    // CASE 1: Attempting to move a previously selected piece
    if (
      movingPiece &&
      suggestedMoves?.includes(squareId) &&
      clickedPiece?.color !== movingPiece.color
    ) {
      executeMove(squareId, rank, file);
      return;
    }

    // CASE 2: Clicking the same square (deselect)
    if (selectedSquare === squareId) {
      clearSelection();
      return;
    }

    // CASE 3: Selecting a piece of the current player's color
    if (
      clickedPiece &&
      clickedPiece.color === (isWhiteTurn ? "white" : "black")
    ) {
      selectPiece(squareId, rank, file, clickedPiece);
      return;
    }

    // CASE 4: Invalid selection (empty square or opponent's piece)
    clearSelection();
  };

  const currentMoveIndex =
    (moveStack.length > 0 ? moveStack : [INITIAL_POSITION]).length - 1;

  return (
    <div className="h-full overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Board Section */}
      <div className="h-full flex flex-1 w-full items-center justify-center p-4">
        <Board
          position={position}
          onSquareClick={handleSquareClick}
          selectedSquare={selectedSquare}
          highlightedSquares={highlightedSquares}
          suggestedMoves={suggestedMoves}
        />
      </div>

      {/* Game Sidebar */}
      <div className="flex-shrink-0 w-full lg:w-auto h-full flex items-start justify-center">
        <GameSidebar
          moveHistory={moveHistory}
          capturedPieces={capturedPieces}
          isWhiteTurn={isWhiteTurn}
          isInCheck={isInCheck}
          isCheckMate={isCheckMate}
          isStalemate={isStalemate}
          positionHistory={
            moveStack.length > 0 ? moveStack : [INITIAL_POSITION]
          }
          currentMoveIndex={currentMoveIndex}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onNewGame={handleNewGame}
        />
      </div>
    </div>
  );
};

export default ChessPlayground;
