import { INITIAL_POSITION } from "../game/initialPosition";

/**
 * Custom hook for game control actions (undo, redo, new game)
 * 
 * Architecture:
 * - Handles game control logic
 * - Manages undo/redo operations
 * - Separates control logic from component
 */
export const useGameControls = ({
    moveStack,
    isWhiteTurn,
    moveHistory,
    isUndoingRef,
    setPosition,
    setMoveStack,
    setIsWhiteTurn,
    setMoveHistory,
    setCapturedPieces,
    resetGame,
    clearSelection,
}) => {
    const handleUndo = () => {
        const currentHistory =
            moveStack.length > 0 ? moveStack : [INITIAL_POSITION];
        if (currentHistory.length > 1) {
            isUndoingRef.current = true;
            const newHistory = currentHistory.slice(0, -1);
            const previousPosition = newHistory[newHistory.length - 1];
            setPosition(previousPosition);
            setMoveStack(newHistory);

            // Update turn (go back one move)
            setIsWhiteTurn(!isWhiteTurn);

            // Remove last move from history
            if (moveHistory.length > 0) {
                setMoveHistory(moveHistory.slice(0, -1));
            }

            clearSelection();
        }
    };

    const handleRedo = () => {
        // This would require storing future positions, which is more complex
        // For now, we'll keep it simple and disable redo after new moves
        // A full implementation would require a separate redo stack
    };

    const handleNewGame = () => {
        resetGame();
        setMoveHistory([]);
        setCapturedPieces({ white: [], black: [] });
        clearSelection();
    };

    const currentMoveIndex =
        (moveStack.length > 0 ? moveStack : [INITIAL_POSITION]).length - 1;

    return {
        handleUndo,
        handleRedo,
        handleNewGame,
        currentMoveIndex,
    };
};

