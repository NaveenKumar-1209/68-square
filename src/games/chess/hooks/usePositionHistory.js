import { useEffect, useRef } from "react";
import { INITIAL_POSITION } from "../game/initialPosition";

/**
 * Custom hook for managing position history (for undo/redo functionality)
 * 
 * Architecture:
 * - Tracks position changes without causing infinite loops
 * - Handles undo operations gracefully
 * - Maintains position history stack
 */
export const usePositionHistory = (position, moveStack, setMoveStack) => {
    const positionRef = useRef(JSON.stringify(position));
    const isUndoingRef = useRef(false);
    const isInitialMount = useRef(true);
    const moveStackRef = useRef(moveStack);

    // Initialize position history on mount
    useEffect(() => {
        if (moveStack.length === 0) {
            setMoveStack([JSON.parse(JSON.stringify(INITIAL_POSITION))]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Keep moveStackRef in sync with moveStack
    useEffect(() => {
        moveStackRef.current = moveStack;
    }, [moveStack]);

    // Update position history when position changes (but not from undo)
    useEffect(() => {
        // Skip on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            positionRef.current = JSON.stringify(position);
            return;
        }

        // Skip if this is from an undo operation
        if (isUndoingRef.current) {
            isUndoingRef.current = false;
            positionRef.current = JSON.stringify(position);
            return;
        }

        // Only update if position actually changed
        const currentPositionStr = JSON.stringify(position);
        if (positionRef.current !== currentPositionStr) {
            const currentHistory =
                moveStackRef.current.length > 0
                    ? moveStackRef.current
                    : [INITIAL_POSITION];
            const newHistory = [
                ...currentHistory,
                JSON.parse(JSON.stringify(position)),
            ];
            setMoveStack(newHistory);
            positionRef.current = currentPositionStr;
        }
    }, [position, setMoveStack]);

    return {
        isUndoingRef,
    };
};

