import React, { useState } from "react";
import { useTheme } from "../../theme/ThemeProvider";

/**
 * Theme Selector Component
 *
 * Compact theme switcher for the navbar
 *
 * Architecture:
 * - Uses ThemeContext for theme management
 * - Dropdown/popover style selector
 * - Shows current theme
 */
const ThemeSelector = () => {
  const { chessTheme, chessThemes, changeChessTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Theme Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-slate-700/50"
        style={{
          color: `var(--sidebar-text-primary, #f1f5f9)`,
        }}
        title="Change Theme"
      >
        <span className="text-xl">🎨</span>
        <span className="hidden md:inline text-sm font-medium">
          {chessThemes[chessTheme]?.name || "Theme"}
        </span>
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Dropdown */}
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-xl border z-50"
            style={{
              background: `var(--sidebar-card-bg, linear-gradient(to bottom right, #1e293b, #334155))`,
              borderColor: `var(--sidebar-border, #475569)`,
            }}
          >
            <div className="p-2 space-y-1">
              {Object.entries(chessThemes).map(([key, theme]) => (
                <button
                  key={key}
                  onClick={() => {
                    changeChessTheme(key);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    chessTheme === key ? "ring-2" : "hover:opacity-80"
                  }`}
                  style={{
                    background:
                      chessTheme === key
                        ? `var(--btn-primary, linear-gradient(to right, #3b82f6, #2563eb))`
                        : "transparent",
                    borderColor:
                      chessTheme === key
                        ? `var(--accent-primary-light, #60a5fa)`
                        : "transparent",
                    color: `var(--sidebar-text-primary, #f1f5f9)`,
                  }}
                  onMouseEnter={(e) => {
                    if (chessTheme !== key) {
                      e.target.style.backgroundColor = `var(--card-hover, rgba(51, 65, 85, 0.5))`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (chessTheme !== key) {
                      e.target.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;
