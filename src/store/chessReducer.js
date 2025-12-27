import { INITIAL_POSITION } from "../game/initialPosition";
import { CONSTANTS } from "./constant";



export const initialState = {
    position: INITIAL_POSITION,
    selectedSquare: null,
    highlightedSquares: [],
}


export const chessReducer = (state, action) => {
    switch (action.type) {
        case CONSTANTS.SET_POSITION:
            return { ...state, position: action.position };
        case CONSTANTS.SET_SELECTED_SQUARE:
            return { ...state, selectedSquare: action.selectedSquare };
        case CONSTANTS.SET_HIGHLIGHTED_SQUARES:
            return { ...state, highlightedSquares: action.highlightedSquares };
        default:
            return state;
    }
}