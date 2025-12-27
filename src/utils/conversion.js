

/**
 * Convert rank/file indices to chess notation (e.g., 'a1', 'e4')
 */
export const getSquareId = (rank, file) => {
    const fileLetter = String.fromCharCode(97 + file); // a-h
    const rankNumber = 8 - rank; // 1-8
    return `${fileLetter}${rankNumber}`;
};

export const getRankFile = (squareId) => {
    const file = squareId.charCodeAt(0) - 97; // 0-7
    const rank = 8 - parseInt(squareId[1]); // 0-7
    return { rank, file };
};