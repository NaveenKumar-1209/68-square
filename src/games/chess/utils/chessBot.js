import {
    getPawnMoves,
    getKnightMoves,
    getBishopMoves,
    getRookMoves,
    getQueenMoves,
    getKingMoves,
} from "./suggestedMoves";
import { getEnPassantMoves, getCastlingMoves } from "./specialMoves";
import {
    wouldMoveLeaveKingInCheck,
    isSquareUnderAttack,
    isKingInCheck,
} from "./checkDetection";

/**
 * Chess Bot AI
 * 
 * Architecture:
 * - Simple evaluation-based bot
 * - Uses piece values and position evaluation
 * - Selects best move based on material and position
 * 
 * Piece Values:
 * - Pawn: 1
 * - Knight: 3
 * - Bishop: 3
 * - Rook: 5
 * - Queen: 9
 * - King: 100 (for checkmate detection)
 */

const PIECE_VALUES = {
    pawn: 1,
    knight: 3,
    bishop: 3,
    rook: 5,
    queen: 9,
    king: 100,
};

/**
 * Evaluate the board position for a given color
 * @param {Array} position - Current board position
 * @param {string} color - Color to evaluate for
 * @returns {number} - Evaluation score (positive is good for the color)
 */
const evaluatePosition = (position, color) => {
    let score = 0;

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];
            if (!piece) continue;

            const pieceValue = PIECE_VALUES[piece.type] || 0;

            if (piece.color === color) {
                score += pieceValue;
            } else {
                score -= pieceValue;
            }
        }
    }

    return score;
};

/**
 * Get all legal moves for a piece
 */
const getLegalMovesForPiece = (
    rank,
    file,
    piece,
    position,
    castlingRights,
    enPassantTarget
) => {
    const moves = [];

    switch (piece.type) {
        case "pawn": {
            moves.push(...getPawnMoves(rank, file, piece, position));
            if (enPassantTarget) {
                const enPassantMoves = getEnPassantMoves(
                    rank,
                    file,
                    piece,
                    position,
                    enPassantTarget
                );
                moves.push(...enPassantMoves);
            }
            break;
        }
        case "knight":
            moves.push(...getKnightMoves(rank, file, piece, position));
            break;
        case "bishop":
            moves.push(...getBishopMoves(rank, file, piece, position));
            break;
        case "rook":
            moves.push(...getRookMoves(rank, file, piece, position));
            break;
        case "queen":
            moves.push(...getQueenMoves(rank, file, piece, position));
            break;
        case "king": {
            const kingMoves = getKingMoves(rank, file, piece, position);
            const safeKingMoves = kingMoves.filter((move) => {
                return !isSquareUnderAttack(
                    position,
                    move.rank,
                    move.file,
                    piece.color
                );
            });
            moves.push(...safeKingMoves);

            if (castlingRights) {
                const castlingMoves = getCastlingMoves(
                    rank,
                    file,
                    piece.color,
                    position,
                    castlingRights
                );
                moves.push(...castlingMoves);
            }
            break;
        }
    }

    // Filter moves that leave king in check
    const legalMoves = moves.filter((move) => {
        if (move.type === "castling") {
            const tempBoard = position.map((row) => [...row]);
            tempBoard[move.rank][move.file] = piece;
            tempBoard[rank][file] = null;
            const rook = tempBoard[move.rookFrom.rank][move.rookFrom.file];
            tempBoard[move.rookTo.rank][move.rookTo.file] = rook;
            tempBoard[move.rookFrom.rank][move.rookFrom.file] = null;
            return !isKingInCheck(tempBoard, piece.color);
        }

        if (move.type === "en-passant") {
            const tempBoard = position.map((row) => [...row]);
            tempBoard[move.rank][move.file] = piece;
            tempBoard[rank][file] = null;
            tempBoard[move.captureRank][move.captureFile] = null;
            return !isKingInCheck(tempBoard, piece.color);
        }

        return !wouldMoveLeaveKingInCheck(
            position,
            piece,
            rank,
            file,
            move.rank,
            move.file
        );
    });

    return legalMoves;
};

/**
 * Get all legal moves for a color
 */
const getAllLegalMoves = (position, color, castlingRights, enPassantTarget) => {
    const allMoves = [];

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const piece = position[rank][file];
            if (piece && piece.color === color) {
                const moves = getLegalMovesForPiece(
                    rank,
                    file,
                    piece,
                    position,
                    castlingRights,
                    enPassantTarget
                );

                for (const move of moves) {
                    allMoves.push({
                        from: { rank, file },
                        to: { rank: move.rank, file: move.file },
                        piece,
                        specialMove: move.type ? move : null,
                    });
                }
            }
        }
    }

    return allMoves;
};

/**
 * Evaluate a move by simulating it and checking the resulting position
 */
const evaluateMove = (position, move, color) => {
    const tempBoard = position.map((row) => [...row]);
    const { from, to, piece, specialMove } = move;

    // Execute the move
    if (specialMove?.type === "castling") {
        tempBoard[to.rank][to.file] = piece;
        tempBoard[from.rank][from.file] = null;
        const rook = tempBoard[specialMove.rookFrom.rank][specialMove.rookFrom.file];
        tempBoard[specialMove.rookTo.rank][specialMove.rookTo.file] = rook;
        tempBoard[specialMove.rookFrom.rank][specialMove.rookFrom.file] = null;
    } else if (specialMove?.type === "en-passant") {
        tempBoard[to.rank][to.file] = piece;
        tempBoard[from.rank][from.file] = null;
        tempBoard[specialMove.captureRank][specialMove.captureFile] = null;
    } else {
        const capturedPiece = tempBoard[to.rank][to.file];
        tempBoard[to.rank][to.file] = piece;
        tempBoard[from.rank][from.file] = null;

        // Bonus for captures
        if (capturedPiece) {
            const captureValue = PIECE_VALUES[capturedPiece.type] || 0;
            return evaluatePosition(tempBoard, color) + captureValue * 10;
        }
    }

    return evaluatePosition(tempBoard, color);
};

/**
 * Get the best move for the bot
 * @param {Array} position - Current board position
 * @param {string} botColor - Color the bot is playing
 * @param {Object} castlingRights - Castling rights
 * @param {Object} enPassantTarget - En passant target
 * @returns {Object|null} - Best move or null if no moves available
 */
export const getBotMove = (position, botColor, castlingRights, enPassantTarget) => {
    const legalMoves = getAllLegalMoves(position, botColor, castlingRights, enPassantTarget);

    if (legalMoves.length === 0) {
        return null;
    }

    // Evaluate all moves and pick the best one
    let bestMove = null;
    let bestScore = -Infinity;

    for (const move of legalMoves) {
        const score = evaluateMove(position, move, botColor);

        // Prefer moves that capture pieces
        const capturedPiece = position[move.to.rank][move.to.file];
        if (capturedPiece) {
            const captureBonus = PIECE_VALUES[capturedPiece.type] * 5;
            if (score + captureBonus > bestScore) {
                bestScore = score + captureBonus;
                bestMove = move;
            }
        } else if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }

    // If no move found, pick a random legal move
    if (!bestMove && legalMoves.length > 0) {
        bestMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];
    }

    return bestMove;
};

