import { Link, useLocation } from "react-router-dom";
import { getGameByPath, getAllGames } from "../../games/gameRegistry";

/**
 * Navigation Bar Component
 * Displays navigation menu with current game and navigation links
 *
 * Architecture:
 * - Uses React Router's useLocation to detect current route
 * - Shows current game name when in a game
 * - Provides navigation links to all pages
 * - Sticky header that stays visible during navigation
 */
const NavBar = () => {
  const location = useLocation();
  const games = getAllGames();
  const currentGame = games.find((game) => game.path === location.pathname);
  const isGameActive = currentGame !== undefined;
  const isDashboard = location.pathname === "/";
  const isAboutUs = location.pathname === "/about";
  const isContact = location.pathname === "/contact";

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Home */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-200"
          >
            <span className="text-2xl">🎮</span>
            <span className="font-bold text-lg">Game Center</span>
          </Link>

          {/* Center: Current Game Info or Navigation Links */}
          {isGameActive && currentGame ? (
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{currentGame.icon}</span>
              <span className="text-white font-semibold text-lg">
                {currentGame.name}
              </span>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isDashboard
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isAboutUs
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isContact
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Contact
              </Link>
            </div>
          )}

          {/* Right: Back Button (when in a game) or Navigation (on other pages) */}
          {isGameActive ? (
            <Link
              to="/"
              className="
                px-4 py-2
                bg-slate-700
                hover:bg-slate-600
                text-white
                rounded-lg
                transition-colors
                duration-200
                font-medium
                flex items-center space-x-2
              "
            >
              <span>←</span>
              <span>Back to Games</span>
            </Link>
          ) : (
            <div className="flex md:hidden items-center space-x-4">
              <Link
                to="/about"
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isAboutUs
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isContact
                    ? "text-blue-400 font-semibold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
