import { PIECE_SYMBOLS } from "../../game/initialPosition";

/**
 * Piece Component
 * Displays a chess piece using Unicode symbols
 *
 * @param {Object} props
 * @param {Object|null} props.piece - The piece object { type, color } or null
 * @param {string} props.className - Additional CSS classes
 */
export const Piece = ({ piece, className = "" }) => {
  if (!piece) return null;

  const symbol = PIECE_SYMBOLS[piece.color]?.[piece.type];

  if (!symbol) return null;

  return (
    <span
      className={`text-4xl md:text-5xl select-none ${className}`}
      role="img"
      aria-label={`${piece.color} ${piece.type}`}
    >
      {symbol}
    </span>
  );
};

export default Piece;
