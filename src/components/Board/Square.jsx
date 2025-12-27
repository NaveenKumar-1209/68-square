import { Piece } from "../Pieces/Pieces";

/**
 * Square Component
 * Represents a single square on the chess board
 *
 * @param {Object} props
 * @param {boolean} props.isLight - Whether the square is light colored
 * @param {Object|null} props.piece - The piece on this square
 * @param {string} props.squareId - Unique identifier (e.g., 'a1', 'e4')
 * @param {Function} props.onSquareClick - Click handler for the square
 * @param {boolean} props.isSelected - Whether this square is currently selected
 * @param {boolean} props.isHighlighted - Whether this square should be highlighted
 */
export const Square = ({
  isLight,
  piece,
  squareId,
  onSquareClick,
  isSelected = false,
  isHighlighted = false,
  suggestedMoves = [],
}) => {
  const baseClasses = `
    w-full h-full
    aspect-square
    flex items-center justify-center
    relative
    cursor-pointer
    overflow-hidden
    ${isLight ? "bg-amber-100" : "bg-amber-800"}
  `;

  const selectedClasses = isSelected ? "ring-4 ring-blue-500 ring-inset" : "";

  const highlightedClasses = isHighlighted ? "bg-yellow-300 bg-opacity-50" : "";

  const suggestedClasses = suggestedMoves.includes(squareId) ? "bg-yellow-300 bg-opacity-50" : "";

  return (
    <div
      className={`${baseClasses} ${selectedClasses} ${highlightedClasses} ${suggestedClasses}`}
      onClick={() => onSquareClick?.(squareId)}
      role="gridcell"
      aria-label={`Square ${squareId}${
        piece ? ` with ${piece.color} ${piece.type}` : " empty"
      }`}
    >
      <Piece piece={piece} />
      {/* Square coordinates label (for debugging/accessibility) */}
      {process.env.NODE_ENV === "development" && (
        <span className="absolute bottom-0 left-0 text-xs opacity-50 p-1">
          {squareId}
        </span>
      )}
    </div>
  );
};

export default Square;
