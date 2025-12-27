# Theme System Documentation

## Overview

The theme system provides a centralized way to manage colors, gradients, typography, and other design tokens throughout the entire application. Change the theme in one place (`src/theme/theme.js`) and it will be reflected across all pages and components.

## Quick Start

### Changing the Theme

1. Open `src/theme/theme.js`
2. Modify the values you want to change
3. Save the file - changes will be reflected immediately

### Example: Changing Primary Colors

```javascript
// In src/theme/theme.js
primary: {
  500: "#3b82f6", // Change this to your desired color
  // ... other shades
}
```

### Example: Changing Gradients

```javascript
// In src/theme/theme.js
gradients: {
  primary: "from-blue-600 via-purple-600 to-pink-600",
  // Change to: "from-green-500 via-teal-500 to-cyan-500"
  hero: "from-blue-600 via-indigo-700 to-purple-800",
  // Change to: "from-red-600 via-orange-600 to-yellow-600"
}
```

## Using the Theme in Components

### Import the Hook

```javascript
import { useTheme } from "../theme/ThemeProvider";

const MyComponent = () => {
  const theme = useTheme();

  // Use theme values
  return (
    <div className={`bg-gradient-to-br ${theme.gradients.primary}`}>
      {/* Your content */}
    </div>
  );
};
```

### Available Theme Properties

- `theme.colors` - Color palette (primary, secondary, accent, neutral, semantic)
- `theme.gradients` - Background gradients
- `theme.typography` - Font families and sizes
- `theme.spacing` - Spacing scale
- `theme.borderRadius` - Border radius values
- `theme.shadows` - Shadow definitions
- `theme.animation` - Animation durations and easing

## Theme Structure

### Colors

```javascript
colors: {
  primary: { 50, 100, 200, ..., 900 },
  secondary: { 50, 100, 200, ..., 900 },
  accent: { 50, 100, 200, ..., 900 },
  neutral: { 50, 100, 200, ..., 900 },
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
}
```

### Gradients

```javascript
gradients: {
  primary: "from-blue-600 via-purple-600 to-pink-600",
  secondary: "from-indigo-600 via-purple-600 to-pink-600",
  dark: "from-slate-900 via-slate-800 to-slate-900",
  light: "from-gray-50 via-blue-50 to-purple-50",
  hero: "from-blue-600 via-indigo-700 to-purple-800",
}
```

## Utility Functions

### Get Theme Color

```javascript
import { getThemeColor } from "../theme/theme";

const color = getThemeColor("primary.500"); // Returns "#3b82f6"
```

### Theme Utils

```javascript
import { themeUtils } from "../theme/theme";

// Get gradient classes
const gradient = themeUtils.getGradient("primary");

// Get text color
const textColor = themeUtils.getTextColor("primary");

// Get background color
const bgColor = themeUtils.getBgColor("default");
```

## Best Practices

1. **Always use theme values** - Don't hardcode colors or gradients
2. **Use the hook** - Import `useTheme()` in components that need theme values
3. **Consistent naming** - Follow the existing naming conventions
4. **Test changes** - After changing theme, check all pages to ensure consistency

## Example: Complete Theme Change

To change from blue/purple theme to green/teal theme:

```javascript
// In src/theme/theme.js
gradients: {
  primary: "from-green-600 via-teal-600 to-cyan-600",
  hero: "from-green-600 via-emerald-700 to-teal-800",
  // ... update other gradients
}

colors: {
  primary: {
    500: "#10b981", // Green instead of blue
    // ... update other shades
  }
}
```

All pages will automatically use the new theme!
