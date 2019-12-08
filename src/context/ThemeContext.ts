import { createContext, Dispatch } from "react";

enum DarkThemeColor {
  PRIMARY = "#ffdabf",
  SECONDARY = "#f46036",
  ACCENT = "#df2935",
  DARK = "#3b3f56",
  DARKER = "#2b303a",
  SUCCESS = "#399d44",
  ERROR = "#df2935",
  WARNING = "#f46036",
  TEXT_MAIN = "#ffdabf",
  TEXT_INVERSE = "#3b3f56",
}

enum LightThemeColor {
  PRIMARY = "#ffdabf",
  SECONDARY = "#f46036",
  ACCENT = "#df2935",
  DARK = "#3b3f56",
  DARKER = "#2b303a",
  SUCCESS = "#399d44",
  ERROR = "#df2935",
  WARNING = "#f46036",
  TEXT_MAIN = "#3b3f56",
  TEXT_INVERSE = "#ffdabf",
}

export type Theme = typeof DarkThemeColor | typeof LightThemeColor;

export interface IThemeAware {
  theme: Theme;
}

export const getTheme = (type: "light" | "dark"): Theme =>
  type == "dark" ? DarkThemeColor : LightThemeColor;

export const ThemeContext = createContext<[Theme, Dispatch<Theme>]>([getTheme("dark"), x => x]);
