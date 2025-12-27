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