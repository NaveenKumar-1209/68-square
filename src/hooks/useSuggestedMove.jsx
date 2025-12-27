import { useStore } from "../store/store";
import { getRankFile, getSquareId } from "../utils/conversion";
import { getPawnMoves, getKnightMoves, getBishopMoves, getRookMoves, getQueenMoves, getKingMoves } from "../utils/suggestedMoves";
//calculate suggested moves without using third party library 
export const useSuggestedMove = () => {
    const { position, setSuggestedMoves } = useStore();
    const calculateSuggestedMoves = (squareId) => {
        if (!squareId) {
            setSuggestedMoves([]);
            return;
        };
        const { rank, file } = getRankFile(squareId);
        const piece = position[rank][file];
        if (!piece) return;
        const moves = getLegalMoves(rank, file, piece, position);
        const suggestedSquares = moves.map(move => getSquareId(move.rank, move.file));
        setSuggestedMoves(suggestedSquares);
    }

    return {
        calculateSuggestedMoves: calculateSuggestedMoves
    }
}

const getLegalMoves = (rank, file, piece, position) => {
    const moves = [];
    switch (piece.type) {
        case "pawn":
            moves.push(...getPawnMoves(rank, file, piece, position));
            break;
        case "knight":
            moves.push(...getKnightMoves(rank, file, piece, position));
            break;
        case "bishop":
            moves.push(...getBishopMoves(rank, file, piece, position));
            break;
        case "rook":
            moves.push(...getRookMoves(rank, file, piece, position));
            break;
        case "queen":
            moves.push(...getQueenMoves(rank, file, piece, position));
            break;
        case "king":
            moves.push(...getKingMoves(rank, file, piece, position));
            break;

        default:
            break;
    }
    return moves;
}