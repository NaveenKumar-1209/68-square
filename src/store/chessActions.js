import { CONSTANTS } from "./constant";

export const setPosition = (dispatch) => (position) => {
    dispatch({ type: CONSTANTS.SET_POSITION, position });
}

export const setSelectedSquare = (dispatch) => (selectedSquare) => {
    dispatch({ type: CONSTANTS.SET_SELECTED_SQUARE, selectedSquare });
}

export const setHighlightedSquares = (dispatch) => (highlightedSquares) => {
    dispatch({ type: CONSTANTS.SET_HIGHLIGHTED_SQUARES, highlightedSquares });
}

export const setMoveHistory = (dispatch) => (moveHistory) => {
    dispatch({ type: CONSTANTS.SET_MOVE_HISTORY, moveHistory });
}

export const setCurrentMove = (dispatch) => (currentMove) => {
    dispatch({ type: CONSTANTS.SET_CURRENT_MOVE, currentMove });
}

export const setIsWhiteTurn = (dispatch) => (isWhiteTurn) => {
    dispatch({ type: CONSTANTS.SET_IS_WHITE_TURN, isWhiteTurn });
}

export const setIsGameOver = (dispatch) => (isGameOver) => {
    dispatch({ type: CONSTANTS.SET_IS_GAME_OVER, isGameOver });
}

export const setWinner = (dispatch) => (winner) => {
    dispatch({ type: CONSTANTS.SET_WINNER, winner });
}

export const setMoveCount = (dispatch) => (moveCount) => {
    dispatch({ type: CONSTANTS.SET_MOVE_COUNT, moveCount });
}

export const setMoveStack = (dispatch) => (moveStack) => {
    dispatch({ type: CONSTANTS.SET_MOVE_STACK, moveStack });
}

export const setSuggestedMoves = (dispatch) => (suggestedMoves) => {
    dispatch({ type: CONSTANTS.SET_SUGGESTED_MOVES, suggestedMoves });
}