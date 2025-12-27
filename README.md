# ♟️ Chess Game

A modern, interactive chess application built with React, featuring a beautiful UI and state management using Zustand.

## ✨ Features

- **Interactive Chess Board**: Click to select pieces and make moves
- **Visual Feedback**: Highlighted squares for selected pieces and valid moves
- **Modern UI**: Beautiful gradient design with smooth animations
- **State Management**: Efficient state handling with Zustand
- **Responsive Design**: Fully responsive layout using Tailwind CSS
- **Component-Based Architecture**: Clean, modular code structure

## 🚀 Tech Stack

- **Frontend Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **State Management**: Zustand (custom store implementation)
- **Styling**: Tailwind CSS 3.4.0
- **Language**: JavaScript (ES6+)

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
│   │   └── initialPosition.jsx   # Initial board setup
│   ├── store/
│   │   ├── store.jsx              # Zustand store configuration
│   │   ├── chessActions.js        # Game actions
│   │   ├── chessReducer.js        # State reducer logic
│   │   └── constant.js            # Game constants
│   ├── hooks/                     # Custom React hooks
│   ├── assets/                    # Static assets
│   ├── App.jsx                    # Root component
│   ├── ChessPlayground.jsx        # Main game container
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

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 🎮 How to Play

1. Launch the application in your browser
2. Click on a chess piece to select it
3. The selected square will be highlighted
4. Click on a destination square to move the piece
5. Continue playing by selecting and moving pieces

## 🏗️ Architecture

### State Management

The application uses **Zustand** for lightweight and efficient state management:

- `position`: Current board state with piece positions
- `selectedSquare`: Currently selected square
- `highlightedSquares`: Valid move squares for selected piece
- Actions: `setSelectedSquare`, `setHighlightedSquares`

### Component Hierarchy

```
App
└── ChessPlayground
    └── Board
        ├── Square (64 instances)
        └── Pieces
```

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Gradient Backgrounds**: Modern slate color scheme
- **Responsive Design**: Mobile-first approach
- **Custom Animations**: Smooth transitions and hover effects

## 🔮 Future Enhancements

- [ ] Move validation logic
- [ ] Check and checkmate detection
- [ ] Move history and undo/redo
- [ ] Timer for timed games
- [ ] Multiplayer support
- [ ] AI opponent
- [ ] Save/load game state
- [ ] Different board themes

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ using React and Vite
