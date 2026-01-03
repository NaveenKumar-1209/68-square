import { getSquareId } from "./conversion";

/**
 * Move Notation Utilities
 * 
 * Converts moves to algebraic notation (e.g., "e4", "Nf3", "Qxd5")
 * 
 * Architecture:
 * - Handles standard algebraic notation
 * - Supports piece identification, captures, and check/checkmate indicators
 */

/**
 * Get piece symbol for notation
 */
const getPieceSymbol = (pieceType) => {
  const symbols = {
    pawn: "",
    knight: "N",
    bishop: "B",
    rook: "R",
    queen: "Q",
    king: "K",
  };
  return symbols[pieceType] || "";
};

/**
 * Convert a move to algebraic notation
 * @param {Object} move - Move object with from/to positions and piece info
 * @param {Array} position - Board position before the move
 * @param {boolean} isCapture - Whether the move is a capture
 * @param {boolean} isCheck - Whether the move puts opponent in check
 * @param {boolean} isCheckmate - Whether the move is checkmate
 * @returns {string} - Algebraic notation string
 */
export const getMoveNotation = (move, position, isCapture = false, isCheck = false, isCheckmate = false) => {
  const { piece, fromRank, fromFile, toRank, toFile } = move;
  const pieceSymbol = getPieceSymbol(piece.type);
  const toSquare = getSquareId(toRank, toFile);
  const fromSquare = getSquareId(fromRank, fromFile);
  
  let notation = "";
  
  // Add piece symbol (except for pawns)
  if (pieceSymbol) {
    notation += pieceSymbol;
  }
  
  // Add source file for disambiguation (simplified - could be enhanced)
  if (piece.type === "pawn" && isCapture) {
    notation += fromSquare[0]; // Add file letter for pawn captures
  }
  
  // Add capture indicator
  if (isCapture) {
    notation += "x";
  }
  
  // Add destination square
  notation += toSquare;
  
  // Add check/checkmate indicators
  if (isCheckmate) {
    notation += "#";
  } else if (isCheck) {
    notation += "+";
  }
  
  return notation;
};

/**
 * Format move number and notation for display
 * @param {number} moveNumber - The move number (1-based)
 * @param {boolean} isWhiteMove - Whether it's white's move
 * @param {string} notation - The move notation
 * @returns {string} - Formatted move string
 */
export const formatMoveDisplay = (moveNumber, isWhiteMove, notation) => {
  if (isWhiteMove) {
    return `${moveNumber}. ${notation}`;
  } else {
    return `${moveNumber}... ${notation}`;
  }
};

