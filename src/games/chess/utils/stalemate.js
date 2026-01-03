import { isKingInCheck } from "./checkDetection";
import { wouldMoveLeaveKingInCheck } from "./checkDetection";
import {
  getPawnMoves,
  getKnightMoves,
  getBishopMoves,
  getRookMoves,
  getQueenMoves,
  getKingMoves,
} from "./suggestedMoves";

/**
 * Stalemate Detection
 * 
 * Stalemate occurs when:
 * 1. The player to move is NOT in check
 * 2. The player has no legal moves available
 * 
 * Architecture:
 * - Checks all pieces of the current player
 * - Validates that no legal moves exist
 */

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
 * Check if the current player is in stalemate
 * @param {Array} position - The current board position
 * @param {boolean} isWhiteTurn - Whether it's white's turn
 * @returns {boolean} - True if stalemate
 */
export const isStalemate = (position, isWhiteTurn) => {
  const targetColor = isWhiteTurn ? "white" : "black";
  
  // Stalemate requires the player NOT to be in check
  if (isKingInCheck(position, targetColor)) {
    return false;
  }
  
  // Check if the player has any legal moves
  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const piece = position[rank][file];
      
      // Only check pieces of the current player's color
      if (piece && piece.color === targetColor) {
        const moves = getMovesForPiece(rank, file, piece, position);
        
        // Check if any move is legal (doesn't leave king in check)
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
            // Found a legal move, not stalemate
            return false;
          }
        }
      }
    }
  }
  
  // No legal moves found and not in check = stalemate
  return true;
};

