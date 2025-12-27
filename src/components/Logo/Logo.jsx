/**
 * Logo Component
 * Reusable SVG logo component for BoardBrew
 *
 * Architecture:
 * - Accepts size, className, and variant props for flexibility
 * - Can be used as inline SVG or as an img tag
 * - Supports different sizes and styling contexts
 * - Uses unique gradient IDs to avoid conflicts when multiple logos are rendered
 */

import { useMemo } from "react";

const Logo = ({
  size = 40,
  className = "",
  variant = "default",
  asImage = false,
}) => {
  const logoPath = "/logo.svg";
  
  // Generate unique IDs for gradients to avoid conflicts
  const gradientIds = useMemo(() => {
    const uniqueId = Math.random().toString(36).substring(7);
    return {
      gradient1: `gradient1-${uniqueId}`,
      gradient2: `gradient2-${uniqueId}`,
      boardPattern: `boardPattern-${uniqueId}`,
    };
  }, []);

  if (asImage) {
    return (
      <img
        src={logoPath}
        alt="BoardBrew Logo"
        width={size}
        height={size}
        className={className}
      />
    );
  }

  // Inline SVG for better control and theming
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BoardBrew Logo"
    >
      {/* Background Circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill={`url(#${gradientIds.gradient1})`}
        stroke={`url(#${gradientIds.gradient2})`}
        strokeWidth="4"
      />

      {/* Chess Board Pattern (top-left) */}
      <g transform="translate(30, 30)">
        <rect x="0" y="0" width="50" height="50" fill={`url(#${gradientIds.boardPattern})`} />
        {/* Chess pieces silhouette */}
        <circle cx="25" cy="20" r="6" fill="#3B82F6" opacity="0.9" />
        <path
          d="M 20 30 L 30 30 L 28 40 L 22 40 Z"
          fill="#3B82F6"
          opacity="0.9"
        />
      </g>

      {/* Game Dice (bottom-right) */}
      <g transform="translate(120, 120)">
        <rect
          x="0"
          y="0"
          width="50"
          height="50"
          rx="8"
          fill="#8B5CF6"
          opacity="0.9"
        />
        <circle cx="15" cy="15" r="3" fill="white" />
        <circle cx="35" cy="15" r="3" fill="white" />
        <circle cx="25" cy="25" r="3" fill="white" />
        <circle cx="15" cy="35" r="3" fill="white" />
        <circle cx="35" cy="35" r="3" fill="white" />
      </g>

      {/* Central "B" Letter */}
      <text
        x="100"
        y="130"
        fontFamily="Arial, sans-serif"
        fontSize="80"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        opacity="0.95"
      >
        B
      </text>

      {/* Decorative Elements */}
      <circle cx="50" cy="50" r="3" fill="#60A5FA" opacity="0.6" />
      <circle cx="150" cy="50" r="3" fill="#A78BFA" opacity="0.6" />
      <circle cx="50" cy="150" r="3" fill="#A78BFA" opacity="0.6" />
      <circle cx="150" cy="150" r="3" fill="#60A5FA" opacity="0.6" />

      {/* Gradients */}
      <defs>
        <linearGradient id={gradientIds.gradient1} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#1E3A8A", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#4C1D95", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#1E3A8A", stopOpacity: 1 }}
          />
        </linearGradient>
        <linearGradient id={gradientIds.gradient2} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#60A5FA", stopOpacity: 1 }} />
          <stop
            offset="100%"
            style={{ stopColor: "#A78BFA", stopOpacity: 1 }}
          />
        </linearGradient>
        <pattern
          id={gradientIds.boardPattern}
          patternUnits="userSpaceOnUse"
          width="10"
          height="10"
        >
          <rect width="5" height="5" fill="#F59E0B" />
          <rect x="5" y="0" width="5" height="5" fill="#92400E" />
          <rect x="0" y="5" width="5" height="5" fill="#92400E" />
          <rect x="5" y="5" width="5" height="5" fill="#F59E0B" />
        </pattern>
      </defs>
    </svg>
  );
};

export default Logo;
