import { CONSTANTS } from "./constant";

export const setPosition = (dispatch) => (position) => {
    dispatch({ type: CONSTANTS.SET_POSITION, position });
};

export const setSelectedSquare = (dispatch) => (selectedSquare) => {
    dispatch({ type: CONSTANTS.SET_SELECTED_SQUARE, selectedSquare });
};

export const setHighlightedSquares = (dispatch) => (highlightedSquares) => {
    dispatch({
        type: CONSTANTS.SET_HIGHLIGHTED_SQUARES,
        highlightedSquares,
    });
};

export const setMoveHistory = (dispatch) => (moveHistory) => {
    dispatch({ type: CONSTANTS.SET_MOVE_HISTORY, moveHistory });
};

export const setCurrentMove = (dispatch) => (currentMove) => {
    dispatch({ type: CONSTANTS.SET_CURRENT_MOVE, currentMove });
};

export const setIsWhiteTurn = (dispatch) => (isWhiteTurn) => {
    dispatch({ type: CONSTANTS.SET_IS_WHITE_TURN, isWhiteTurn });
};

export const setIsGameOver = (dispatch) => (isGameOver) => {
    dispatch({ type: CONSTANTS.SET_IS_GAME_OVER, isGameOver });
};

export const setWinner = (dispatch) => (winner) => {
    dispatch({ type: CONSTANTS.SET_WINNER, winner });
};

export const setMoveCount = (dispatch) => (moveCount) => {
    dispatch({ type: CONSTANTS.SET_MOVE_COUNT, moveCount });
};

export const setMoveStack = (dispatch) => (moveStack) => {
    dispatch({ type: CONSTANTS.SET_MOVE_STACK, moveStack });
};

// Helper to update position history (for undo/redo)
export const addPositionToHistory = (dispatch, getState) => (position) => {
    const currentHistory = getState().positionHistory || [];
    const newHistory = [...currentHistory, JSON.parse(JSON.stringify(position))];
    dispatch({ type: CONSTANTS.SET_MOVE_STACK, moveStack: newHistory });
};

export const setSuggestedMoves = (dispatch) => (suggestedMoves) => {
    dispatch({ type: CONSTANTS.SET_SUGGESTED_MOVES, suggestedMoves });
};

export const setMovingPiece = (dispatch) => (movingPiece) => {
    dispatch({ type: CONSTANTS.SET_MOVING_PIECE, movingPiece });
};

export const setIsCheckMate = (dispatch) => (isCheckMate) => {
    dispatch({ type: CONSTANTS.SET_IS_CHECKMATE, isCheckMate });
};

export const setIsInCheck = (dispatch) => (isInCheck) => {
    dispatch({ type: CONSTANTS.SET_IS_IN_CHECK, isInCheck });
};

export const setIsStalemate = (dispatch) => (isStalemate) => {
    dispatch({ type: CONSTANTS.SET_IS_STALEMATE, isStalemate });
};

export const setCapturedPieces = (dispatch) => (capturedPieces) => {
    dispatch({ type: CONSTANTS.SET_CAPTURED_PIECES, capturedPieces });
};

export const setCastlingRights = (dispatch) => (castlingRights) => {
    dispatch({ type: CONSTANTS.SET_CASTLING_RIGHTS, castlingRights });
};

export const setEnPassantTarget = (dispatch) => (enPassantTarget) => {
    dispatch({ type: CONSTANTS.SET_EN_PASSANT_TARGET, enPassantTarget });
};

export const setLastMove = (dispatch) => (lastMove) => {
    dispatch({ type: CONSTANTS.SET_LAST_MOVE, lastMove });
};

export const setPromotionPending = (dispatch) => (promotionPending) => {
    dispatch({ type: CONSTANTS.SET_PROMOTION_PENDING, promotionPending });
};

export const resetGame = (dispatch) => () => {
    dispatch({ type: CONSTANTS.RESET_GAME });
};

