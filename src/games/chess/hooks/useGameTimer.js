import { useState, useEffect, useRef } from "react";

/**
 * Custom hook for game timer
 * 
 * Architecture:
 * - Tracks time for each player
 * - Pauses when game is over
 * - Provides formatted time display
 */
export const useGameTimer = (isWhiteTurn, isCheckMate, isStalemate, isGameActive = true) => {
    const [whiteTime, setWhiteTime] = useState(600); // 10 minutes in seconds
    const [blackTime, setBlackTime] = useState(600);
    const intervalRef = useRef(null);
    const lastTurnRef = useRef(isWhiteTurn);

    // Derive running state from props
    const isRunning = isGameActive && !isCheckMate && !isStalemate;

    // Switch timer when turn changes
    useEffect(() => {
        if (lastTurnRef.current !== isWhiteTurn && isRunning) {
            lastTurnRef.current = isWhiteTurn;
        }
    }, [isWhiteTurn, isRunning]);

    // Timer countdown
    useEffect(() => {
        if (isRunning && !isCheckMate && !isStalemate) {
            intervalRef.current = setInterval(() => {
                if (isWhiteTurn) {
                    setWhiteTime((prev) => {
                        if (prev <= 1) {
                            return 0;
                        }
                        return prev - 1;
                    });
                } else {
                    setBlackTime((prev) => {
                        if (prev <= 1) {
                            return 0;
                        }
                        return prev - 1;
                    });
                }
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning, isWhiteTurn, isCheckMate, isStalemate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const resetTimer = (whiteSeconds = 600, blackSeconds = 600) => {
        setWhiteTime(whiteSeconds);
        setBlackTime(blackSeconds);
        lastTurnRef.current = isWhiteTurn;
    };

    return {
        whiteTime: formatTime(whiteTime),
        blackTime: formatTime(blackTime),
        whiteTimeSeconds: whiteTime,
        blackTimeSeconds: blackTime,
        resetTimer,
    };
};

