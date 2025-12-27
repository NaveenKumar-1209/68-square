import ChessPlayground from "./ChessPlayground";
import { StoreProvider } from "./store/store";

/**
 * Main App Component
 *
 * Architecture:
 * - Manages the chess position state at the top level
 * - Handles square selection for future move logic
 * - Provides a clean separation between UI and game logic
 */
function App() {
  return (
    <StoreProvider>
      <ChessPlayground />
    </StoreProvider>
  );
}

export default App;
