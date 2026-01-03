import { Square } from "./Square";
import { INITIAL_POSITION } from "../../game/initialPosition";
import { getSquareId } from "../../utils/conversion";

/**
 * Board Component
 * Main chess board component that renders an 8x8 grid
 *
 * Uses CSS variables from theme for easy customization
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

  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="w-full h-full mx-auto p-6 flex items-center justify-center">
      <div className="relative">
        {/* Board container with elegant shadow and border */}
        <div
          className="chess-board-frame p-4 rounded-2xl shadow-2xl border-4"
          style={{
            background: `var(--board-frame)`,
            borderColor: `var(--board-border)`,
          }}
        >
          {/* File coordinates (a-h) - Top */}
          <div className="grid grid-cols-8 mb-1">
            {files.map((file) => (
              <div
                key={`file-top-${file}`}
                className="text-center font-bold text-sm"
                style={{ color: `var(--board-coordinates)` }}
              >
                {file}
              </div>
            ))}
          </div>

          {/* Board grid container */}
          <div
            className="grid grid-cols-8 gap-0 border-2 rounded-lg overflow-hidden"
            style={{ borderColor: `var(--board-border)` }}
          >
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
                  <div key={squareId} className="relative">
                    {/* Rank coordinates (1-8) - Left side */}
                    {fileIndex === 0 && (
                      <div
                        className="absolute -left-6 top-1/2 -translate-y-1/2 font-bold text-sm z-10"
                        style={{ color: `var(--board-coordinates)` }}
                      >
                        {ranks[rankIndex]}
                      </div>
                    )}

                    <Square
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
                  </div>
                );
              })
            )}
          </div>

          {/* File coordinates (a-h) - Bottom */}
          <div className="grid grid-cols-8 mt-1">
            {files.map((file) => (
              <div
                key={`file-bottom-${file}`}
                className="text-center font-bold text-sm"
                style={{ color: `var(--board-coordinates)` }}
              >
                {file}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
