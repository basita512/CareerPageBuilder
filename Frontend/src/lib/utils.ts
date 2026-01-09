import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hexToHSL(hex: string): string {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt("0x" + hex[1] + hex[1]);
    g = parseInt("0x" + hex[2] + hex[2]);
    b = parseInt("0x" + hex[3] + hex[3]);
  } else if (hex.length === 7) {
    r = parseInt("0x" + hex[1] + hex[2]);
    g = parseInt("0x" + hex[3] + hex[4]);
    b = parseInt("0x" + hex[5] + hex[6]);
  }

  r /= 255;
  g /= 255;
  b /= 255;

  const cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) h = 0;
  else if (cmax === r) h = ((g - b) / delta) % 6;
  else if (cmax === g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `${h} ${s}% ${l}%`;
}

export const PRESET_PALETTES = [
  {
    name: "Sunset Vibes",
    colors: {
      primary: "#451952", // Purple
      secondary: "#F59F59", // Orange
      accent: "#AF445A", // Reddish
      background: "#1D1A39", // Deep Purple
      surface: "#662549", // Medium Purple
      muted: "#E8BCB9", // Light Pink
    }
  },
  {
    name: "Industrial Earth",
    colors: {
      primary: "#5f7674", // Slate Green
      secondary: "#b94d22", // Rust
      accent: "#3f5252", // Charcoal
      background: "#293131", // Obsidian derived
      surface: "#1e201e", // Shadow derived
      muted: "#afb3b1", // Mist
    }
  },
  {
    name: "Desert Mirage",
    colors: {
      primary: "#2D4354", // Dark Blue
      secondary: "#FED7A5", // Sand
      accent: "#9E6752", // Clay
      background: "#20212B", // Night
      surface: "#534145", // Brown
      muted: "#73766A", // Sage
    }
  },
  {
    name: "Berry Navy",
    colors: {
      primary: "#B4182D", // Red
      secondary: "#FDA481", // Peach
      accent: "#37415C", // Navy
      background: "#181A2F", // Dark Navy
      surface: "#242E49", // Blue Grey
      muted: "#54162B", // Wine
    }
  },
  {
    name: "Slate Coffee",
    colors: {
      primary: "#3D4D55", // Slate
      secondary: "#B58863", // Coffee
      accent: "#10232A", // Deep Teal
      background: "#161616", // Black
      surface: "#3D4D55", // Slate
      muted: "#A79E9C", // Grey
    }
  },
  {
    name: "Oceanic Depth",
    colors: {
      primary: "#10232A", // Deep Blue
      secondary: "#FDA481", // Coral
      accent: "#3D4D55", // Slate
      background: "#03080A", // Almost Black
      surface: "#1B2A30", // Dark Teal
      muted: "#D3C3B9", // Sand
    }
  },
];

// Palette Configuration System
type ThemeConfig = {
  light: Record<string, string>;
  dark: Record<string, string>;
};

