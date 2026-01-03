import { isKingInCheck } from "../utils/checkDetection";
import { checkIsMate } from "../utils/checkMate";
import { getMoveNotation } from "../utils/moveNotation";

/**
 * Custom hook for executing chess moves
 * 
 * Architecture:
 * - Handles move execution logic
 * - Tracks captured pieces
 * - Updates move history with notation
 * - Separates move logic from component
 */
export const useMoveExecution = ({
    position,
    movingPiece,
    isWhiteTurn,
    capturedPieces,
    moveHistory,
    setPosition,
    setIsWhiteTurn,
    setCapturedPieces,
    setMoveHistory,
    setIsCheckMate,
    clearSelection,
}) => {
    const executeMove = (squareId, rank, file) => {
        if (!movingPiece) return;

        // Deep copy the board properly
        const newBoard = position.map((row) => [...row]);

        // Track captured piece
        const capturedPiece = newBoard[rank][file];
        const newCapturedPieces = { ...capturedPieces };

        // Move the piece
        newBoard[rank][file] = movingPiece;
        newBoard[movingPiece.rank][movingPiece.file] = null;

        // Update captured pieces if a piece was captured
        if (capturedPiece) {
            const capturedColor = capturedPiece.color;
            newCapturedPieces[capturedColor] = [
                ...newCapturedPieces[capturedColor],
                capturedPiece,
            ];
            setCapturedPieces(newCapturedPieces);
        }

        // Create move notation
        const moveNotation = getMoveNotation(
            {
                piece: movingPiece,
                fromRank: movingPiece.rank,
                fromFile: movingPiece.file,
                toRank: rank,
                toFile: file,
            },
            position,
            !!capturedPiece,
            false, // Will be updated after move
            false // Will be updated after move
        );

        // Update the board position
        setPosition(newBoard);

        // Switch turns
        const newTurn = !isWhiteTurn;
        setIsWhiteTurn(newTurn);

        // Check game status after move
        const opponentColor = newTurn ? "white" : "black";
        const opponentInCheck = isKingInCheck(newBoard, opponentColor);
        const opponentCheckMate = checkIsMate(newBoard, newTurn);

        // Immediately update checkmate status to prevent further moves
        setIsCheckMate(opponentCheckMate);

        // Update move history
        const moveNumber = Math.floor(moveHistory.length / 2) + 1;
        const isWhiteMove = !isWhiteTurn; // The move that was just made
        const updatedNotation = opponentCheckMate
            ? moveNotation.replace(/\+?$/, "#")
            : opponentInCheck
                ? moveNotation.replace(/#?$/, "+")
                : moveNotation;

        const newMoveHistory = [
            ...moveHistory,
            {
                moveNumber,
                notation: updatedNotation,
                isWhiteMove,
                isCheck: opponentInCheck,
                isCheckmate: opponentCheckMate,
            },
        ];
        setMoveHistory(newMoveHistory);

        clearSelection();
    };

    return { executeMove };
};

