# Adding New Games

This guide explains how to add new games to the Game Center.

## Quick Start

1. **Create your game component** in `src/games/` or appropriate location
2. **Register the game** in `src/games/gameRegistry.js`
3. **That's it!** The game will automatically appear in the dashboard

## Example: Adding a Checkers Game

### Step 1: Create the Game Component

```javascript
// src/games/CheckersPlayground.jsx
import React from "react";

const CheckersPlayground = () => {
  return (
    <div className="flex items-center justify-center p-4 pt-8">
      <div className="w-full">
        <h2 className="text-white text-center mb-4">Checkers Game</h2>
        {/* Your checkers game implementation */}
      </div>
    </div>
  );
};

export default CheckersPlayground;
```

### Step 2: Register in gameRegistry.js

```javascript
// src/games/gameRegistry.js
import CheckersPlayground from "./CheckersPlayground";

export const GAMES = [
  // ... existing games
  {
    id: "checkers",
    name: "Checkers",
    description: "Classic checkers game for two players.",
    icon: "🔴",
    component: CheckersPlayground,
    category: "board",
    color: "from-red-600 to-red-800",
  },
];
```

## Game Configuration Options

| Property      | Type            | Required | Description                                         |
| ------------- | --------------- | -------- | --------------------------------------------------- |
| `id`          | string          | ✅       | Unique identifier (used for routing)                |
| `name`        | string          | ✅       | Display name in dashboard                           |
| `description` | string          | ✅       | Brief description shown on card                     |
| `icon`        | string          | ✅       | Emoji or icon (e.g., "♟️", "🔴")                    |
| `component`   | React.Component | ✅       | The game component to render                        |
| `category`    | string          | ✅       | Game category (e.g., "board", "card", "puzzle")     |
| `color`       | string          | ❌       | Tailwind gradient classes for card (default: slate) |

## Game-Specific State Management

If your game needs its own state management (like chess uses StoreProvider):

1. Create your game's store/context
2. Wrap your game component with the provider in `App.jsx`:

```javascript
// In App.jsx, update the needsChessStore logic
const needsGameStore = currentGameId === "checkers";

if (needsGameStore) {
  return (
    <CheckersStoreProvider>
      <GameView />
    </CheckersStoreProvider>
  );
}
```

## Best Practices

- ✅ Keep game components self-contained
- ✅ Use consistent styling (Tailwind CSS)
- ✅ Follow the same component structure as ChessPlayground
- ✅ Add proper error handling
- ✅ Include game rules/instructions if needed
- ✅ Make games responsive (mobile-friendly)

## File Structure

```
src/
├── games/
│   ├── gameRegistry.js       # Game registry (add games here)
│   ├── ChessPlayground.jsx   # Chess game (example)
│   └── README.md             # This file
├── components/
│   ├── Dashboard/            # Dashboard components
│   ├── Navigation/           # NavBar component
│   └── GameView/             # Game wrapper
└── context/
    └── GameRouterContext.jsx # Routing logic
```

## Need Help?

Check the existing Chess game implementation for reference:

- `src/ChessPlayground.jsx` - Game component
- `src/store/` - State management example
- `src/games/gameRegistry.js` - Registration example
