import { PIECE_SYMBOLS } from "../../game/initialPosition";

/**
 * Piece Component
 * Displays a chess piece using Unicode symbols
 * Enhanced with better styling, shadows, and hover effects
 *
 * @param {Object} props
 * @param {Object|null} props.piece - The piece object { type, color } or null
 * @param {string} props.className - Additional CSS classes
 */
export const Piece = ({ piece, className = "" }) => {
  if (!piece) return null;

  const symbol = PIECE_SYMBOLS[piece.color]?.[piece.type];

  if (!symbol) return null;

  // Enhanced piece styling with depth and shadow
  const pieceClasses = `
    text-4xl md:text-5xl lg:text-6xl
    select-none
    drop-shadow-2xl
    filter
    transition-transform duration-150
    hover:scale-110
    ${piece.color === "white" ? "text-white" : "text-gray-900"}
    ${className}
  `;

  return (
    <span
      className={pieceClasses}
      role="img"
      aria-label={`${piece.color} ${piece.type}`}
      style={{
        textShadow:
          piece.color === "white"
            ? "2px 2px 4px rgba(0,0,0,0.5), 0 0 8px rgba(0,0,0,0.3)"
            : "1px 1px 2px rgba(255,255,255,0.3), 0 0 4px rgba(255,255,255,0.2)",
      }}
    >
      {symbol}
    </span>
  );
};

export default Piece;
