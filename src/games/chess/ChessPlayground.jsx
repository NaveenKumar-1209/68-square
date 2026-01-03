import React from "react";
import Board from "./components/Board/Board";
import GameSidebar from "./components/GameSidebar/GameSidebar";
import { useChessStore } from "./store/store";
import { useSuggestedMove } from "./hooks/useSuggestedMove";
import { useGameStatus } from "./hooks/useGameStatus";
import { usePositionHistory } from "./hooks/usePositionHistory";
import { useMoveExecution } from "./hooks/useMoveExecution";
import { usePieceSelection } from "./hooks/usePieceSelection";
import { useGameControls } from "./hooks/useGameControls";
import { useSquareClickHandler } from "./hooks/useSquareClickHandler";
import { INITIAL_POSITION } from "./game/initialPosition";
import { findKingSquare } from "./utils/kingPosition";
import ViewBoard from "./components/ViewBoard/ViewBoard";
import PromotionModal from "./components/PromotionModal/PromotionModal";
import { useGameTimer } from "./hooks/useGameTimer";

/**
 * Chess Playground Component
 * Main chess game component
 *
 * Architecture:
 * - Self-contained chess game with its own store and components
 * - Uses custom hooks for modular logic separation
 * - Handles piece selection and movement
 * - Tracks move history, captured pieces, and game state
 * - Provides undo/redo functionality
 * - Displays board and game sidebar with status information
 */
const ChessPlayground = () => {
  // Store state and actions
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
    castlingRights,
    enPassantTarget,
    lastMove,
    promotionPending,
    setCastlingRights,
    setEnPassantTarget,
    setLastMove,
    setPromotionPending,
    resetGame,
  } = useChessStore();

  // Custom hooks
  const { calculateSuggestedMoves } = useSuggestedMove();

  // Game timer
  const { whiteTime, blackTime, resetTimer } = useGameTimer(
    isWhiteTurn,
    isCheckMate,
    isStalemate,
    true
  );

  const { isUndoingRef } = usePositionHistory(
    position,
    moveStack,
    setMoveStack
  );

  useGameStatus(
    position,
    isWhiteTurn,
    setIsInCheck,
    setIsCheckMate,
    setIsStalemate
  );

  const { selectPiece, clearSelection } = usePieceSelection({
    setSelectedSquare,
    setMovingPiece,
    setHighlightedSquares,
    calculateSuggestedMoves,
  });

  const { executeMove } = useMoveExecution({
    position,
    movingPiece,
    isWhiteTurn,
    capturedPieces,
    moveHistory,
    castlingRights,
    enPassantTarget,
    setPosition,
    setIsWhiteTurn,
    setCapturedPieces,
    setMoveHistory,
    setIsCheckMate,
    setCastlingRights,
    setEnPassantTarget,
    setLastMove,
    setPromotionPending,
    clearSelection,
  });

  const { handleUndo, handleRedo, handleNewGame, currentMoveIndex } =
    useGameControls({
      moveStack,
      isWhiteTurn,
      moveHistory,
      isUndoingRef,
      setPosition,
      setMoveStack,
      setIsWhiteTurn,
      setMoveHistory,
      setCapturedPieces,
      resetGame,
      clearSelection,
    });

  const { handleSquareClick } = useSquareClickHandler({
    position,
    isWhiteTurn,
    selectedSquare,
    movingPiece,
    suggestedMoves,
    isCheckMate,
    isStalemate,
    castlingRights,
    enPassantTarget,
    selectPiece,
    clearSelection,
    executeMove,
  });

  // Find the king's square when in check or checkmate for visual highlighting
  const kingInCheckSquare =
    isInCheck || isCheckMate
      ? findKingSquare(position, isWhiteTurn ? "white" : "black")
      : null;

  return (
    <div className="h-full overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Left: Playable Board Section */}
      <div className="h-full flex flex-1 w-full items-center justify-center relative">
        <div
          className={`w-full h-full ${
            isCheckMate ? "pointer-events-none opacity-75" : ""
          }`}
        >
          <Board
            position={position}
            onSquareClick={handleSquareClick}
            selectedSquare={selectedSquare}
            highlightedSquares={highlightedSquares}
            suggestedMoves={suggestedMoves}
            kingInCheckSquare={kingInCheckSquare}
            lastMove={lastMove}
          />
        </div>
        {/* Game Over Overlay */}
        {isCheckMate && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 rounded-lg">
            <div className="bg-red-600 text-white px-8 py-6 rounded-lg shadow-2xl text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-2xl font-bold">
                {isWhiteTurn ? "Black Wins!" : "White Wins!"}
              </div>
              <div className="text-lg mt-2">Checkmate!</div>
              <div className="text-sm mt-3 text-red-200">
                No further moves allowed
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Promotion Modal */}
      {promotionPending && (
        <PromotionModal
          color={promotionPending.color}
          onSelect={(pieceType) => {
            const { rank, file } = promotionPending;
            const newBoard = position.map((row) => [...row]);
            newBoard[rank][file] = {
              type: pieceType,
              color: promotionPending.color,
            };
            setPosition(newBoard);
            setPromotionPending(null);
            setIsWhiteTurn(!isWhiteTurn);
            clearSelection();
          }}
        />
      )}

      {/* Center: View Board Section */}
      {/* <div className="h-full flex flex-1 w-full items-center justify-center p-2">
        <div className="w-full h-full flex flex-col">
          <div className="text-center mb-2 text-white font-semibold text-sm">
            Move History Viewer
          </div>
          <div className="flex-1">
            <ViewBoard
              positionHistory={
                moveStack.length > 0 ? moveStack : [INITIAL_POSITION]
              }
              moveHistory={moveHistory}
              currentMoveIndex={currentMoveIndex}
            />
          </div>
        </div>
      </div> */}

      {/* Right: Game Sidebar */}
      <div className="flex-shrink-0 w-full lg:w-80 h-full flex items-start justify-center p-2">
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
          whiteTime={whiteTime}
          blackTime={blackTime}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onNewGame={() => {
            handleNewGame();
            resetTimer();
          }}
        />
      </div>
    </div>
  );
};

export default ChessPlayground;
