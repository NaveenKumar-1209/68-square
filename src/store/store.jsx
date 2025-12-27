import { createContext, useContext, useReducer } from "react";
import { chessReducer, initialState } from "./chessReducer";
import { setPosition, setSelectedSquare, setHighlightedSquares, setSuggestedMoves, setMovingPiece, setIsWhiteTurn } from "./chessActions";


const storeContext = createContext();


export const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(chessReducer, initialState);

    const actions = {
        setPosition: setPosition(dispatch),
        setSelectedSquare: setSelectedSquare(dispatch),
        setHighlightedSquares: setHighlightedSquares(dispatch),
        setSuggestedMoves: setSuggestedMoves(dispatch),
        setMovingPiece: setMovingPiece(dispatch),
        setIsWhiteTurn: setIsWhiteTurn(dispatch),
    }

    const value = {
        ...store,
        ...actions,
    }
    console.log("store", store);
    return (
        <storeContext.Provider value={value}>
            {children}
        </storeContext.Provider>
    )
}

export const useStore = () => {
    return useContext(storeContext);
}