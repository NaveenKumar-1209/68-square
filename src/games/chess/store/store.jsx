import { createContext, useContext, useReducer } from "react";
import { chessReducer, initialState } from "./chessReducer";
import {
  setPosition,
  setSelectedSquare,
  setHighlightedSquares,
  setSuggestedMoves,
  setMovingPiece,
  setIsWhiteTurn,
  setIsCheckMate,
  setIsInCheck,
  setIsStalemate,
  setCapturedPieces,
  setMoveHistory,
  setMoveStack,
  setCastlingRights,
  setEnPassantTarget,
  setLastMove,
  setPromotionPending,
  setGameMode,
  resetGame,
} from "./chessActions";

const chessStoreContext = createContext();

export const ChessStoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(chessReducer, initialState);

  const actions = {
    setPosition: setPosition(dispatch),
    setSelectedSquare: setSelectedSquare(dispatch),
    setHighlightedSquares: setHighlightedSquares(dispatch),
    setSuggestedMoves: setSuggestedMoves(dispatch),
    setMovingPiece: setMovingPiece(dispatch),
    setIsWhiteTurn: setIsWhiteTurn(dispatch),
    setIsCheckMate: setIsCheckMate(dispatch),
    setIsInCheck: setIsInCheck(dispatch),
    setIsStalemate: setIsStalemate(dispatch),
    setCapturedPieces: setCapturedPieces(dispatch),
    setMoveHistory: setMoveHistory(dispatch),
    setMoveStack: setMoveStack(dispatch),
    setCastlingRights: setCastlingRights(dispatch),
    setEnPassantTarget: setEnPassantTarget(dispatch),
    setLastMove: setLastMove(dispatch),
    setPromotionPending: setPromotionPending(dispatch),
    setGameMode: setGameMode(dispatch),
    resetGame: resetGame(dispatch),
  };

  const value = {
    ...store,
    ...actions,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("chess store", store);
  }

  return (
    <chessStoreContext.Provider value={value}>
      {children}
    </chessStoreContext.Provider>
  );
};

export const useChessStore = () => {
  const context = useContext(chessStoreContext);
  if (!context) {
    throw new Error("useChessStore must be used within ChessStoreProvider");
  }
  return context;
};
