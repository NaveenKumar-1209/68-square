import { getRankFile } from "../utils/conversion";
import { useSpecialMoveDetection } from "./useSpecialMoveDetection";

/**
 * Custom hook for handling square click events
 * 
 * Architecture:
 * - Centralizes square click logic
 * - Handles piece selection and movement
 * - Detects special moves (castling, en passant)
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
    castlingRights,
    enPassantTarget,
    selectPiece,
    clearSelection,
    executeMove,
}) => {
    const { detectSpecialMove } = useSpecialMoveDetection();
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
            // Detect special moves (castling, en passant)
            const specialMove = detectSpecialMove(
                position,
                movingPiece,
                movingPiece.rank,
                movingPiece.file,
                rank,
                file,
                castlingRights,
                enPassantTarget
            );
            executeMove(squareId, rank, file, specialMove);
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

