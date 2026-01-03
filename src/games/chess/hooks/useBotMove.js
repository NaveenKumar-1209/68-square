import { useEffect, useRef } from "react";
import { getBotMove } from "../utils/chessBot";
import { getSquareId } from "../utils/conversion";

/**
 * Custom hook for bot move execution
 * 
 * Architecture:
 * - Monitors game state for bot's turn
 * - Automatically makes bot move when it's bot's turn
 * - Handles delays for better UX
 */
export const useBotMove = ({
    gameMode,
    botColor,
    position,
    isWhiteTurn,
    isCheckMate,
    isStalemate,
    promotionPending,
    castlingRights,
    enPassantTarget,
    executeMove,
    setPromotionPending,
    setPosition,
    setIsWhiteTurn,
    clearSelection,
}) => {
    const isBotThinkingRef = useRef(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Clear any pending timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Handle bot promotion - always promote to queen
        if (promotionPending && promotionPending.color === botColor) {
            const { rank, file } = promotionPending;
            const newBoard = position.map((row) => [...row]);
            newBoard[rank][file] = {
                type: "queen",
                color: promotionPending.color,
            };
            setPosition(newBoard);
            setPromotionPending(null);
            setIsWhiteTurn(!isWhiteTurn);
            clearSelection();
            return;
        }

        // Only proceed if:
        // 1. Game mode is one-player
        // 2. It's the bot's turn
        // 3. Game is not over
        // 4. No promotion pending (for human player)
        // 5. Bot is not already thinking
        if (
            gameMode !== "one-player" ||
            (isWhiteTurn && botColor !== "white") ||
            (!isWhiteTurn && botColor !== "black") ||
            isCheckMate ||
            isStalemate ||
            (promotionPending && promotionPending.color !== botColor) ||
            isBotThinkingRef.current
        ) {
            return;
        }

        // Set thinking flag
        isBotThinkingRef.current = true;

        // Add a small delay for better UX (makes it feel more natural)
        timeoutRef.current = setTimeout(() => {
            try {
                // Get bot's move
                const botMove = getBotMove(
                    position,
                    botColor,
                    castlingRights,
                    enPassantTarget
                );

                if (botMove) {
                    const squareId = getSquareId(botMove.to.rank, botMove.to.file);
                    executeMove(
                        squareId,
                        botMove.to.rank,
                        botMove.to.file,
                        botMove.specialMove
                    );
                }
            } catch (error) {
                console.error("Bot move error:", error);
            } finally {
                // Reset thinking flag after a short delay
                setTimeout(() => {
                    isBotThinkingRef.current = false;
                }, 100);
            }
        }, 500); // 500ms delay for bot "thinking"

        // Cleanup
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            isBotThinkingRef.current = false;
        };
    }, [
        gameMode,
        botColor,
        position,
        isWhiteTurn,
        isCheckMate,
        isStalemate,
        promotionPending,
        castlingRights,
        enPassantTarget,
        executeMove,
        setPromotionPending,
        setPosition,
        setIsWhiteTurn,
        clearSelection,
    ]);
};

