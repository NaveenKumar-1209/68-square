/**
 * Custom hook for managing piece selection
 * 
 * Architecture:
 * - Handles piece selection logic
 * - Manages selection state
 * - Separates selection logic from component
 */
export const usePieceSelection = ({
    setSelectedSquare,
    setMovingPiece,
    setHighlightedSquares,
    calculateSuggestedMoves,
}) => {
    const selectPiece = (squareId, rank, file, piece) => {
        setSelectedSquare(squareId);
        setMovingPiece({ ...piece, rank, file });
        calculateSuggestedMoves(squareId);
        setHighlightedSquares([]);
    };

    const clearSelection = () => {
        setSelectedSquare(null);
        setMovingPiece(null);
        setHighlightedSquares([]);
        calculateSuggestedMoves();
    };

    return {
        selectPiece,
        clearSelection,
    };
};

