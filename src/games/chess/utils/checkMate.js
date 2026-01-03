import { getKingMoves } from "./suggestedMoves";
import {
    isKingInCheck,
    wouldMoveLeaveKingInCheck,
} from "./checkDetection";
import {
    getPawnMoves,
    getKnightMoves,
    getBishopMoves,
    getRookMoves,
    getQueenMoves,
} from "./suggestedMoves";

/**
 * Get all valid moves for a piece type
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
 * Check if the current player is in checkmate
 * 
 * Checkmate occurs when:
 * 1. The king is in check
 * 2. The king cannot move out of check
 * 3. No other piece can block or capture the attacking piece
 *
 * @param {Array} position - The current board position (8x8 array)
 * @param {boolean} isWhiteTurn - Whether it's white's turn (the player to move)
 * @returns {boolean} - True if checkmate, false otherwise
 */
export const checkIsMate = (position, isWhiteTurn) => {
    const targetColor = isWhiteTurn ? "white" : "black";

    // First, check if the king is in check
    if (!isKingInCheck(position, targetColor)) {
        return false; // Not in check, so not checkmate
    }

    // Find the king's position
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

    if (kingRank === -1 || kingFile === -1) {
        return false; // King not found
    }

    // Check if the king has any valid moves (moves that don't leave it in check)
    const kingMoves = getKingMoves(
        kingRank,
        kingFile,
        { type: "king", color: targetColor },
        position
    );

    // Filter out moves that would leave the king in check
    const validKingMoves = kingMoves.filter(
        (move) =>
            !wouldMoveLeaveKingInCheck(
                position,
                { type: "king", color: targetColor },
                kingRank,
                kingFile,
                move.rank,
                move.file
            )
    );

    // If the king has valid moves, not checkmate
    if (validKingMoves.length > 0) {
        return false;
    }

    // Check if any other piece can make a move that gets the king out of check
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];

            // Only check pieces of the same color as the king
            if (piece && piece.color === targetColor && piece.type !== "king") {
                const moves = getMovesForPiece(rank, file, piece, position);

                // Check if any move would get the king out of check
                for (const move of moves) {
                    if (
                        !wouldMoveLeaveKingInCheck(
                            position,
                            piece,
                            rank,
                            file,
                            move.rank,
                            move.file
                        )
                    ) {
                        // Found a valid move that doesn't leave the king in check
                        return false;
                    }
                }
            }
        }
    }

    // King is in check, has no valid moves, and no other piece can help
    return true;
};

