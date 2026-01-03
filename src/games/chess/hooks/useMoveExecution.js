import { isKingInCheck } from "../utils/checkDetection";
import { checkIsMate } from "../utils/checkMate";
import { getMoveNotation } from "../utils/moveNotation";
import { needsPromotion } from "../utils/specialMoves";

/**
 * Custom hook for executing chess moves
 * 
 * Architecture:
 * - Handles move execution logic including special moves
 * - Tracks captured pieces
 * - Updates move history with notation
 * - Handles castling, en passant, and pawn promotion
 * - Separates move logic from component
 */
export const useMoveExecution = ({
    position,
    movingPiece,
    isWhiteTurn,
    capturedPieces,
    moveHistory,
    castlingRights,
    setPosition,
    setIsWhiteTurn,
    setCapturedPieces,
    setMoveHistory,
    setIsCheckMate,
    setCastlingRights,
    setEnPassantTarget,
    setLastMove,
    setPromotionPending,
    clearSelection,
}) => {
    const executeMove = (squareId, rank, file, specialMove = null) => {
        if (!movingPiece) return;

        // Deep copy the board properly
        const newBoard = position.map((row) => [...row]);
        const newCastlingRights = { ...castlingRights };
        let newEnPassantTarget = null;
        let capturedPiece = newBoard[rank][file];
        const newCapturedPieces = { ...capturedPieces };
        const fromRank = movingPiece.rank;
        const fromFile = movingPiece.file;

        // Handle special moves
        if (specialMove?.type === "castling") {
            // Move the king
            newBoard[rank][file] = movingPiece;
            newBoard[fromRank][fromFile] = null;

            // Move the rook
            const { rookFrom, rookTo } = specialMove;
            const rook = newBoard[rookFrom.rank][rookFrom.file];
            newBoard[rookTo.rank][rookTo.file] = rook;
            newBoard[rookFrom.rank][rookFrom.file] = null;

            // Update castling rights
            if (isWhiteTurn) {
                newCastlingRights.whiteKingSide = false;
                newCastlingRights.whiteQueenSide = false;
            } else {
                newCastlingRights.blackKingSide = false;
                newCastlingRights.blackQueenSide = false;
            }
        } else if (specialMove?.type === "en-passant") {
            // Move the pawn
            newBoard[rank][file] = movingPiece;
            newBoard[fromRank][fromFile] = null;

            // Capture the en passant pawn
            const capturedEnPassant = newBoard[specialMove.captureRank][specialMove.captureFile];
            newBoard[specialMove.captureRank][specialMove.captureFile] = null;

            if (capturedEnPassant) {
                const capturedColor = capturedEnPassant.color;
                newCapturedPieces[capturedColor] = [
                    ...newCapturedPieces[capturedColor],
                    capturedEnPassant,
                ];
                setCapturedPieces(newCapturedPieces);
            }
            capturedPiece = capturedEnPassant;
        } else {
            // Normal move
            newBoard[rank][file] = movingPiece;
            newBoard[fromRank][fromFile] = null;

            // Update captured pieces if a piece was captured
            if (capturedPiece) {
                const capturedColor = capturedPiece.color;
                newCapturedPieces[capturedColor] = [
                    ...newCapturedPieces[capturedColor],
                    capturedPiece,
                ];
                setCapturedPieces(newCapturedPieces);
            }
        }

        // Update castling rights if king or rook moves
        if (movingPiece.type === "king") {
            if (isWhiteTurn) {
                newCastlingRights.whiteKingSide = false;
                newCastlingRights.whiteQueenSide = false;
            } else {
                newCastlingRights.blackKingSide = false;
                newCastlingRights.blackQueenSide = false;
            }
        }

        // Update castling rights if rook moves
        if (movingPiece.type === "rook") {
            if (isWhiteTurn) {
                if (fromFile === 0) newCastlingRights.whiteQueenSide = false;
                if (fromFile === 7) newCastlingRights.whiteKingSide = false;
            } else {
                if (fromFile === 0) newCastlingRights.blackQueenSide = false;
                if (fromFile === 7) newCastlingRights.blackKingSide = false;
            }
        }

        // Update castling rights if rook is captured
        if (capturedPiece?.type === "rook") {
            if (file === 0) {
                if (isWhiteTurn) newCastlingRights.blackQueenSide = false;
                else newCastlingRights.whiteQueenSide = false;
            }
            if (file === 7) {
                if (isWhiteTurn) newCastlingRights.blackKingSide = false;
                else newCastlingRights.whiteKingSide = false;
            }
        }

        // Set en passant target if pawn moves two squares
        if (movingPiece.type === "pawn") {
            const isBlack = movingPiece.color === "black";
            const startRank = isBlack ? 1 : 6;
            if (fromRank === startRank && Math.abs(rank - fromRank) === 2) {
                newEnPassantTarget = { rank: (fromRank + rank) / 2, file };
            }
        }

        // Check for pawn promotion
        if (needsPromotion(rank, movingPiece)) {
            setPromotionPending({ rank, file, color: movingPiece.color });
            setPosition(newBoard);
            setCastlingRights(newCastlingRights);
            setEnPassantTarget(newEnPassantTarget);
            setLastMove({
                from: { rank: fromRank, file: fromFile },
                to: { rank, file },
            });
            return; // Wait for promotion selection
        }

        // Create move notation
        const moveNotation = getMoveNotation(
            {
                piece: movingPiece,
                fromRank: fromRank,
                fromFile: fromFile,
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
        setCastlingRights(newCastlingRights);
        setEnPassantTarget(newEnPassantTarget);
        setLastMove({
            from: { rank: fromRank, file: fromFile },
            to: { rank, file },
        });

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
