/**
 * Initial chess position data structure
 * Represents the starting position of a chess game
 *
 * Format: 8x8 array where each square can contain:
 * - null: empty square
 * - { type: 'pawn'|'rook'|'knight'|'bishop'|'queen'|'king', color: 'white'|'black' }
 */

export const INITIAL_POSITION = [
  // Rank 8 (Black pieces)
  [
    { type: "rook", color: "black" },
    { type: "knight", color: "black" },
    { type: "bishop", color: "black" },
    { type: "queen", color: "black" },
    { type: "king", color: "black" },
    { type: "bishop", color: "black" },
    { type: "knight", color: "black" },
    { type: "rook", color: "black" },
  ],
  // Rank 7 (Black pawns)
  Array(8)
    .fill(null)
    .map(() => ({ type: "pawn", color: "black" })),
  // Ranks 6-3 (Empty)
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  // Rank 2 (White pawns)
  Array(8)
    .fill(null)
    .map(() => ({ type: "pawn", color: "white" })),
  // Rank 1 (White pieces)
  [
    { type: "rook", color: "white" },
    { type: "knight", color: "white" },
    { type: "bishop", color: "white" },
    { type: "queen", color: "white" },
    { type: "king", color: "white" },
    { type: "bishop", color: "white" },
    { type: "knight", color: "white" },
    { type: "rook", color: "white" },
  ],
];

/**
 * Chess piece Unicode symbols for display
 */
export const PIECE_SYMBOLS = {
  white: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  black: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
};
