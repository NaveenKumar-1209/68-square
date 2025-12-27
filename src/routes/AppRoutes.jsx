import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import AboutUs from "../Pages/AboutUs";
import Contact from "../Pages/Contact";
import ChessGame from "../games/chess/index";

/**
 * App Routes Component
 * Defines all routes for the application using React Router
 *
 * Architecture:
 * - Dashboard route: "/" - Shows all available games
 * - Page routes: "/about", "/contact" - Information pages
 * - Game routes: "/games/:gameId" - Individual game routes
 * - Each game is lazy-loaded and self-contained
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Dashboard - Landing page with all games */}
      <Route path="/" element={<Dashboard />} />

      {/* Page Routes */}
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />

      {/* Game Routes */}
      <Route path="/games/chess" element={<ChessGame />} />

      {/* Add more game routes here as you add games */}
      {/* <Route path="/games/checkers" element={<CheckersGame />} /> */}

      {/* 404 - Catch all unmatched routes */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">404</h1>
              <p className="text-slate-300 mb-4">Page not found</p>
              <a
                href="/"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                Go back to dashboard
              </a>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
