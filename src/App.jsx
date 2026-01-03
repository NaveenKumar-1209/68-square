import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, useTheme } from "./theme/ThemeProvider";
import NavBar from "./components/Navigation/NavBar";
import AppRoutes from "./routes/AppRoutes";

/**
 * Main App Component
 *
 * Architecture:
 * - ThemeProvider: Provides centralized theme throughout the app
 * - BrowserRouter: Provides routing context for React Router
 * - NavBar: Persistent navigation bar across all routes
 * - AppRoutes: Defines all application routes
 * - Each game is self-contained in its own folder with its own store
 */
const AppContent = () => {
  const theme = useTheme();

  return (
    <div
      className="h-screen"
      style={{
        background: `var(--sidebar-bg, ${theme.gradients.dark})`,
      }}
    >
      <NavBar />
      <div className="h-[calc(100vh-4rem)]">
        <AppRoutes />
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
