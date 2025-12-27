

export const getPawnMoves = (rank, file, piece, position) => {
    const moves = [];
    if (piece.color === "black") {
        if (rank === 1) {
            moves.push({ rank: rank + 2, file: file });
        }
        moves.push({ rank: rank + 1, file: file });
    } else {
        if (rank === 6) {
            moves.push({ rank: rank - 2, file: file });
        }
        moves.push({ rank: rank - 1, file: file });
    }
    return moves;
}

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
        const { rank, file } = move;
        if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
            moves.push(move);
        }
    }
    return moves;
}

export const getBishopMoves = (rank, file, piece, position) => {
    const moves = [];
    const bishopMoves = [
        { rank: rank + 1, file: file + 1 },
        { rank: rank + 1, file: file - 1 },
        { rank: rank - 1, file: file + 1 },
        { rank: rank - 1, file: file - 1 },
    ];
    for (const move of bishopMoves) {
        const { rank, file } = move;
        if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
            moves.push(move);
        }
    }
    return moves;
}

export const getRookMoves = (rank, file, piece, position) => {
    const moves = [];
    const rookMoves = [
        { rank: rank + 1, file: file },
        { rank: rank - 1, file: file },
        { rank: rank, file: file + 1 },
        { rank: rank, file: file - 1 },
    ];
    for (const move of rookMoves) {
        const { rank, file } = move;
        if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
            moves.push(move);
        }
    }
    return moves;
}

export const getQueenMoves = (rank, file, piece, position) => {
    const moves = [];
    const queenMoves = [
        { rank: rank + 1, file: file + 1 },
        { rank: rank + 1, file: file - 1 },
        { rank: rank - 1, file: file + 1 },
        { rank: rank - 1, file: file - 1 },
        { rank: rank + 1, file: file },
        { rank: rank - 1, file: file },
        { rank: rank, file: file + 1 },
        { rank: rank, file: file - 1 },
    ];
    for (const move of queenMoves) {
        const { rank, file } = move;
        if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
            moves.push(move);
        }
    }
    return moves;
}

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
        const { rank, file } = move;
        if (rank >= 0 && rank <= 7 && file >= 0 && file <= 7) {
            moves.push(move);
        }
    }
    return moves;
}
