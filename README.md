# 🎮 BoardBrew

A modern, interactive board game platform built with React, featuring a beautiful UI and state management using React Context API with useReducer. Play classic board games like Chess and more!

**Website**: [boardbrew.org](https://boardbrew.org)

## ✨ Features

- **Interactive Game Boards**: Click to select pieces and make moves
- **Visual Feedback**: Highlighted squares for selected pieces and valid moves
- **Move Validation**: Proper chess piece movement rules implemented
- **Turn Management**: Alternating turns between white and black players
- **Modern UI**: Beautiful gradient design with smooth animations
- **State Management**: Efficient state handling with React Context API and useReducer
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Component-Based Architecture**: Clean, modular code structure
- **Multi-Game Platform**: Dashboard with multiple games (Chess and more coming soon)
- **Portfolio Page**: Professional portfolio showcasing developer skills
- **Theme System**: Centralized theme configuration for easy customization

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **Routing**: React Router DOM 7.11.0
- **State Management**: React Context API with useReducer
- **Styling**: Tailwind CSS 3.4.0
- **Language**: JavaScript (ES6+)
- **Linting**: ESLint 9.39.1

## 📁 Project Structure

```
boardbrew/
├── src/
│   ├── Pages/
│   │   ├── Dashboard.jsx          # Main landing page with games
│   │   ├── AboutUs.jsx            # Portfolio/About page
│   │   └── Contact.jsx             # Contact page
│   ├── components/
│   │   ├── Dashboard/
│   │   │   └── GameCard.jsx       # Game card component
│   │   ├── Navigation/
│   │   │   └── NavBar.jsx          # Navigation bar
│   │   └── Resume/
│   │       └── Resume.jsx          # Resume component for download
│   ├── games/
│   │   ├── gameRegistry.js         # Game registry
│   │   ├── README.md               # Guide for adding games
│   │   └── chess/                  # Chess game (monorepo structure)
│   │       ├── index.jsx            # Entry point
│   │       ├── ChessPlayground.jsx # Main game component
│   │       ├── components/         # Chess-specific components
│   │       ├── store/              # Chess state management
│   │       ├── hooks/              # Chess hooks
│   │       ├── utils/              # Chess utilities
│   │       └── game/               # Chess game data
│   ├── routes/
│   │   └── AppRoutes.jsx           # React Router routes
│   ├── theme/
│   │   ├── theme.js                # Centralized theme configuration
│   │   ├── ThemeProvider.jsx       # Theme context provider
│   │   └── README.md               # Theme documentation
│   ├── utils/
│   │   └── downloadResume.js       # Resume download utilities
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Application entry point
│   └── index.css                   # Global styles
├── public/                         # Public assets
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── eslint.config.js                # ESLint configuration
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd boardbrew
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
2. Browse available games on the dashboard
3. Click on a game card to start playing
4. For Chess: White moves first (click on a white piece)
5. Click on a chess piece to select it
6. The selected square will be highlighted in blue
7. Valid move squares will be highlighted in yellow
8. Click on a highlighted square to move the piece
9. The turn alternates between white and black
10. Continue playing until checkmate

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
└── ThemeProvider
    └── BrowserRouter
        └── NavBar
            └── AppRoutes
                ├── Dashboard
                ├── AboutUs (Portfolio)
                ├── Contact
                └── Games (e.g., Chess)
                    └── ChessStoreProvider
                        └── ChessPlayground
```

### Routing

- `/` - Dashboard (home page with all games)
- `/about` - Portfolio/About page
- `/contact` - Contact page
- `/games/chess` - Chess game

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

## 🎨 Styling & Theme

- **Tailwind CSS**: Utility-first CSS framework
- **Centralized Theme**: All colors, gradients, and design tokens in `src/theme/theme.js`
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
- [ ] More board games (Checkers, Tic-Tac-Toe, etc.)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🌐 Website

Visit us at: **boardbrew.org**

---

Built with ❤️ using React and Vite
