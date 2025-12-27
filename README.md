# ♟️ Chess Game

A modern, interactive chess application built with React, featuring a beautiful UI and state management using React Context API with useReducer.

## ✨ Features

- **Interactive Chess Board**: Click to select pieces and make moves
- **Visual Feedback**: Highlighted squares for selected pieces and valid moves
- **Move Validation**: Proper chess piece movement rules implemented
- **Turn Management**: Alternating turns between white and black players
- **Modern UI**: Beautiful gradient design with smooth animations
- **State Management**: Efficient state handling with React Context API and useReducer
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Component-Based Architecture**: Clean, modular code structure
- **Chess Notation**: Standard algebraic notation (e.g., a1, e4, h8)

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **State Management**: React Context API with useReducer
- **Styling**: Tailwind CSS 3.4.0
- **Language**: JavaScript (ES6+)
- **Linting**: ESLint 9.39.1

## 📁 Project Structure

```
chess-app/
├── src/
│   ├── components/
│   │   ├── Board/
│   │   │   ├── Board.jsx          # Main chess board component
│   │   │   └── Square.jsx         # Individual square component
│   │   └── Pieces/
│   │       └── Pieces.jsx         # Chess piece rendering
│   ├── game/
│   │   └── initialPosition.jsx   # Initial board setup and piece symbols
│   ├── store/
│   │   ├── store.jsx              # Context provider and store setup
│   │   ├── chessActions.js        # Action creators for state updates
│   │   ├── chessReducer.js        # State reducer logic
│   │   └── constant.js            # Action type constants
│   ├── hooks/
│   │   └── useSuggestedMove.jsx  # Custom hook for calculating valid moves
│   ├── utils/
│   │   ├── suggestedMoves.js      # Piece movement logic (pawn, knight, bishop, rook, queen, king)
│   │   ├── checkMate.js           # Checkmate detection logic
│   │   └── conversion.js          # Utility functions for chess notation conversion
│   ├── App.jsx                    # Root component with store provider
│   ├── ChessPlayground.jsx        # Main game container and logic
│   ├── main.jsx                   # Application entry point
│   └── index.css                  # Global styles
├── public/                        # Public assets
├── index.html                     # HTML template
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
└── eslint.config.js               # ESLint configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd chess-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (or the port shown in terminal)

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start development server with hot reload |
| `npm run build`   | Build for production                     |
| `npm run preview` | Preview production build locally         |
| `npm run lint`    | Run ESLint to check code quality         |

## 🎮 How to Play

1. Launch the application in your browser
2. White moves first (click on a white piece)
3. Click on a chess piece to select it
4. The selected square will be highlighted in blue
5. Valid move squares will be highlighted in yellow
6. Click on a highlighted square to move the piece
7. The turn alternates between white and black
8. Continue playing until checkmate

## 🏗️ Architecture

### State Management

The application uses **React Context API with useReducer** for state management:

**State Properties:**

- `position`: Current board state (8x8 array) with piece positions
- `selectedSquare`: Currently selected square ID (e.g., 'e4')
- `highlightedSquares`: Array of highlighted square IDs
- `suggestedMoves`: Array of valid move square IDs for selected piece
- `isWhiteTurn`: Boolean indicating current player's turn
- `movingPiece`: Currently selected piece with position
- `isCheckMate`: Boolean indicating if current player is in checkmate
- `moveHistory`: Array for storing move history (prepared for future use)
- `isGameOver`: Boolean for game over state
- `winner`: Winner of the game (null, 'white', or 'black')

**Actions:**

- `setPosition`: Update board position
- `setSelectedSquare`: Set selected square
- `setHighlightedSquares`: Set highlighted squares
- `setSuggestedMoves`: Set valid moves for selected piece
- `setMovingPiece`: Set currently moving piece
- `setIsWhiteTurn`: Toggle player turn

### Component Hierarchy

```
App
└── StoreProvider (Context)
    └── ChessPlayground
        └── Board
            ├── Square (64 instances)
            │   └── Piece
            └── Suggested Moves (visual indicators)
```

### Move Generation

The application implements proper chess piece movement rules:

- **Pawn**: Forward movement (1 or 2 squares from start), diagonal captures
- **Knight**: L-shaped moves (2+1 pattern), can jump over pieces
- **Bishop**: Diagonal movement until blocked
- **Rook**: Horizontal and vertical movement until blocked
- **Queen**: Combines bishop and rook movement
- **King**: One square in any direction

### Chess Notation

The application uses standard algebraic notation:

- Files: a-h (left to right)
- Ranks: 1-8 (bottom to top)
- Square IDs: e.g., 'a1', 'e4', 'h8'

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Gradient Backgrounds**: Modern slate color scheme (slate-900, slate-800)
- **Board Colors**: Amber theme (amber-100 for light squares, amber-800 for dark squares)
- **Visual Feedback**:
  - Blue ring for selected squares
  - Yellow highlight for valid moves
- **Responsive Design**: Mobile-first approach with responsive text sizes
- **Accessibility**: ARIA labels and semantic HTML

## 🔮 Future Enhancements

- [ ] Complete check detection (currently only simplified checkmate)
- [ ] Move history and undo/redo functionality
- [ ] Castling support (kingside and queenside)
- [ ] En passant capture
- [ ] Pawn promotion dialog
- [ ] Timer for timed games
- [ ] Move notation display (e.g., "Nf3", "e4")
- [ ] Multiplayer support (online/local)
- [ ] AI opponent with difficulty levels
- [ ] Save/load game state (localStorage/export)
- [ ] Different board themes and piece sets
- [ ] Game replay functionality
- [ ] Analysis mode (show best moves)
- [ ] Opening book integration

## 🐛 Known Issues

- Checkmate detection is simplified (doesn't verify actual check state)
- No validation to prevent moving into check
- Move history state exists but is not yet implemented
- Console.log statement in production code (store.jsx)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Vite
