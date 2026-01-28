import { type TypographyVariant } from "./types";

export const baseStyle: React.CSSProperties = {
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif',
  lineHeight: 1.5,
  color: "#b0bccc", // slate-800
};

export const variantStyles: Record<TypographyVariant, React.CSSProperties> = {
  title: {
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#374151", // slate-700
  },

  body: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#ac4bc5"
  },

  caption: {
    fontSize: "12px",
    fontWeight: 400,
    color: "#5178c7", // slate-500
  },

  button: {
    fontSize: "14px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    cursor: "pointer",
  },

  muted: {
    fontSize: "14px",
    fontWeight: 400,
    color: "#9ca3af", // slate-400
  },
};
