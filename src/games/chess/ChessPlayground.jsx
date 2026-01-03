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
import GameModeSelector from "./components/GameModeSelector/GameModeSelector";
import { useBotMove } from "./hooks/useBotMove";

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
    gameMode,
    botColor,
    setCastlingRights,
    setEnPassantTarget,
    setLastMove,
    setPromotionPending,
    setGameMode,
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
    gameMode,
    botColor,
    selectPiece,
    clearSelection,
    executeMove,
  });

  // Bot move hook - automatically makes bot moves in one-player mode
  useBotMove({
    gameMode,
    botColor,
    position,
    isWhiteTurn,
    isCheckMate,
    isStalemate,
    promotionPending,
    castlingRights,
    enPassantTarget,
    executeMove,
    setPromotionPending,
    setPosition,
    setIsWhiteTurn,
    clearSelection,
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
        {(isCheckMate || isStalemate) && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-10 py-8 rounded-2xl shadow-2xl text-center border-2 border-gray-700 animate-scaleIn max-w-md mx-4">
              <div className="text-6xl mb-4 animate-bounce">🏆</div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {isCheckMate
                  ? isWhiteTurn
                    ? "Black Wins!"
                    : "White Wins!"
                  : "Stalemate!"}
              </div>
              <div className="text-xl mt-2 text-gray-300">
                {isCheckMate ? "Checkmate!" : "Draw!"}
              </div>
              <div className="text-sm mt-4 text-gray-400">
                {isCheckMate
                  ? "No further moves allowed"
                  : "No legal moves available"}
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
      <div className="flex-shrink-0 w-full lg:w-80 h-full flex flex-col p-2">
        <div className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
          {/* Game Mode Selector */}
          <div className="mb-4">
            <GameModeSelector
              gameMode={gameMode}
              botColor={botColor}
              onModeChange={(mode) => {
                setGameMode(mode, botColor);
                if (mode === "two-player") {
                  // Reset game when switching modes
                  handleNewGame();
                  resetTimer();
                }
              }}
              onBotColorChange={(color) => {
                setGameMode(gameMode, color);
                // Reset game when changing bot color
                handleNewGame();
                resetTimer();
              }}
            />
          </div>

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
    </div>
  );
};

export default ChessPlayground;
