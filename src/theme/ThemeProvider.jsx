import { createContext, useContext, useState, useEffect } from "react";
import theme from "./theme";

/**
 * Enhanced Theme Context
 * Provides theme configuration and switching functionality throughout the application
 *
 * Features:
 * - Multiple theme presets for chess game
 * - Global theme switching
 * - Theme persistence
 * - Applies to all pages (Dashboard, AboutUs, Contact, Chess, etc.)
 */

const ThemeContext = createContext(theme);

// Chess game theme presets
const chessThemes = {
  warm: {
    name: "Warm Classic",
    // Board Colors
    "--board-light-square":
      "linear-gradient(to bottom right, #faf8f3, #f5f1e8)",
    "--board-dark-square": "linear-gradient(to bottom right, #8b6f47, #6b5639)",
    "--board-frame": "linear-gradient(to bottom right, #3d3526, #2a2319)",
    "--board-border": "#5a4a35",
    "--board-coordinates": "#c9b99b",
    // Sidebar Colors
    "--sidebar-bg": "linear-gradient(to bottom, #1a1815, #25221e, #1a1815)",
    "--sidebar-card-bg": "linear-gradient(to bottom right, #2a2722, #3a3630)",
    "--sidebar-border": "#4a453d",
    "--sidebar-text-primary": "#f5f3f0",
    "--sidebar-text-secondary": "#d4cfc7",
    "--sidebar-text-muted": "#9a9489",
    // Accent Colors
    "--accent-primary": "#d4a574",
    "--accent-primary-hover": "#c49564",
    "--accent-primary-light": "#e4b584",
    "--accent-primary-dark": "#b88554",
    "--accent-secondary": "#8b6f47",
    "--accent-secondary-hover": "#7a5f3a",
    // Status Colors
    "--status-checkmate": "linear-gradient(to right, #c2410c, #9a3412)",
    "--status-check": "linear-gradient(to right, #d97706, #b45309)",
    "--status-stalemate": "linear-gradient(to right, #a16207, #854d0e)",
    "--status-progress": "linear-gradient(to right, #65a30d, #4d7c0f)",
    "--status-checkmate-border": "#dc2626",
    "--status-check-border": "#f59e0b",
    "--status-stalemate-border": "#ca8a04",
    "--status-progress-border": "#84cc16",
    // Interactive Colors
    "--selected-square": "#d4a574",
    "--selected-square-shadow": "rgba(212, 165, 116, 0.5)",
    "--suggested-move": "#d4a574",
    "--suggested-move-opacity": "0.7",
    "--last-move": "rgba(212, 165, 116, 0.25)",
    "--last-move-border": "rgba(212, 165, 116, 0.4)",
    "--check-highlight": "rgba(220, 38, 38, 0.9)",
    "--check-border": "#b91c1c",
    "--check-shadow": "rgba(220, 38, 38, 0.7)",
    // Button Colors
    "--btn-primary": "linear-gradient(to right, #d4a574, #c49564)",
    "--btn-primary-hover": "linear-gradient(to right, #c49564, #b88554)",
    "--btn-success": "linear-gradient(to right, #65a30d, #4d7c0f)",
    "--btn-success-hover": "linear-gradient(to right, #4d7c0f, #3f6212)",
    "--btn-disabled-bg": "#3a3630",
    "--btn-disabled-text": "#6b6560",
    // Card Colors
    "--card-bg": "linear-gradient(to bottom right, #2a2722, #3a3630)",
    "--card-border": "#4a453d",
    "--card-hover": "#3a3630",
    // Scrollbar Colors
    "--scrollbar-track": "rgba(58, 54, 48, 0.5)",
    "--scrollbar-thumb": "rgba(212, 165, 116, 0.5)",
    "--scrollbar-thumb-hover": "rgba(212, 165, 116, 0.7)",
  },
  modern: {
    name: "Modern Dark",
    "--board-light-square":
      "linear-gradient(to bottom right, #e5e7eb, #f3f4f6)",
    "--board-dark-square": "linear-gradient(to bottom right, #374151, #1f2937)",
    "--board-frame": "linear-gradient(to bottom right, #111827, #0f172a)",
    "--board-border": "#4b5563",
    "--board-coordinates": "#9ca3af",
    "--sidebar-bg": "linear-gradient(to bottom, #0f172a, #1e293b, #0f172a)",
    "--sidebar-card-bg": "linear-gradient(to bottom right, #1e293b, #334155)",
    "--sidebar-border": "#475569",
    "--sidebar-text-primary": "#f1f5f9",
    "--sidebar-text-secondary": "#cbd5e1",
    "--sidebar-text-muted": "#94a3b8",
    "--accent-primary": "#3b82f6",
    "--accent-primary-hover": "#2563eb",
    "--accent-primary-light": "#60a5fa",
    "--accent-primary-dark": "#1d4ed8",
    "--accent-secondary": "#10b981",
    "--accent-secondary-hover": "#059669",
    "--status-checkmate": "linear-gradient(to right, #dc2626, #b91c1c)",
    "--status-check": "linear-gradient(to right, #f59e0b, #d97706)",
    "--status-stalemate": "linear-gradient(to right, #f97316, #ea580c)",
    "--status-progress": "linear-gradient(to right, #10b981, #059669)",
    "--status-checkmate-border": "#ef4444",
    "--status-check-border": "#f59e0b",
    "--status-stalemate-border": "#f97316",
    "--status-progress-border": "#10b981",
    "--selected-square": "#3b82f6",
    "--selected-square-shadow": "rgba(59, 130, 246, 0.5)",
    "--suggested-move": "#3b82f6",
    "--suggested-move-opacity": "0.7",
    "--last-move": "rgba(59, 130, 246, 0.25)",
    "--last-move-border": "rgba(59, 130, 246, 0.4)",
    "--check-highlight": "rgba(220, 38, 38, 0.9)",
    "--check-border": "#b91c1c",
    "--check-shadow": "rgba(220, 38, 38, 0.7)",
    "--btn-primary": "linear-gradient(to right, #3b82f6, #2563eb)",
    "--btn-primary-hover": "linear-gradient(to right, #2563eb, #1d4ed8)",
    "--btn-success": "linear-gradient(to right, #10b981, #059669)",
    "--btn-success-hover": "linear-gradient(to right, #059669, #047857)",
    "--btn-disabled-bg": "#334155",
    "--btn-disabled-text": "#64748b",
    "--card-bg": "linear-gradient(to bottom right, #1e293b, #334155)",
    "--card-border": "#475569",
    "--card-hover": "#334155",
    "--scrollbar-track": "rgba(55, 65, 81, 0.5)",
    "--scrollbar-thumb": "rgba(59, 130, 246, 0.5)",
    "--scrollbar-thumb-hover": "rgba(59, 130, 246, 0.7)",
  },
  elegant: {
    name: "Elegant Green",
    "--board-light-square":
      "linear-gradient(to bottom right, #f0fdf4, #dcfce7)",
    "--board-dark-square": "linear-gradient(to bottom right, #166534, #14532d)",
    "--board-frame": "linear-gradient(to bottom right, #0f172a, #1e293b)",
    "--board-border": "#365314",
    "--board-coordinates": "#84cc16",
    "--sidebar-bg": "linear-gradient(to bottom, #0a0f1a, #1a1f2e, #0a0f1a)",
    "--sidebar-card-bg": "linear-gradient(to bottom right, #1e293b, #2d3748)",
    "--sidebar-border": "#4a5568",
    "--sidebar-text-primary": "#f7fafc",
    "--sidebar-text-secondary": "#e2e8f0",
    "--sidebar-text-muted": "#a0aec0",
    "--accent-primary": "#22c55e",
    "--accent-primary-hover": "#16a34a",
    "--accent-primary-light": "#4ade80",
    "--accent-primary-dark": "#15803d",
    "--accent-secondary": "#10b981",
    "--accent-secondary-hover": "#059669",
    "--status-checkmate": "linear-gradient(to right, #dc2626, #b91c1c)",
    "--status-check": "linear-gradient(to right, #f59e0b, #d97706)",
    "--status-stalemate": "linear-gradient(to right, #f97316, #ea580c)",
    "--status-progress": "linear-gradient(to right, #22c55e, #16a34a)",
    "--status-checkmate-border": "#ef4444",
    "--status-check-border": "#f59e0b",
    "--status-stalemate-border": "#f97316",
    "--status-progress-border": "#22c55e",
    "--selected-square": "#22c55e",
    "--selected-square-shadow": "rgba(34, 197, 94, 0.5)",
    "--suggested-move": "#22c55e",
    "--suggested-move-opacity": "0.7",
    "--last-move": "rgba(34, 197, 94, 0.25)",
    "--last-move-border": "rgba(34, 197, 94, 0.4)",
    "--check-highlight": "rgba(220, 38, 38, 0.9)",
    "--check-border": "#b91c1c",
    "--check-shadow": "rgba(220, 38, 38, 0.7)",
    "--btn-primary": "linear-gradient(to right, #22c55e, #16a34a)",
    "--btn-primary-hover": "linear-gradient(to right, #16a34a, #15803d)",
    "--btn-success": "linear-gradient(to right, #10b981, #059669)",
    "--btn-success-hover": "linear-gradient(to right, #059669, #047857)",
    "--btn-disabled-bg": "#2d3748",
    "--btn-disabled-text": "#718096",
    "--card-bg": "linear-gradient(to bottom right, #1e293b, #2d3748)",
    "--card-border": "#4a5568",
    "--card-hover": "#2d3748",
    "--scrollbar-track": "rgba(45, 55, 72, 0.5)",
    "--scrollbar-thumb": "rgba(34, 197, 94, 0.5)",
    "--scrollbar-thumb-hover": "rgba(34, 197, 94, 0.7)",
  },
  royal: {
    name: "Royal Purple",
    "--board-light-square":
      "linear-gradient(to bottom right, #faf5ff, #f3e8ff)",
    "--board-dark-square": "linear-gradient(to bottom right, #6b21a8, #581c87)",
    "--board-frame": "linear-gradient(to bottom right, #1e1b4b, #312e81)",
    "--board-border": "#7c3aed",
    "--board-coordinates": "#c084fc",
    "--sidebar-bg": "linear-gradient(to bottom, #0f0c1a, #1a1626, #0f0c1a)",
    "--sidebar-card-bg": "linear-gradient(to bottom right, #1e1b4b, #312e81)",
    "--sidebar-border": "#4c1d95",
    "--sidebar-text-primary": "#faf5ff",
    "--sidebar-text-secondary": "#e9d5ff",
    "--sidebar-text-muted": "#c084fc",
    "--accent-primary": "#a855f7",
    "--accent-primary-hover": "#9333ea",
    "--accent-primary-light": "#c084fc",
    "--accent-primary-dark": "#7e22ce",
    "--accent-secondary": "#8b5cf6",
    "--accent-secondary-hover": "#7c3aed",
    "--status-checkmate": "linear-gradient(to right, #dc2626, #b91c1c)",
    "--status-check": "linear-gradient(to right, #f59e0b, #d97706)",
    "--status-stalemate": "linear-gradient(to right, #f97316, #ea580c)",
    "--status-progress": "linear-gradient(to right, #a855f7, #9333ea)",
    "--status-checkmate-border": "#ef4444",
    "--status-check-border": "#f59e0b",
    "--status-stalemate-border": "#f97316",
    "--status-progress-border": "#a855f7",
    "--selected-square": "#a855f7",
    "--selected-square-shadow": "rgba(168, 85, 247, 0.5)",
    "--suggested-move": "#a855f7",
    "--suggested-move-opacity": "0.7",
    "--last-move": "rgba(168, 85, 247, 0.25)",
    "--last-move-border": "rgba(168, 85, 247, 0.4)",
    "--check-highlight": "rgba(220, 38, 38, 0.9)",
    "--check-border": "#b91c1c",
    "--check-shadow": "rgba(220, 38, 38, 0.7)",
    "--btn-primary": "linear-gradient(to right, #a855f7, #9333ea)",
    "--btn-primary-hover": "linear-gradient(to right, #9333ea, #7e22ce)",
    "--btn-success": "linear-gradient(to right, #10b981, #059669)",
    "--btn-success-hover": "linear-gradient(to right, #059669, #047857)",
    "--btn-disabled-bg": "#312e81",
    "--btn-disabled-text": "#8b5cf6",
    "--card-bg": "linear-gradient(to bottom right, #1e1b4b, #312e81)",
    "--card-border": "#4c1d95",
    "--card-hover": "#312e81",
    "--scrollbar-track": "rgba(49, 46, 129, 0.5)",
    "--scrollbar-thumb": "rgba(168, 85, 247, 0.5)",
    "--scrollbar-thumb-hover": "rgba(168, 85, 247, 0.7)",
  },
};

export const ThemeProvider = ({ children }) => {
  const [chessTheme, setChessTheme] = useState(() => {
    const savedTheme = localStorage.getItem("chess-theme");
    return savedTheme && chessThemes[savedTheme] ? savedTheme : "warm";
  });

  useEffect(() => {
    // Apply chess theme CSS variables to root
    const root = document.documentElement;
    const theme = chessThemes[chessTheme];

    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        if (key !== "name") {
          root.style.setProperty(key, value);
        }
      });

      localStorage.setItem("chess-theme", chessTheme);
    }
  }, [chessTheme]);

  const changeChessTheme = (themeName) => {
    if (chessThemes[themeName]) {
      setChessTheme(themeName);
    }
  };

  const value = {
    ...theme,
    chessTheme,
    chessThemes,
    chessThemeNames: Object.keys(chessThemes),
    changeChessTheme,
    currentChessThemeData: chessThemes[chessTheme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

/**
 * Hook to access theme
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return theme; // Fallback to default theme
  }
  return context;
};