export const PALETTE_THEMES: Record<string, ThemeConfig> = {
  "Oceanic Depth": {
    light: {
      '--background': '210 40% 98%', // Cool Mint-White Tint
      '--foreground': '221 44% 11%', // Deep Blue Text (Matches Primary)
      '--card': '210 30% 94%', // Tinted Cool Gray
      '--card-foreground': '221 44% 11%',
      '--primary': '221 44% 11%', // Deep Blue (#10232A)
      '--primary-foreground': '0 0% 100%',
      '--secondary': '17 96% 75%', // Coral (#FDA481)
      '--secondary-foreground': '221 44% 11%',
      '--muted': '210 20% 96%', // Light Cool Gray
      '--muted-foreground': '215 16% 47%',
      '--accent': '219 25% 20%', // Slate
      '--accent-foreground': '0 0% 100%',
      '--border': '300 20% 88%', // Deep Blue Border (will be used with opacity)
      '--ring': '17 96% 75%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(210 40% 98%) 0%, hsl(210 30% 90%) 50%, hsl(17 96% 85%) 100%)', // Enhanced Freshness: Mint -> Blue-Grey -> Coral
      '--glow': '17 96% 75%', // Coral Glow
    },
    dark: {
      '--background': '200 40% 3%', // Almost Black (#03080A)
      '--foreground': '210 20% 98%', // Light text
      '--card': '197 28% 15%', // Dark Teal Surface (#1B2A30)
      '--card-foreground': '210 20% 98%',
      '--primary': '17 96% 75%', // Coral (#FDA481) for Buttons (High Contrast)
      '--primary-foreground': '221 44% 11%', // Dark text on Coral
      '--secondary': '200 40% 10%', // Deep Blue as Secondary background
      '--secondary-foreground': '210 20% 98%',
      '--muted': '197 28% 15%', // Dark Teal for Footer (Matches Surface)
      '--muted-foreground': '200 10% 70%',
      '--accent': '219 25% 20%', // Slate
      '--accent-foreground': '210 20% 98%',
      '--border': '197 28% 20%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(200 40% 3%) 0%, hsl(197 28% 10%) 50%, hsl(17 96% 25%) 100%)', // Dark to subtle Coral glow
      '--glow': '17 96% 75%', // Coral Glow
    }
  },
  "Berry Navy": {
    light: {
      '--background': '340 30% 99%', // Very light blush (almost white)
      '--foreground': '232 30% 15%', // Dark Navy
      '--card': '340 25% 96%', // Tinted Blush
      '--card-foreground': '232 30% 15%',
      '--primary': '351 76% 45%', // Berry Red
      '--primary-foreground': '0 0% 100%',
      '--secondary': '17 96% 75%', // Peach
      '--secondary-foreground': '232 30% 15%',
      '--muted': '340 20% 90%', // Darker Blush for Footer/Backgrounds
      '--muted-foreground': '232 20% 40%', // Darker Grey-Navy for better readability
      '--accent': '224 25% 90%', // Light Navy Tint for accents/backgrounds
      '--accent-foreground': '224 25% 29%', // Dark Navy Text
      '--border': '351 40% 85%', // Soft Pink Border (not dark red)
      '--ring': '17 96% 75%',
      // Derived
      '--hero-gradient': 'linear-gradient(135deg, hsl(340 30% 99%) 0%, hsl(17 90% 88%) 50%, hsl(351 76% 85%) 100%)', // Richer Peach -> Pink
      '--glow': '351 76% 45%',
    },
    dark: {
      '--background': '235 32% 14%', // Dark Navy (#181A2F)
      '--foreground': '210 20% 98%', // Light Text
      '--card': '224 34% 21%', // Blue Grey Surface (#242E49)
      '--card-foreground': '210 20% 98%',
      '--primary': '351 76% 50%', // Berry Red (Brightened for dark mode)
      '--primary-foreground': '0 0% 100%',
      '--secondary': '17 96% 75%', // Peach
      '--secondary-foreground': '235 32% 14%',
      '--muted': '224 30% 12%', // Deep Navy Blue (Matches background tone)
      '--muted-foreground': '340 20% 80%',
      '--accent': '224 25% 40%', // Navy Lightened
      '--accent-foreground': '210 20% 98%',
      '--border': '224 34% 30%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(235 32% 14%) 0%, hsl(224 34% 21%) 50%, hsl(351 76% 30%) 100%)',
      '--glow': '351 76% 50%',
    }
  },
  "Sunset Vibes": {
    light: {
      '--background': '280 20% 98%', // Light Lavender White
      '--foreground': '270 50% 15%', // Deep Purple Text
      '--card': '280 25% 95%', // Tinted Lavender
      '--card-foreground': '270 50% 15%',
      '--primary': '285 54% 21%', // Purple (#451952)
      '--primary-foreground': '0 0% 100%',
      '--secondary': '27 89% 65%', // Orange (#F59F59)
      '--secondary-foreground': '285 54% 21%',
      '--muted': '280 15% 94%', // Lavender Grey
      '--muted-foreground': '285 30% 45%', // Muted Purple
      '--accent': '347 44% 47%', // Reddish
      '--accent-foreground': '0 0% 100%',
      '--border': '285 30% 85%', // Soft Purple Border
      '--ring': '27 89% 65%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(280 20% 98%) 0%, hsl(27 89% 80%) 50%, hsl(347 50% 85%) 100%)', // Vibrant: Lavender -> Peach -> Reddish
      '--glow': '27 89% 65%',
    },
    dark: {
      '--background': '246 38% 12%', // Deep Purple (Darker for contrast)
      '--foreground': '280 10% 98%', // Crisp White
      '--card': '248 30% 18%', // Dark Deep Purple (Subtle, not pink/red)
      '--card-foreground': '280 10% 98%',
      '--primary': '27 89% 65%', // Orange Pop (Maintains vibes)
      '--primary-foreground': '246 38% 12%',
      '--secondary': '327 30% 20%', // Deep Wine (Subtle backing)
      '--secondary-foreground': '280 10% 98%',
      '--muted': '246 25% 10%', // Very Dark Purple (For Footer - Fixes light footer issue)
      '--muted-foreground': '246 10% 70%',
      '--accent': '347 44% 35%', // Darker Reddish
      '--accent-foreground': '0 0% 100%',
      '--border': '248 30% 25%', // Low contrast border
      '--hero-gradient': 'linear-gradient(135deg, hsl(246 38% 12%) 0%, hsl(327 30% 15%) 50%, hsl(27 89% 25%) 100%)',
      '--glow': '27 89% 65%',
    }
  },
  "Industrial Earth": {
    light: {
      '--background': '0 0% 100%', // Revert to White
      '--foreground': '222.2 84% 4.9%', // Standard Dark Text
      '--card': '173 15% 95%', // Tinted Slate Green
      '--card-foreground': '222.2 84% 4.9%',
      '--primary': '173 11% 42%', // Slate Green
      '--primary-foreground': '0 0% 100%',
      '--secondary': '17 70% 43%', // Rust
      '--secondary-foreground': '0 0% 100%',
      '--muted': '120 2% 96%', // Very Light Grey
      '--muted-foreground': '215.4 16.3% 46.9%', // Standard Muted
      '--accent': '173 11% 40%', // Darker Slate for visible tints
      '--accent-foreground': '0 0% 100%',
      '--border': '173 20% 88%', // Soft Slate Green (Theme aligned, lighter)
      '--ring': '17 70% 43%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(173 15% 90%) 50%, hsl(17 75% 90%) 100%)', // Richer: White -> Slate Tint -> Rust Tint
      '--glow': '17 70% 43%',
    },
    dark: {
      '--background': '180 9% 18%', // Obsidian (#293131)
      '--foreground': '150 5% 95%', // Off-white
      '--card': '120 3% 12%', // Shadow (#1e201e)
      '--card-foreground': '150 5% 95%',
      '--primary': '173 11% 55%', // Lighter Slate Green for dark mode
      '--primary-foreground': '0 0% 100%',
      '--secondary': '17 70% 55%', // Brighter Rust
      '--secondary-foreground': '180 13% 28%',
      '--muted': '180 9% 14%', // Darker Obsidian
      '--muted-foreground': '173 10% 70%',
      '--accent': '180 13% 28%', // Charcoal
      '--accent-foreground': '150 5% 95%',
      '--border': '173 11% 30%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(180 9% 18%) 0%, hsl(120 3% 15%) 50%, hsl(17 70% 30%) 100%)',
      '--glow': '17 70% 55%',
    }
  },
  "Desert Mirage": {
    light: {
      '--background': '34 30% 98%', // Very Light Sand
      '--foreground': '235 15% 15%', // Night Text
      '--card': '34 40% 95%', // Tinted Sand
      '--card-foreground': '235 15% 15%',
      '--primary': '206 30% 35%', // Dark Blue (Solid)
      '--primary-foreground': '0 0% 100%',
      '--secondary': '34 96% 82%', // Sand
      '--secondary-foreground': '206 30% 25%',
      '--muted': '75 5% 90%', // Light Sage
      '--muted-foreground': '206 20% 40%',
      '--accent': '17 31% 80%', // Light Clay
      '--accent-foreground': '235 15% 15%',
      '--border': '206 30% 85%',
      '--ring': '206 30% 35%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(34 60% 95%) 0%, hsl(17 80% 92%) 50%, hsl(206 50% 90%) 100%)',
      '--glow': '17 31% 47%',
    },
    dark: {
      '--background': '235 15% 12%', // Deep Night (Darker than palette base for contrast)
      '--foreground': '34 30% 95%', // Light Sand/White
      '--card': '347 12% 29%', // Brown Surface
      '--card-foreground': '34 30% 95%',
      '--primary': '34 96% 82%', // Sand (High contrast against Brown)
      '--primary-foreground': '235 15% 15%', // Dark text on Sand
      '--secondary': '206 30% 25%', // Dark Blue
      '--secondary-foreground': '0 0% 100%',
      '--muted': '235 15% 10%', // Darker Night
      '--muted-foreground': '34 20% 70%',
      '--accent': '17 31% 47%', // Clay
      '--accent-foreground': '0 0% 100%',
      '--border': '347 12% 40%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(235 15% 12%) 0%, hsl(347 12% 20%) 50%, hsl(17 31% 25%) 100%)',
      '--glow': '34 96% 82%',
    }
  },
  "Slate Coffee": {
    light: {
      '--background': '0 0% 100%', // White
      '--foreground': '200 20% 10%', // Darker Slate (Obsidian) for better contrast
      '--card': '27 30% 96%', // Tinted Cream
      '--card-foreground': '200 20% 10%', // Match foreground
      '--primary': '200 17% 29%', // Slate
      '--primary-foreground': '0 0% 100%',
      '--secondary': '27 37% 55%', // Coffee (#B58863)
      '--secondary-foreground': '0 0% 100%',
      '--muted': '11 6% 63%', // Grey (#A79E9C)
      '--muted-foreground': '200 17% 29%',
      '--accent': '197 45% 11%', // Deep Teal
      '--accent-foreground': '0 0% 100%',
      '--border': '200 17% 85%',
      '--ring': '200 17% 29%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(11 6% 63%) 50%, hsl(200 17% 29%) 100%)', // Matches algorithmic: White -> Grey -> Slate
      '--glow': '27 37% 55%',
    },
    dark: {
      '--background': '0 0% 9%', // Black (#161616)
      '--foreground': '0 0% 100%', // White
      '--card': '200 17% 29%', // Slate Surface
      '--card-foreground': '0 0% 100%',
      '--primary': '27 37% 55%', // Coffee (Contrast against Slate/Black)
      '--primary-foreground': '0 0% 100%',
      '--secondary': '197 45% 11%', // Deep Teal
      '--secondary-foreground': '0 0% 100%',
      '--muted': '0 0% 15%', // Dark Grey
      '--muted-foreground': '11 6% 70%',
      '--accent': '11 6% 63%', // Grey
      '--accent-foreground': '0 0% 9%',
      '--border': '347 12% 40%',
      '--hero-gradient': 'linear-gradient(135deg, hsl(0 0% 9%) 0%, hsl(200 17% 20%) 50%, hsl(27 37% 30%) 100%)',
      '--glow': '27 37% 55%',
    }
  },
};

