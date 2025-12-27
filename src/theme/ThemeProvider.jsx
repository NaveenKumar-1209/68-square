import { createContext, useContext } from "react";
import theme from "./theme";

/**
 * Theme Context
 * Provides theme configuration throughout the application
 */
const ThemeContext = createContext(theme);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
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
