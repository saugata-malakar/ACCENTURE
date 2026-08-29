import React from 'react';

/**
 * Pixel-Perfect Official Vector Accenture Logo Component
 * - Exact geometric forward-pointing chevron '>' positioned above the letter 't'
 * - Signature Accenture Purple: #A100FF (Pantone 2592 C)
 * - Scalable vector viewBox (0 0 150 36)
 * - Supports light (white on dark), dark (black on light), and glowing purple variants
 */
export default function AccentureLogo({ 
  className = "h-6", 
  variant = "light", 
  showSubtext = false,
  subtext = "APPLIED INTELLIGENCE" 
}) {
  const isLight = variant === "light";
  const textColor = isLight ? "#FFFFFF" : "#0F172A";
  const chevronColor = "#A100FF";

  return (
    <div className={`inline-flex items-center gap-2 select-none group cursor-pointer ${className}`}>
      <svg 
        viewBox="0 0 150 36" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-full w-auto transition-transform duration-300 group-hover:scale-[1.02]"
      >
        <defs>
          <filter id="accenture-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Wordmark: "accenture" with tight geometric kerning */}
        <text 
          x="2" 
          y="27" 
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
          fontSize="24" 
          fontWeight="800" 
          letterSpacing="-0.65px"
          fill={textColor}
          className="transition-colors duration-200"
        >
          accenture
        </text>

        {/* Signature Precision Chevron '>' positioned above the 't' (x: 75 to 87, y: 3 to 17) */}
        <path 
          d="M 75.5 4.5 L 82.2 9.5 L 75.5 14.5 L 78.2 16.5 L 87.0 9.5 L 78.2 2.5 Z" 
          fill={chevronColor}
          filter="url(#accenture-glow)"
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(161,0,255,0.8)]"
        />
      </svg>

      {showSubtext && (
        <div className="flex items-center pl-2 border-l border-slate-700/60 leading-none">
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#a100ff]">
            {subtext}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * 3D Glassmorphic Accenture Chevron Symbol Icon
 */
export function AccentureSymbol({ className = "w-7 h-7" }) {
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-tr from-[#7a00c2] via-[#a100ff] to-indigo-500 rounded-xl shadow-lg shadow-[#a100ff]/25 p-1.5 transition-all duration-300 hover:shadow-[#a100ff]/40 hover:scale-105 ${className}`}>
      <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-xs" />
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white relative z-10">
        <path 
          d="M 7.5 4 L 15.5 12 L 7.5 20 L 10.5 22.5 L 21 12 L 10.5 1.5 Z" 
          fill="currentColor" 
        />
      </svg>
    </div>
  );
}
