// Detroit Local, Global Impact Theme

export const theme = {
  colors: {
    asphaltBlack: "#222324", // Asphalt Black
    rustedSteel: "#7A7D7D", // Rusted Steel
    neonOrange: "#FF4F00", // Neon Orange (Detroit Techno)
    neonYellow: "#FFD700", // Neon Yellow (Detroit Techno)
    brickRed: "#B33A3A", // Brick Red
    creamyBeige: "#F5E9DA", // Creamy Beige
  },
  fonts: {
    heading: '"Bebas Neue", "Anton", Arial, sans-serif', // Bold, industrial
    body: '"Inter", "Work Sans", Arial, sans-serif', // Humanist sans-serif
    mono: '"Geist Mono", "Menlo", "Monaco", monospace', // Terminal/code accents
  },
};

export type ThemeType = typeof theme;

// styled-components theme typing augmentation
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    // Theme interface for styled-components
    colors: typeof theme.colors;
    fonts: typeof theme.fonts;
  }
} 