import { Piece } from "../Pieces/Pieces";

/**
 * Square Component
 * Represents a single square on the chess board
 *
 * Uses CSS variables from theme for easy customization
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
  const baseClasses = `
    w-full h-full
    aspect-square
    flex items-center justify-center
    relative
    cursor-pointer
    overflow-hidden
    transition-all duration-200
    hover:brightness-110
    hover:scale-105
    active:scale-95
  `;

  // Selected square - using CSS variables
  const selectedClasses = isSelected
    ? "ring-4 ring-inset shadow-lg z-10 scale-105"
    : "";

  // Highlighted square (for move suggestions)
  const highlightedClasses = isHighlighted
    ? "bg-amber-400 bg-opacity-50 ring-2 ring-amber-500"
    : "";

  // Suggested move indicator - subtle dot
  const isSuggested = suggestedMoves.includes(squareId);
  const suggestedDot =
    isSuggested && !piece ? (
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-3 h-3 rounded-full shadow-lg"
          style={{
            backgroundColor: `var(--suggested-move)`,
            opacity: `var(--suggested-move-opacity)`,
          }}
        ></div>
      </div>
    ) : null;

  // Suggested move with piece (capture indicator)
  const suggestedCapture =
    isSuggested && piece ? (
      <div
        className="absolute inset-0 ring-4 rounded-full"
        style={{
          ringColor: `var(--suggested-move)`,
          opacity: 0.6,
        }}
      ></div>
    ) : null;

  // King in check - dramatic red highlight
  const checkClasses = isKingInCheck
    ? "ring-4 ring-inset shadow-2xl animate-pulse z-20"
    : "";

  // Last move highlight - using CSS variables
  const lastMoveClasses = isLastMove && !isKingInCheck ? "ring-2" : "";

  // Build inline styles for dynamic colors
  const squareStyles = {
    background: isLight
      ? `var(--board-light-square)`
      : `var(--board-dark-square)`,
  };

  if (isSelected) {
    squareStyles["--tw-ring-color"] = `var(--selected-square)`;
    squareStyles.boxShadow = `0 10px 15px -3px var(--selected-square-shadow)`;
  }

  if (isKingInCheck) {
    squareStyles.backgroundColor = `var(--check-highlight)`;
    squareStyles["--tw-ring-color"] = `var(--check-border)`;
    squareStyles.boxShadow = `0 0 20px var(--check-shadow)`;
  }

  if (isLastMove && !isKingInCheck) {
    squareStyles.backgroundColor = `var(--last-move)`;
    squareStyles["--tw-ring-color"] = `var(--last-move-border)`;
  }

  return (
    <div
      className={`${baseClasses} ${selectedClasses} ${highlightedClasses} ${checkClasses} ${lastMoveClasses}`}
      style={squareStyles}
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