export function generateThemeProperties(colors: Record<string, string>, mode: 'light' | 'dark' = 'light') {
  const isDark = mode === 'dark';

  // 1. Identify Palette
  const matchedPalette = PRESET_PALETTES.find(p => p.colors.primary.toLowerCase() === colors.primary?.toLowerCase());
  const paletteName = matchedPalette?.name;

  // 2. Check for Explicit Config
  if (paletteName && PALETTE_THEMES[paletteName]) {
    const config = PALETTE_THEMES[paletteName][mode];
    if (config) {
      const bgVar = config['--background'];
      return {
        ...config,
        '--popover': config['--card'],
        '--popover-foreground': config['--card-foreground'],
        '--input': config['--border'],
        '--ring': config['--primary'],
        '--radius': '0.5rem',
        '--glass': `${bgVar} / 0.8`,

        '--sidebar-background': config['--background'],
        '--sidebar-foreground': config['--foreground'],
        '--sidebar-primary': config['--primary'],
        '--sidebar-primary-foreground': config['--primary-foreground'],
        '--sidebar-accent': config['--secondary'],
        '--sidebar-accent-foreground': config['--secondary-foreground'],
        '--sidebar-border': config['--border'],
        '--sidebar-ring': config['--ring'],
      } as React.CSSProperties;
    }
  }

  // 3. Fallback: Algorithmic Generation (Existing Logic)
  // Helper to safely get HSL
  const getHSL = (color?: string, fallback?: string) => color ? hexToHSL(color) : (fallback || '0 0% 100%');

  // Helper to determine readable foreground color (Black or White) based on background luminance
  const getContrastColor = (hex?: string, fallbackIsDark: boolean = false): string => {
    if (!hex) return fallbackIsDark ? '210 40% 98%' : '222.2 84% 4.9%';

    // Parse hex to RGB
    const c = hex.replace('#', '');
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;

    // Calculate Luminance (WCAG 2.0 rel)
    const getC = (val: number) => val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    const L = 0.2126 * getC(r) + 0.7152 * getC(g) + 0.0722 * getC(b);

    // If luminance is high (light background), use dark text. Else white.
    return L > 0.4 ? '222.2 84% 4.9%' : '210 40% 98%';
  };

  // Base Colors from Palette or Defaults
  const primary = getHSL(colors.primary, '221.2 83.2% 53.3%');
  const secondary = getHSL(colors.secondary, '210 40% 96.1%');
  const accent = getHSL(colors.accent, secondary);

  // Background/Surface logic based on Mode and Palette availability
  const bgHSL = isDark ? getHSL(colors.background, '224 71% 4%') : '0 0% 100%';
  const fgHSL = isDark ? '210 40% 98%' : '222.2 84% 4.9%';

  const cardHSL = isDark ? getHSL(colors.surface, '222.2 84% 4.9%') : '0 0% 100%';
  // Calculate card foreground based on surface contrast if provided, else mode default
  const cardFgHSL = colors.surface ? getContrastColor(colors.surface) : (isDark ? '210 40% 98%' : '222.2 84% 4.9%');

  const mutedHSL = getHSL(colors.muted, isDark ? '217.2 32.6% 17.5%' : '210 40% 96.1%');
  const mutedFgHSL = colors.muted ? getContrastColor(colors.muted) : (isDark ? '215 20.2% 65.1%' : '215.4 16.3% 46.9%');

  const borderHSL = isDark ? '217.2 32.6% 17.5%' : '214.3 31.8% 91.4%';
  const inputHSL = isDark ? '217.2 32.6% 17.5%' : '214.3 31.8% 91.4%';

  return {
    '--background': bgHSL,
    '--foreground': fgHSL,
    '--card': cardHSL,
    '--card-foreground': cardFgHSL,
    '--popover': cardHSL,
    '--popover-foreground': cardFgHSL,
    '--primary': primary,
    '--primary-foreground': getContrastColor(colors.primary, true),
    '--secondary': secondary,
    '--secondary-foreground': getContrastColor(colors.secondary, false),
    '--muted': mutedHSL,
    '--muted-foreground': mutedFgHSL,
    '--accent': accent,
    '--accent-foreground': getContrastColor(colors.accent, false),
    '--destructive': '0 84.2% 60.2%',
    '--destructive-foreground': '210 40% 98%',
    '--border': borderHSL,
    '--input': inputHSL,
    '--ring': primary,
    '--radius': '0.5rem',

    // Derived Design Tokens
    '--hero-gradient': `linear-gradient(135deg, hsl(${bgHSL}) 0%, hsl(${mutedHSL}) 50%, hsl(${primary}) 100%)`,
    '--glow': primary,
    '--glass': `${bgHSL} / 0.8`,

    // Sidebar Tokens (Same logic)
    '--sidebar-background': bgHSL,
    '--sidebar-foreground': fgHSL,
    '--sidebar-primary': primary,
    '--sidebar-primary-foreground': getContrastColor(colors.primary, true),
    '--sidebar-accent': secondary,
    '--sidebar-accent-foreground': getContrastColor(colors.secondary, false),
    '--sidebar-border': borderHSL,
    '--sidebar-ring': primary,
  } as React.CSSProperties;
}
