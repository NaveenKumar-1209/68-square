import { useEffect } from "react";
import { checkIsMate } from "../utils/checkMate";
import { isKingInCheck } from "../utils/checkDetection";
import { isStalemate as checkIsStalemate } from "../utils/stalemate";

/**
 * Custom hook for managing game status (check, checkmate, stalemate)
 * 
 * Architecture:
 * - Monitors position and turn changes
 * - Updates game status in the store
 * - Separates game status logic from component
 */
export const useGameStatus = (position, isWhiteTurn, setIsInCheck, setIsCheckMate, setIsStalemate) => {
    useEffect(() => {
        const currentPlayerColor = isWhiteTurn ? "white" : "black";

        // Check if current player is in check
        const currentInCheck = isKingInCheck(position, currentPlayerColor);
        setIsInCheck(currentInCheck);

        // Check if CURRENT player (whose turn it is) is in checkmate
        // This checks if the player whose turn it is can make any legal moves
        // If they can't and are in check, it's checkmate
        const currentPlayerCheckMate = checkIsMate(position, isWhiteTurn);
        setIsCheckMate(currentPlayerCheckMate);

        // Check if current player is in stalemate
        const currentStalemate = checkIsStalemate(position, isWhiteTurn);
        setIsStalemate(currentStalemate);
        // Note: Action setters are stable and don't need to be in dependencies
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, isWhiteTurn]);
};

