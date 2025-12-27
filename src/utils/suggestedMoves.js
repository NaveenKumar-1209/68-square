
/**
 * Get valid pawn moves
 * Pawns move forward one square (or two from starting position)
 * and capture diagonally one square forward
 */
export const getPawnMoves = (rank, file, piece, position) => {
    const moves = [];
    const isBlack = piece.color === "black";
    const direction = isBlack ? 1 : -1;
    const startRank = isBlack ? 1 : 6;

    // Forward move: one square (must be empty)
    const oneSquareForward = rank + direction;
    if (oneSquareForward >= 0 && oneSquareForward <= 7) {
        if (!position[oneSquareForward][file]) {
            moves.push({ rank: oneSquareForward, file });

            // Two-square move from starting position (both squares must be empty)
            if (rank === startRank) {
                const twoSquaresForward = rank + (2 * direction);
                if (twoSquaresForward >= 0 && twoSquaresForward <= 7) {
                    if (!position[twoSquaresForward][file]) {
                        moves.push({ rank: twoSquaresForward, file });
                    }
                }
            }
        }
    }

    // Diagonal captures (must have enemy piece)
    const captureRanks = [rank + direction];
    const captureFiles = [file + 1, file - 1];

    for (const captureRank of captureRanks) {
        for (const captureFile of captureFiles) {
            if (captureRank >= 0 && captureRank <= 7 && captureFile >= 0 && captureFile <= 7) {
                const targetPiece = position[captureRank][captureFile];
                if (targetPiece && targetPiece.color !== piece.color) {
                    moves.push({ rank: captureRank, file: captureFile });
                }
            }
        }
    }

    return moves;
}

/**
 * Get valid knight moves
 * Knights move in L-shapes: 2 squares in one direction, 1 square perpendicular
 * Can jump over pieces, but cannot land on same-color pieces
 */
export const getKnightMoves = (rank, file, piece, position) => {
    const moves = [];
    const knightMoves = [
        { rank: rank + 2, file: file + 1 },
        { rank: rank + 2, file: file - 1 },
        { rank: rank - 2, file: file + 1 },
        { rank: rank - 2, file: file - 1 },
        { rank: rank + 1, file: file + 2 },
        { rank: rank + 1, file: file - 2 },
        { rank: rank - 1, file: file + 2 },
        { rank: rank - 1, file: file - 2 },
    ];

    for (const move of knightMoves) {
        const { rank: targetRank, file: targetFile } = move;
        if (targetRank >= 0 && targetRank <= 7 && targetFile >= 0 && targetFile <= 7) {
            const targetPiece = position[targetRank][targetFile];
            // Can move to empty square or capture enemy piece
            if (!targetPiece || targetPiece.color !== piece.color) {
                moves.push(move);
            }
        }
    }

    return moves;
}

/**
 * Get valid bishop moves
 * Bishops move diagonally in all four directions until blocked
 * Can capture enemy pieces but stop at them
 */
export const getBishopMoves = (rank, file, piece, position) => {
    const moves = [];
    const directions = [
        { rankDelta: 1, fileDelta: 1 },   // Down-right
        { rankDelta: 1, fileDelta: -1 },  // Down-left
        { rankDelta: -1, fileDelta: 1 },  // Up-right
        { rankDelta: -1, fileDelta: -1 }, // Up-left
    ];

    for (const { rankDelta, fileDelta } of directions) {
        let currentRank = rank + rankDelta;
        let currentFile = file + fileDelta;

        while (currentRank >= 0 && currentRank <= 7 && currentFile >= 0 && currentFile <= 7) {
            const targetPiece = position[currentRank][currentFile];

            if (!targetPiece) {
                // Empty square - can move here
                moves.push({ rank: currentRank, file: currentFile });
            } else {
                // Square occupied
                if (targetPiece.color !== piece.color) {
                    // Enemy piece - can capture but then stop
                    moves.push({ rank: currentRank, file: currentFile });
                }
                // Stop at any piece (friendly or enemy after capture)
                break;
            }

            currentRank += rankDelta;
            currentFile += fileDelta;
        }
    }

    return moves;
}

