import { getRankFile } from "../utils/conversion";

/**
 * Custom hook for handling square click events
 * 
 * Architecture:
 * - Centralizes square click logic
 * - Handles piece selection and movement
 * - Separates interaction logic from component
 */
export const useSquareClickHandler = ({
    position,
    isWhiteTurn,
    selectedSquare,
    movingPiece,
    suggestedMoves,
    isCheckMate,
    isStalemate,
    selectPiece,
    clearSelection,
    executeMove,
}) => {
    const handleSquareClick = (squareId) => {
        // Don't allow moves if game is over
        if (isCheckMate || isStalemate) {
            return;
        }

        const { rank, file } = getRankFile(squareId);
        const clickedPiece = position[rank][file];

        // CASE 1: Attempting to move a previously selected piece
        if (
            movingPiece &&
            suggestedMoves?.includes(squareId) &&
            clickedPiece?.color !== movingPiece.color
        ) {
            executeMove(squareId, rank, file);
            return;
        }

        // CASE 2: Clicking the same square (deselect)
        if (selectedSquare === squareId) {
            clearSelection();
            return;
        }

        // CASE 3: Selecting a piece of the current player's color
        if (
            clickedPiece &&
            clickedPiece.color === (isWhiteTurn ? "white" : "black")
        ) {
            selectPiece(squareId, rank, file, clickedPiece);
            return;
        }

        // CASE 4: Invalid selection (empty square or opponent's piece)
        clearSelection();
    };

    return { handleSquareClick };
};

