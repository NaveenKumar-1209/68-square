import { ChessStoreProvider } from "./store/store";
import ChessPlayground from "./ChessPlayground";

/**
 * Chess Game Entry Point
 * Wraps the chess game with its store provider
 *
 * Architecture:
 * - Each game is self-contained with its own store
 * - This component is used by React Router
 */
const ChessGame = () => {
  return (
    <ChessStoreProvider>
      <ChessPlayground />
    </ChessStoreProvider>
  );
};

export default ChessGame;