/**
 * Get valid rook moves
 * Rooks move horizontally and vertically until blocked
 * Can capture enemy pieces but stop at them
 */
export const getRookMoves = (rank, file, piece, position) => {
    const moves = [];
    const directions = [
        { rankDelta: 1, fileDelta: 0 },   // Down
        { rankDelta: -1, fileDelta: 0 }, // Up
        { rankDelta: 0, fileDelta: 1 },  // Right
        { rankDelta: 0, fileDelta: -1 }, // Left
    ];

    for (const { rankDelta, fileDelta } of directions) {
        let currentRank = rank + rankDelta;
        let currentFile = file + fileDelta;

        while (currentRank >= 0 && currentRank <= 7 && currentFile >= 0 && currentFile <= 7) {
            const targetPiece = position[currentRank][currentFile];

            if (!targetPiece) {
                // Empty square - can move here
                moves.push({ rank: currentRank, file: currentFile });
            } else {
                // Square occupied
                if (targetPiece.color !== piece.color) {
                    // Enemy piece - can capture but then stop
                    moves.push({ rank: currentRank, file: currentFile });
                }
                // Stop at any piece (friendly or enemy after capture)
                break;
            }

            currentRank += rankDelta;
            currentFile += fileDelta;
        }
    }

    return moves;
}

/**
 * Get valid queen moves
 * Queens combine bishop and rook movement: diagonally, horizontally, and vertically
 * Moves until blocked, can capture enemy pieces
 */
export const getQueenMoves = (rank, file, piece, position) => {
    const moves = [];
    const directions = [
        { rankDelta: 1, fileDelta: 1 },   // Down-right
        { rankDelta: 1, fileDelta: -1 },  // Down-left
        { rankDelta: -1, fileDelta: 1 },  // Up-right
        { rankDelta: -1, fileDelta: -1 }, // Up-left
        { rankDelta: 1, fileDelta: 0 },   // Down
        { rankDelta: -1, fileDelta: 0 },  // Up
        { rankDelta: 0, fileDelta: 1 },   // Right
        { rankDelta: 0, fileDelta: -1 },  // Left
    ];

    for (const { rankDelta, fileDelta } of directions) {
        let currentRank = rank + rankDelta;
        let currentFile = file + fileDelta;

        while (currentRank >= 0 && currentRank <= 7 && currentFile >= 0 && currentFile <= 7) {
            const targetPiece = position[currentRank][currentFile];

            if (!targetPiece) {
                // Empty square - can move here
                moves.push({ rank: currentRank, file: currentFile });
            } else {
                // Square occupied
                if (targetPiece.color !== piece.color) {
                    // Enemy piece - can capture but then stop
                    moves.push({ rank: currentRank, file: currentFile });
                }
                // Stop at any piece (friendly or enemy after capture)
                break;
            }

            currentRank += rankDelta;
            currentFile += fileDelta;
        }
    }

    return moves;
}

/**
 * Get valid king moves
 * Kings move one square in any direction (diagonally, horizontally, or vertically)
 * Cannot move to squares occupied by same-color pieces
 * Note: Castling and check validation are not included here
 */
export const getKingMoves = (rank, file, piece, position) => {
    const moves = [];
    const kingMoves = [
        { rank: rank + 1, file: file + 1 },
        { rank: rank + 1, file: file - 1 },
        { rank: rank - 1, file: file + 1 },
        { rank: rank - 1, file: file - 1 },
        { rank: rank + 1, file: file },
        { rank: rank - 1, file: file },
        { rank: rank, file: file + 1 },
        { rank: rank, file: file - 1 },
    ];

    for (const move of kingMoves) {
        const { rank: targetRank, file: targetFile } = move;
        if (targetRank >= 0 && targetRank <= 7 && targetFile >= 0 && targetFile <= 7) {
            const targetPiece = position[targetRank][targetFile];
            // Can move to empty square or capture enemy piece
            if (!targetPiece || targetPiece.color !== piece.color) {
                moves.push(move);
            }
        }
    }

    return moves;
}

