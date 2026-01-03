import { isSquareUnderAttack, isKingInCheck } from "./checkDetection";

/**
 * Special Chess Moves Utilities
 * 
 * Handles:
 * - Castling (king-side and queen-side)
 * - En passant captures
 * - Pawn promotion detection
 * 
 * Architecture:
 * - Validates special move conditions
 * - Returns special move information
 */

/**
 * Check if castling is possible
 * @param {number} kingRank - King's rank
 * @param {number} kingFile - King's file (should be 4)
 * @param {string} color - King's color
 * @param {Array} position - Current board position
 * @param {Object} castlingRights - Object with whiteKingSide, whiteQueenSide, blackKingSide, blackQueenSide
 * @returns {Array} - Array of castling moves [{rank, file, rookFrom, rookTo, type: 'castling'}]
 */
export const getCastlingMoves = (kingRank, kingFile, color, position, castlingRights) => {
    const moves = [];

    // King must be on starting square (e1 for white, e8 for black)
    if (kingFile !== 4) return moves;

    // King must not be in check
    if (isKingInCheck(position, color)) return moves;

    const isWhite = color === "white";
    const rank = isWhite ? 7 : 0;

    if (kingRank !== rank) return moves;

    // King-side castling (O-O)
    if (
        (isWhite && castlingRights?.whiteKingSide) ||
        (!isWhite && castlingRights?.blackKingSide)
    ) {
        // Check if squares between king and rook are empty
        if (
            !position[rank][5] &&
            !position[rank][6] &&
            position[rank][7]?.type === "rook" &&
            position[rank][7]?.color === color
        ) {
            // Check if king would pass through check and destination is safe
            if (
                !isSquareUnderAttack(position, rank, 5, color) &&
                !isSquareUnderAttack(position, rank, 6, color)
            ) {
                // Also verify the destination square (g1/g8) is safe
                moves.push({
                    rank,
                    file: 6,
                    rookFrom: { rank, file: 7 },
                    rookTo: { rank, file: 5 },
                    type: "castling",
                    castlingType: "king-side",
                });
            }
        }
    }

    // Queen-side castling (O-O-O)
    if (
        (isWhite && castlingRights?.whiteQueenSide) ||
        (!isWhite && castlingRights?.blackQueenSide)
    ) {
        // Check if squares between king and rook are empty
        if (
            !position[rank][1] &&
            !position[rank][2] &&
            !position[rank][3] &&
            position[rank][0]?.type === "rook" &&
            position[rank][0]?.color === color
        ) {
            // Check if king would pass through check and destination is safe
            if (
                !isSquareUnderAttack(position, rank, 2, color) &&
                !isSquareUnderAttack(position, rank, 3, color)
            ) {
                // Also verify the destination square (c1/c8) is safe
                moves.push({
                    rank,
                    file: 2,
                    rookFrom: { rank, file: 0 },
                    rookTo: { rank, file: 3 },
                    type: "castling",
                    castlingType: "queen-side",
                });
            }
        }
    }

    return moves;
};

/**
 * Check if en passant is possible
 * @param {number} rank - Pawn's rank
 * @param {number} file - Pawn's file
 * @param {Object} piece - Pawn piece
 * @param {Array} position - Current board position
 * @param {Object|null} enPassantTarget - {rank, file} of pawn that can be captured en passant
 * @returns {Array} - Array of en passant moves
 */
export const getEnPassantMoves = (rank, file, piece, position, enPassantTarget) => {
    const moves = [];

    if (!enPassantTarget) return moves;

    const isBlack = piece.color === "black";
    const direction = isBlack ? 1 : -1;
    const enPassantRank = isBlack ? 4 : 3; // En passant only possible on 5th rank for black, 4th for white

    // Pawn must be on the correct rank
    if (rank !== enPassantRank) return moves;

    // Check if en passant target is adjacent
    if (
        enPassantTarget.rank === rank &&
        (enPassantTarget.file === file + 1 || enPassantTarget.file === file - 1)
    ) {
        moves.push({
            rank: rank + direction,
            file: enPassantTarget.file,
            type: "en-passant",
            captureRank: enPassantTarget.rank,
            captureFile: enPassantTarget.file,
        });
    }

    return moves;
};

/**
 * Check if pawn promotion is needed
 * @param {number} rank - Destination rank
 * @param {Object} piece - Moving piece
 * @returns {boolean} - True if promotion is needed
 */
export const needsPromotion = (rank, piece) => {
    if (piece.type !== "pawn") return false;
    const promotionRank = piece.color === "white" ? 0 : 7;
    return rank === promotionRank;
};

