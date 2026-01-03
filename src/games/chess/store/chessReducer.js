import { INITIAL_POSITION } from "../game/initialPosition";
import { CONSTANTS } from "./constant";

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
    isInCheck: false,
    isStalemate: false,
    capturedPieces: { white: [], black: [] },
    castlingRights: {
        whiteKingSide: true,
        whiteQueenSide: true,
        blackKingSide: true,
        blackQueenSide: true,
    },
    enPassantTarget: null, // {rank, file} of pawn that can be captured en passant
    lastMove: null, // {from: {rank, file}, to: {rank, file}}
    promotionPending: null, // {rank, file, color} when pawn needs promotion
};

export const chessReducer = (state, action) => {
    switch (action.type) {
        case CONSTANTS.SET_POSITION:
            return { ...state, position: action.position };
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
            return { ...state, moveStack: action.moveStack, positionHistory: action.moveStack };
        case CONSTANTS.SET_SUGGESTED_MOVES:
            return { ...state, suggestedMoves: action.suggestedMoves };
        case CONSTANTS.SET_MOVING_PIECE:
            return { ...state, movingPiece: action.movingPiece };
        case CONSTANTS.SET_IS_CHECKMATE:
            return { ...state, isCheckMate: action.isCheckMate };
        case CONSTANTS.SET_IS_IN_CHECK:
            return { ...state, isInCheck: action.isInCheck };
        case CONSTANTS.SET_IS_STALEMATE:
            return { ...state, isStalemate: action.isStalemate };
        case CONSTANTS.SET_CAPTURED_PIECES:
            return { ...state, capturedPieces: action.capturedPieces };
        case CONSTANTS.SET_CASTLING_RIGHTS:
            return { ...state, castlingRights: action.castlingRights };
        case CONSTANTS.SET_EN_PASSANT_TARGET:
            return { ...state, enPassantTarget: action.enPassantTarget };
        case CONSTANTS.SET_LAST_MOVE:
            return { ...state, lastMove: action.lastMove };
        case CONSTANTS.SET_PROMOTION_PENDING:
            return { ...state, promotionPending: action.promotionPending };
        case CONSTANTS.RESET_GAME:
            return {
                ...initialState,
                position: JSON.parse(JSON.stringify(INITIAL_POSITION)),
                moveStack: [JSON.parse(JSON.stringify(INITIAL_POSITION))],
            };
        default:
            return state;
    }
};

