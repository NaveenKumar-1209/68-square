import { getSquareId } from "./conversion";

/**
 * Find the king's position on the board
 * @param {Array} position - The current board position
 * @param {string} kingColor - Color of the king to find ("white" or "black")
 * @returns {string|null} - Square ID of the king (e.g., "e1") or null if not found
 */
export const findKingSquare = (position, kingColor) => {
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];
            if (piece && piece.type === "king" && piece.color === kingColor) {
                return getSquareId(rank, file);
            }
        }
    }
    return null;
};

