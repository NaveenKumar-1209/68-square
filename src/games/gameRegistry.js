/**
 * Game Registry
 * Central registry for all available games in the application
 *
 * Architecture:
 * - Each game has a unique ID, name, description, icon, and route path
 * - Games are organized in a monorepo structure (each game in its own folder)
 * - Routes are defined here for React Router
 */

/**
 * Game configuration structure
 * @typedef {Object} GameConfig
 * @property {string} id - Unique identifier for the game
 * @property {string} name - Display name of the game
 * @property {string} description - Brief description of the game
 * @property {string} icon - Unicode emoji or icon for the game
 * @property {string} path - Route path (e.g., '/games/chess')
 * @property {string} category - Game category (e.g., 'board', 'card', 'puzzle')
 * @property {string} color - Tailwind gradient classes for card
 */

/**
 * Available games registry
 * Add new games here to make them available in the dashboard
 */
export const GAMES = [
    {
        id: "chess",
        name: "Chess",
        description: "Classic strategy board game. Play against a friend or practice your skills.",
        icon: "♟️",
        path: "/games/chess",
        category: "board",
        color: "from-blue-600 to-blue-800",
    },
    // Future games can be added here:
    // {
    //   id: "checkers",
    //   name: "Checkers",
    //   description: "Classic checkers game for two players.",
    //   icon: "🔴",
    //   path: "/games/checkers",
    //   category: "board",
    //   color: "from-red-600 to-red-800",
    // },
];

/**
 * Get game by ID
 * @param {string} gameId - The game identifier
 * @returns {GameConfig|null} Game configuration or null if not found
 */
export const getGameById = (gameId) => {
    return GAMES.find((game) => game.id === gameId) || null;
};

/**
 * Get game by path
 * @param {string} path - The route path
 * @returns {GameConfig|null} Game configuration or null if not found
 */
export const getGameByPath = (path) => {
    return GAMES.find((game) => game.path === path) || null;
};

/**
 * Get all games
 * @returns {GameConfig[]} Array of all game configurations
 */
export const getAllGames = () => {
    return GAMES;
};

/**
 * Get games by category
 * @param {string} category - The game category
 * @returns {GameConfig[]} Array of games in the specified category
 */
export const getGamesByCategory = (category) => {
    return GAMES.filter((game) => game.category === category);
};
