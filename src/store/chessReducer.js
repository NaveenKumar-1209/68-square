import { INITIAL_POSITION } from "../game/initialPosition";
import { CONSTANTS } from "./constant";
import { isCheckMate } from "../utils/checkMate";


export const initialState = {
    position: INITIAL_POSITION,
    selectedSquare: null,
    highlightedSquares: [],
    moveHistory: [],
    currentMove: 0,
    isWhiteTurn: true,
    isGameOver: false,
    winner: null,
    moveCount: 0,
    moveStack: [],
    suggestedMoves: [],
    movingPiece: null,
    isCheckMate: false,
}


export const chessReducer = (state, action) => {
    switch (action.type) {
        case CONSTANTS.SET_POSITION:
            const isCheckMateValue = isCheckMate(action.position, state.isWhiteTurn);
            return { ...state, position: action.position, isCheckMate: isCheckMateValue };
        case CONSTANTS.SET_SELECTED_SQUARE:
            return { ...state, selectedSquare: action.selectedSquare };
        case CONSTANTS.SET_HIGHLIGHTED_SQUARES:
            return { ...state, highlightedSquares: action.highlightedSquares };
        case CONSTANTS.SET_MOVE_HISTORY:
            return { ...state, moveHistory: action.moveHistory };
        case CONSTANTS.SET_CURRENT_MOVE:
            return { ...state, currentMove: action.currentMove };
        case CONSTANTS.SET_IS_WHITE_TURN:
            return { ...state, isWhiteTurn: action.isWhiteTurn };
        case CONSTANTS.SET_IS_GAME_OVER:
            return { ...state, isGameOver: action.isGameOver };
        case CONSTANTS.SET_WINNER:
            return { ...state, winner: action.winner };
        case CONSTANTS.SET_MOVE_COUNT:
            return { ...state, moveCount: action.moveCount };
        case CONSTANTS.SET_MOVE_STACK:
            return { ...state, moveStack: action.moveStack };
        case CONSTANTS.SET_SUGGESTED_MOVES:
            return { ...state, suggestedMoves: action.suggestedMoves };
        case CONSTANTS.SET_MOVING_PIECE:
            return { ...state, movingPiece: action.movingPiece };
        default:
            return state;
    }
}