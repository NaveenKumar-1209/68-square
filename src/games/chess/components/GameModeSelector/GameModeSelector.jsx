import React from "react";

/**
 * Game Mode Selector Component
 *
 * Uses CSS variables from theme for easy customization
 */
const GameModeSelector = ({
  gameMode,
  botColor,
  onModeChange,
  onBotColorChange,
}) => {
  return (
    <div
      className="chess-card rounded-xl p-4 shadow-lg border"
      style={{
        background: `var(--card-bg)`,
        borderColor: `var(--card-border)`,
      }}
    >
      <h3
        className="text-xl font-bold mb-4 text-center"
        style={{ color: `var(--accent-primary)` }}
      >
        Game Mode
      </h3>

      <div className="space-y-3">
        {/* Two-Player Mode */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="gameMode"
            value="two-player"
            checked={gameMode === "two-player"}
            onChange={(e) => onModeChange(e.target.value)}
            className="mr-3 w-5 h-5"
            style={{
              accentColor: `var(--accent-primary)`,
            }}
          />
          <div
            className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
              gameMode === "two-player"
                ? "border-2"
                : "border-2 border-transparent group-hover:bg-slate-700"
            }`}
            style={{
              backgroundColor:
                gameMode === "two-player"
                  ? `rgba(6, 182, 212, 0.2)`
                  : `rgba(51, 65, 85, 0.5)`,
              borderColor:
                gameMode === "two-player"
                  ? `var(--accent-primary)`
                  : `transparent`,
            }}
          >
            <span
              style={{ color: `var(--sidebar-text-primary)` }}
              className="font-semibold"
            >
              👥 Two Players
            </span>
          </div>
        </label>

        {/* One-Player Mode */}
        <label className="flex items-center cursor-pointer group">
          <input
            type="radio"
            name="gameMode"
            value="one-player"
            checked={gameMode === "one-player"}
            onChange={(e) => onModeChange(e.target.value)}
            className="mr-3 w-5 h-5"
            style={{
              accentColor: `var(--accent-primary)`,
            }}
          />
          <div
            className={`flex-1 p-3 rounded-lg transition-all duration-200 ${
              gameMode === "one-player"
                ? "border-2"
                : "border-2 border-transparent group-hover:bg-slate-700"
            }`}
            style={{
              backgroundColor:
                gameMode === "one-player"
                  ? `rgba(6, 182, 212, 0.2)`
                  : `rgba(51, 65, 85, 0.5)`,
              borderColor:
                gameMode === "one-player"
                  ? `var(--accent-primary)`
                  : `transparent`,
            }}
          >
            <span
              style={{ color: `var(--sidebar-text-primary)` }}
              className="font-semibold"
            >
              🤖 Play vs Bot
            </span>
          </div>
        </label>

        {/* Bot Color Selection (only in one-player mode) */}
        {gameMode === "one-player" && (
          <div className="ml-8 mt-3 space-y-2 animate-fadeIn">
            <div
              className="text-sm mb-3 font-semibold"
              style={{ color: `var(--sidebar-text-secondary)` }}
            >
              You play as:
            </div>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="botColor"
                value="white"
                checked={botColor === "black"}
                onChange={() => onBotColorChange("black")}
                className="mr-3 w-4 h-4"
                style={{
                  accentColor: `var(--accent-primary)`,
                }}
              />
              <div
                className={`flex-1 p-2 rounded-lg transition-all border ${
                  botColor === "black"
                    ? ""
                    : "border-transparent group-hover:bg-slate-700/50"
                }`}
                style={{
                  backgroundColor:
                    botColor === "black"
                      ? `rgba(6, 182, 212, 0.2)`
                      : `rgba(51, 65, 85, 0.3)`,
                  borderColor:
                    botColor === "black"
                      ? `var(--accent-primary)`
                      : `transparent`,
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: `var(--sidebar-text-primary)` }}
                >
                  ⚪ White (You move first)
                </span>
              </div>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="botColor"
                value="black"
                checked={botColor === "white"}
                onChange={() => onBotColorChange("white")}
                className="mr-3 w-4 h-4"
                style={{
                  accentColor: `var(--accent-primary)`,
                }}
              />
              <div
                className={`flex-1 p-2 rounded-lg transition-all border ${
                  botColor === "white"
                    ? ""
                    : "border-transparent group-hover:bg-slate-700/50"
                }`}
                style={{
                  backgroundColor:
                    botColor === "white"
                      ? `rgba(6, 182, 212, 0.2)`
                      : `rgba(51, 65, 85, 0.3)`,
                  borderColor:
                    botColor === "white"
                      ? `var(--accent-primary)`
                      : `transparent`,
                }}
              >
                <span
                  className="text-sm"
                  style={{ color: `var(--sidebar-text-secondary)` }}
                >
                  ⚫ Black (Bot moves first)
                </span>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameModeSelector;
