import { createContext, useContext, useReducer } from "react";
import { chessReducer, initialState } from "./chessReducer";
import {
  setPosition,
  setSelectedSquare,
  setHighlightedSquares,
  setSuggestedMoves,
  setMovingPiece,
  setIsWhiteTurn,
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
