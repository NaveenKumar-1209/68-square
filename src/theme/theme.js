/**
 * Theme Configuration
 * Centralized theme system for the entire application
 * 
 * To change the theme, modify the values below and it will be reflected
 * throughout all pages and components.
 */

export const theme = {
    // Color Palette
    colors: {
        // Primary colors
        primary: {
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6", // Main primary
            600: "#2563eb",
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
        },

        // Secondary colors
        secondary: {
            50: "#f0f9ff",
            100: "#e0f2fe",
            200: "#bae6fd",
            300: "#7dd3fc",
            400: "#38bdf8",
            500: "#0ea5e9", // Main secondary
            600: "#0284c7",
            700: "#0369a1",
            800: "#075985",
            900: "#0c4a6e",
        },

        // Accent colors
        accent: {
            50: "#fdf4ff",
            100: "#fae8ff",
            200: "#f5d0fe",
            300: "#f0abfc",
            400: "#e879f9",
            500: "#d946ef", // Main accent
            600: "#c026d3",
            700: "#a21caf",
            800: "#86198f",
            900: "#701a75",
        },

        // Neutral colors
        neutral: {
            50: "#f8fafc",
            100: "#f1f5f9",
            200: "#e2e8f0",
            300: "#cbd5e1",
            400: "#94a3b8",
            500: "#64748b",
            600: "#475569",
            700: "#334155",
            800: "#1e293b",
            900: "#0f172a",
        },

        // Semantic colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
    },

    // Background gradients
    gradients: {
        primary: "from-blue-600 via-purple-600 to-pink-600",
        secondary: "from-indigo-600 via-purple-600 to-pink-600",
        dark: "from-slate-900 via-slate-800 to-slate-900",
        light: "from-gray-50 via-blue-50 to-purple-50",
        hero: "from-blue-600 via-indigo-700 to-purple-800",
    },

    // Typography
    typography: {
        fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
            serif: ["Georgia", "serif"],
            mono: ["Fira Code", "monospace"],
        },
        fontSize: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            "2xl": "1.5rem",
            "3xl": "1.875rem",
            "4xl": "2.25rem",
            "5xl": "3rem",
            "6xl": "3.75rem",
        },
    },

    // Spacing
    spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
    },

    // Border radius
    borderRadius: {
        sm: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
    },

    // Shadows
    shadows: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },

    // Animation
    animation: {
        duration: {
            fast: "150ms",
            normal: "300ms",
            slow: "500ms",
        },
        easing: {
            default: "cubic-bezier(0.4, 0, 0.2, 1)",
            in: "cubic-bezier(0.4, 0, 1, 1)",
            out: "cubic-bezier(0, 0, 0.2, 1)",
            inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
    },
};

/**
 * Get theme color by path
 * Example: getThemeColor('primary.500') returns '#3b82f6'
 */
export const getThemeColor = (path) => {
    const keys = path.split(".");
    let value = theme.colors;
    for (const key of keys) {
        value = value[key];
        if (!value) return null;
    }
    return value;
};

/**
 * Theme utility functions
 */
export const themeUtils = {
    // Get gradient classes
    getGradient: (name) => {
        return `bg-gradient-to-br ${theme.gradients[name] || theme.gradients.primary}`;
    },

    // Get text color
    getTextColor: (variant = "default") => {
        const colors = {
            default: "text-white",
            muted: "text-slate-300",
            primary: "text-blue-400",
            secondary: "text-purple-400",
        };
        return colors[variant] || colors.default;
    },

    // Get background color
    getBgColor: (variant = "default") => {
        const colors = {
            default: "bg-slate-800",
            light: "bg-slate-700",
            dark: "bg-slate-900",
            primary: "bg-blue-600",
        };
        return colors[variant] || colors.default;
    },
};

export default theme;

