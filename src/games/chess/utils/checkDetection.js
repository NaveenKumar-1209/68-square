import {
    getPawnMoves,
    getKnightMoves,
    getBishopMoves,
    getRookMoves,
    getQueenMoves,
    getKingMoves,
} from "./suggestedMoves";

/**
 * Check Detection Utilities
 * 
 * Architecture:
 * - Detects if a king is in check by simulating opponent moves
 * - Validates moves don't leave the king in check
 * - Used for proper checkmate detection
 */

/**
 * Get all possible moves for a piece type
 */
const getMovesForPiece = (rank, file, piece, position) => {
    switch (piece.type) {
        case "pawn":
            return getPawnMoves(rank, file, piece, position);
        case "knight":
            return getKnightMoves(rank, file, piece, position);
        case "bishop":
            return getBishopMoves(rank, file, piece, position);
        case "rook":
            return getRookMoves(rank, file, piece, position);
        case "queen":
            return getQueenMoves(rank, file, piece, position);
        case "king":
            return getKingMoves(rank, file, piece, position);
        default:
            return [];
    }
};

/**
 * Check if a square is under attack by the opponent
 * @param {Array} position - The current board position
 * @param {number} targetRank - Rank of the square to check
 * @param {number} targetFile - File of the square to check
 * @param {string} defenderColor - Color of the piece defending the square
 * @returns {boolean} - True if the square is under attack
 */
export const isSquareUnderAttack = (position, targetRank, targetFile, defenderColor) => {
    const attackerColor = defenderColor === "white" ? "black" : "white";

    // Check all opponent pieces to see if any can attack this square
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];

            if (piece && piece.color === attackerColor) {
                const moves = getMovesForPiece(rank, file, piece, position);

                // Check if any move targets the square in question
                if (moves.some(move => move.rank === targetRank && move.file === targetFile)) {
                    return true;
                }
            }
        }
    }

    return false;
};

/**
 * Check if a king is in check
 * @param {Array} position - The current board position
 * @param {string} kingColor - Color of the king to check ("white" or "black")
 * @returns {boolean} - True if the king is in check
 */
export const isKingInCheck = (position, kingColor) => {
    // Find the king's position
    let kingRank = -1;
    let kingFile = -1;

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];
            if (piece && piece.type === "king" && piece.color === kingColor) {
                kingRank = rank;
                kingFile = file;
                break;
            }
        }
        if (kingRank !== -1) break;
    }

    if (kingRank === -1 || kingFile === -1) {
        return false; // King not found (shouldn't happen in valid game)
    }

    // Check if the king's square is under attack
    return isSquareUnderAttack(position, kingRank, kingFile, kingColor);
};

/**
 * Check if a move would leave the king in check
 * @param {Array} position - The current board position
 * @param {Object} piece - The piece being moved
 * @param {number} fromRank - Starting rank
 * @param {number} fromFile - Starting file
 * @param {number} toRank - Destination rank
 * @param {number} toFile - Destination file
 * @returns {boolean} - True if the move would leave the king in check
 */
export const wouldMoveLeaveKingInCheck = (position, piece, fromRank, fromFile, toRank, toFile) => {
    // Create a temporary board with the move applied
    const tempBoard = position.map((row) => [...row]);
    tempBoard[toRank][toFile] = { ...piece };
    tempBoard[fromRank][fromFile] = null;

    // Check if the king is in check after the move
    return isKingInCheck(tempBoard, piece.color);
};

