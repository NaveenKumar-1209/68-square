import { useChessStore } from "../store/store";
import { getRankFile, getSquareId } from "../utils/conversion";
import {
  getPawnMoves,
  getKnightMoves,
  getBishopMoves,
  getRookMoves,
  getQueenMoves,
  getKingMoves,
} from "../utils/suggestedMoves";
import { getEnPassantMoves, getCastlingMoves } from "../utils/specialMoves";
import {
  wouldMoveLeaveKingInCheck,
  isSquareUnderAttack,
  isKingInCheck,
} from "../utils/checkDetection";

/**
 * Custom hook for calculating suggested moves
 * calculate suggested moves without using third party library
 */
export const useSuggestedMove = () => {
  const { position, setSuggestedMoves, castlingRights, enPassantTarget } =
    useChessStore();
  const calculateSuggestedMoves = (squareId) => {
    if (!squareId) {
      setSuggestedMoves([]);
      return;
    }
    const { rank, file } = getRankFile(squareId);
    const piece = position[rank][file];
    if (!piece) return;
    const moves = getLegalMoves(
      rank,
      file,
      piece,
      position,
      castlingRights,
      enPassantTarget
    );
    const suggestedSquares = moves.map((move) =>
      getSquareId(move.rank, move.file)
    );
    setSuggestedMoves(suggestedSquares);
  };

  return {
    calculateSuggestedMoves: calculateSuggestedMoves,
  };
};

const getLegalMoves = (
  rank,
  file,
  piece,
  position,
  castlingRights,
  enPassantTarget
) => {
  const moves = [];
  switch (piece.type) {
    case "pawn":
      moves.push(...getPawnMoves(rank, file, piece, position));
      // Add en passant moves if available
      if (enPassantTarget) {
        const enPassantMoves = getEnPassantMoves(
          rank,
          file,
          piece,
          position,
          enPassantTarget
        );
        moves.push(...enPassantMoves);
      }
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
      // Get regular king moves
      const kingMoves = getKingMoves(rank, file, piece, position);
      // Filter out moves to squares under attack
      const safeKingMoves = kingMoves.filter((move) => {
        return !isSquareUnderAttack(
          position,
          move.rank,
          move.file,
          piece.color
        );
      });
      moves.push(...safeKingMoves);

      // Add castling moves if available
      if (castlingRights) {
        const castlingMoves = getCastlingMoves(
          rank,
          file,
          piece.color,
          position,
          castlingRights
        );
        moves.push(...castlingMoves);
      }
      break;

    default:
      break;
  }

  // Filter all moves to ensure they don't leave the king in check
  const legalMoves = moves.filter((move) => {
    // For castling, validate the final position doesn't leave king in check
    if (move.type === "castling") {
      // Create temp board for castling
      const tempBoard = position.map((row) => [...row]);
      // Move king
      tempBoard[move.rank][move.file] = piece;
      tempBoard[rank][file] = null;
      // Move rook
      const rook = tempBoard[move.rookFrom.rank][move.rookFrom.file];
      tempBoard[move.rookTo.rank][move.rookTo.file] = rook;
      tempBoard[move.rookFrom.rank][move.rookFrom.file] = null;

      // Check if king is in check after castling
      return !isKingInCheck(tempBoard, piece.color);
    }

    // For en passant, we need to check if it leaves king in check
    if (move.type === "en-passant") {
      // Create temp board for en passant
      const tempBoard = position.map((row) => [...row]);
      tempBoard[move.rank][move.file] = piece;
      tempBoard[rank][file] = null;
      tempBoard[move.captureRank][move.captureFile] = null;

      // Check if king is in check after en passant
      return !isKingInCheck(tempBoard, piece.color);
    }

    // For regular moves, check if they leave king in check
    return !wouldMoveLeaveKingInCheck(
      position,
      piece,
      rank,
      file,
      move.rank,
      move.file
    );
  });

  return legalMoves;
};
