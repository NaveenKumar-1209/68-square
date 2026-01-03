import { Square } from "./Square";
import { INITIAL_POSITION } from "../../game/initialPosition";
import { getSquareId } from "../../utils/conversion";

/**
 * Board Component
 * Main chess board component that renders an 8x8 grid
 *
 * Architecture:
 * - Uses a controlled component pattern for piece positions
 * - Maintains selected square state for future move logic
 * - Provides callback hooks for game logic integration
 */
export const Board = ({
  position = INITIAL_POSITION,
  onSquareClick,
  selectedSquare = null,
  highlightedSquares = [],
  suggestedMoves = [],
  kingInCheckSquare = null,
  lastMove = null,
}) => {
  /**
   * Determine if a square is light colored
   * Chess board pattern: light squares where rank + file is even
   */
  const isLightSquare = (rank, file) => {
    return (rank + file) % 2 === 0;
  };

  return (
    <div className="w-full h-full mx-auto p-4">
      <div className="bg-amber-900 p-2 rounded-lg shadow-2xl h-full w-full">
        {/* Board grid container */}
        <div className="grid grid-cols-8 aspect-square h-full w-full">
          {position.map((rank, rankIndex) =>
            rank.map((piece, fileIndex) => {
              const squareId = getSquareId(rankIndex, fileIndex);
              const isLight = isLightSquare(rankIndex, fileIndex);
              const isSelected = selectedSquare === squareId;
              const isHighlighted = highlightedSquares.includes(squareId);
              const isKingInCheck = kingInCheckSquare === squareId;
              const isLastMoveFrom =
                lastMove &&
                lastMove.from.rank === rankIndex &&
                lastMove.from.file === fileIndex;
              const isLastMoveTo =
                lastMove &&
                lastMove.to.rank === rankIndex &&
                lastMove.to.file === fileIndex;
              const isLastMove = isLastMoveFrom || isLastMoveTo;

              return (
                <Square
                  key={squareId}
                  isLight={isLight}
                  piece={piece}
                  squareId={squareId}
                  onSquareClick={onSquareClick}
                  isSelected={isSelected}
                  isHighlighted={isHighlighted}
                  suggestedMoves={suggestedMoves}
                  isKingInCheck={isKingInCheck}
                  isLastMove={isLastMove}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Board;
