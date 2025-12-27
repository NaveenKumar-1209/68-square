import { getAllGames } from "../games/gameRegistry";
import GameCard from "../components/Dashboard/GameCard";
import { useTheme } from "../theme/ThemeProvider";

/**
 * Dashboard Page
 * Redesigned main landing page displaying all available games
 *
 * Architecture:
 * - Modern hero section with gradient background
 * - Featured games section with enhanced cards
 * - Statistics and info sections
 * - Uses centralized theme system
 */
const Dashboard = () => {
  const games = getAllGames();
  const theme = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradients.hero}`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-white/90 text-sm font-medium">
                🎮 Welcome to Game Center
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Play. Compete.
              <span className="block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                Conquer.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover amazing games and challenge yourself with classic board
              games and modern puzzles
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#games"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explore Games
              </a>
              <a
                href="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-16 relative z-10">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
            <div className="text-4xl mb-3">🎯</div>
            <div className="text-3xl font-bold text-white mb-2">
              {games.length}+
            </div>
            <div className="text-slate-300">Available Games</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-slate-300">Free to Play</div>
          </div>
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 shadow-xl">
            <div className="text-4xl mb-3">🌟</div>
            <div className="text-3xl font-bold text-white mb-2">24/7</div>
            <div className="text-slate-300">Always Available</div>
          </div>
        </div>
      </div>

      {/* Games Section */}
      <div id="games" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Games
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose from our collection of classic and modern games
          </p>
        </div>

        {games.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-6xl mb-4">🎲</div>
              <p className="text-slate-300 text-lg">
                No games available at the moment.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div
          className={`max-w-4xl mx-auto bg-gradient-to-r ${theme.gradients.primary} rounded-3xl p-12 text-center relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Playing?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of players enjoying our games every day
            </p>
            <a
              href="#games"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse All Games
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
