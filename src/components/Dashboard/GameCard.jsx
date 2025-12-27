import { Link } from "react-router-dom";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Game Card Component
 * Redesigned game card with modern styling using theme system
 *
 * @param {Object} props
 * @param {Object} props.game - Game configuration object
 */
const GameCard = ({ game }) => {
  const theme = useTheme();

  return (
    <Link
      to={game.path}
      className="
        group
        relative
        block
        bg-slate-800/80
        backdrop-blur-sm
        rounded-2xl
        p-8
        border border-slate-700/50
        cursor-pointer
        transform
        transition-all
        duration-300
        hover:scale-105
        hover:border-blue-500/50
        hover:shadow-2xl
        hover:shadow-blue-500/20
        active:scale-95
        overflow-hidden
        no-underline
      "
    >
      {/* Background gradient on hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${
          game.color || theme.gradients.primary
        } opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
      ></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animated background */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
          <div className="relative text-7xl text-center group-hover:scale-110 transition-transform duration-300">
            {game.icon}
          </div>
        </div>

        {/* Game Name */}
        <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-blue-300 transition-colors duration-300">
          {game.name}
        </h3>

        {/* Description */}
        <p className="text-slate-300 text-sm text-center mb-6 line-clamp-2 min-h-[2.5rem]">
          {game.description}
        </p>

        {/* Category Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center px-4 py-2 bg-slate-700/50 text-slate-200 text-xs font-medium rounded-full border border-slate-600/50 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 group-hover:text-blue-300 transition-all duration-300">
            {game.category}
          </span>
        </div>

        {/* Play Button Indicator */}
        <div className="mt-6 flex items-center justify-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-sm font-medium mr-2">Play Now</span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* Shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </Link>
  );
};

export default GameCard;
