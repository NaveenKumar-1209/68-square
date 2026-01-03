import { getCastlingMoves, getEnPassantMoves } from "../utils/specialMoves";

/**
 * Custom hook for detecting special moves
 * 
 * Architecture:
 * - Detects castling and en passant moves
 * - Returns special move information for execution
 */
export const useSpecialMoveDetection = () => {
    const detectSpecialMove = (position, movingPiece, fromRank, fromFile, toRank, toFile, castlingRights, enPassantTarget) => {
        // Check for castling
        if (movingPiece.type === "king") {
            const castlingMoves = getCastlingMoves(fromRank, fromFile, movingPiece.color, position, castlingRights);
            const castlingMove = castlingMoves.find(
                (move) => move.rank === toRank && move.file === toFile
            );
            if (castlingMove) {
                return castlingMove;
            }
        }

        // Check for en passant
        if (movingPiece.type === "pawn") {
            const enPassantMoves = getEnPassantMoves(fromRank, fromFile, movingPiece, position, enPassantTarget);
            const enPassantMove = enPassantMoves.find(
                (move) => move.rank === toRank && move.file === toFile
            );
            if (enPassantMove) {
                return enPassantMove;
            }
        }

        return null;
    };

    return { detectSpecialMove };
};

