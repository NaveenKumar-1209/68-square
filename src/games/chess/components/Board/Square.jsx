import { Piece } from "../Pieces/Pieces";

/**
 * Square Component
 * Represents a single square on the chess board
 *
 * Enhanced with:
 * - Modern color scheme (classic chess board colors)
 * - Smooth transitions and hover effects
 * - Better visual feedback for moves
 * - Elegant styling
 */
export const Square = ({
  isLight,
  piece,
  squareId,
  onSquareClick,
  isSelected = false,
  isHighlighted = false,
  suggestedMoves = [],
  isKingInCheck = false,
  isLastMove = false,
}) => {
  // Modern chess board colors - classic green/beige marble style
  const lightColor = "bg-gradient-to-br from-amber-50 to-amber-100";
  const darkColor = "bg-gradient-to-br from-emerald-700 to-emerald-800";

  const baseClasses = `
    w-full h-full
    aspect-square
    flex items-center justify-center
    relative
    cursor-pointer
    overflow-hidden
    transition-all duration-200
    ${isLight ? lightColor : darkColor}
    hover:brightness-110
    hover:scale-105
    active:scale-95
  `;

  // Selected square - elegant blue ring with glow
  const selectedClasses = isSelected
    ? "ring-4 ring-blue-500 ring-inset shadow-lg shadow-blue-500/50 z-10 scale-105"
    : "";

  // Highlighted square (for move suggestions)
  const highlightedClasses = isHighlighted
    ? "bg-yellow-400 bg-opacity-60 ring-2 ring-yellow-500"
    : "";

  // Suggested move indicator - subtle dot
  const isSuggested = suggestedMoves.includes(squareId);
  const suggestedDot =
    isSuggested && !piece ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 bg-blue-500 rounded-full opacity-70 shadow-lg"></div>
      </div>
    ) : null;

  // Suggested move with piece (capture indicator)
  const suggestedCapture =
    isSuggested && piece ? (
      <div className="absolute inset-0 ring-4 ring-blue-400 ring-opacity-60 rounded-full"></div>
    ) : null;

  // King in check - dramatic red highlight
  const checkClasses = isKingInCheck
    ? "bg-red-600 bg-opacity-90 ring-4 ring-red-700 ring-inset shadow-2xl shadow-red-500/70 animate-pulse z-20"
    : "";

  // Last move highlight - subtle blue tint
  const lastMoveClasses =
    isLastMove && !isKingInCheck
      ? "bg-blue-500 bg-opacity-30 ring-2 ring-blue-400 ring-opacity-50"
      : "";

  return (
    <div
      className={`${baseClasses} ${selectedClasses} ${highlightedClasses} ${checkClasses} ${lastMoveClasses}`}
      onClick={() => onSquareClick?.(squareId)}
      role="gridcell"
      aria-label={`Square ${squareId}${
        piece ? ` with ${piece.color} ${piece.type}` : " empty"
      }${isKingInCheck ? " - King in Check!" : ""}`}
    >
      {/* Piece with enhanced styling */}
      <div className="relative z-10 drop-shadow-lg">
        <Piece piece={piece} />
      </div>

      {/* Suggested move indicators */}
      {suggestedDot}
      {suggestedCapture}

      {/* Square coordinates label (for debugging/accessibility) */}
      {process.env.NODE_ENV === "development" && (
        <span className="absolute bottom-0 left-0 text-xs opacity-30 p-1 font-mono">
          {squareId}
        </span>
      )}
    </div>
  );
};

export default Square;
