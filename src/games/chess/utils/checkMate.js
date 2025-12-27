import { getKingMoves } from "./suggestedMoves";

/**
 * Check if the current player is in checkmate
 * Note: This is a simplified implementation that only checks if the king has valid moves.
 * A complete checkmate detection would also verify:
 * 1. The king is actually in check
 * 2. No other piece can block the attack
 * 3. No other piece can capture the attacking piece
 *
 * @param {Array} position - The current board position (8x8 array)
 * @param {boolean} isWhiteTurn - Whether it's white's turn
 * @returns {boolean} - True if checkmate, false otherwise
 */
export const isCheckMate = (position, isWhiteTurn) => {
    const targetColor = isWhiteTurn ? "white" : "black";

    // Find the king's position on the board
    let kingRank = -1;
    let kingFile = -1;

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];
            if (piece && piece.type === "king" && piece.color === targetColor) {
                kingRank = rank;
                kingFile = file;
                break;
            }
        }
        if (kingRank !== -1) break;
    }

    // If king not found, return false (shouldn't happen in a valid game)
    if (kingRank === -1 || kingFile === -1) {
        return false;
    }

    // Get all valid moves for the king
    const kingMoves = getKingMoves(
        kingRank,
        kingFile,
        { type: "king", color: targetColor },
        position
    );

    // Simplified checkmate: if king has no valid moves
    // TODO: Add proper check detection and verify no other pieces can help
    return kingMoves.length === 0;
};

