export interface Theme {
  bg: string;
  border: string;
  title: string;
  text: string;
  subtitle: string;
  barBg: string;
}

export const THEMES: Record<string, Theme> = {
  dark: {
    bg: "#0D1117",
    border: "#30363D",
    title: "#E6EDF3",
    text: "#E6EDF3",
    subtitle: "#8B949E",
    barBg: "#21262D",
  },
  tokyonight: {
    bg: "#1A1B27",
    border: "#414868",
    title: "#70A5FD",
    text: "#A9B1D6",
    subtitle: "#565F89",
    barBg: "#24283B",
  },
  dracula: {
    bg: "#282A36",
    border: "#6272A4",
    title: "#FF79C6",
    text: "#F8F8F2",
    subtitle: "#6272A4",
    barBg: "#44475A",
  },
  nord: {
    bg: "#2E3440",
    border: "#4C566A",
    title: "#88C0D0",
    text: "#ECEFF4",
    subtitle: "#4C566A",
    barBg: "#3B4252",
  },
  gruvbox: {
    bg: "#282828",
    border: "#504945",
    title: "#FABD2F",
    text: "#EBDBB2",
    subtitle: "#928374",
    barBg: "#3C3836",
  },
  catppuccin: {
    bg: "#1E1E2E",
    border: "#45475A",
    title: "#CBA6F7",
    text: "#CDD6F4",
    subtitle: "#6C7086",
    barBg: "#313244",
  },
  onedark: {
    bg: "#282C34",
    border: "#4B5263",
    title: "#61AFEF",
    text: "#ABB2BF",
    subtitle: "#5C6370",
    barBg: "#2C313C",
  },
  radical: {
    bg: "#141321",
    border: "#FE428E",
    title: "#FE428E",
    text: "#A9FEF7",
    subtitle: "#F8D847",
    barBg: "#1A1831",
  },
  light: {
    bg: "#FFFFFF",
    border: "#D0D7DE",
    title: "#24292F",
    text: "#24292F",
    subtitle: "#57606A",
    barBg: "#EFF1F3",
  },
};

export const DEFAULT_THEME = "dark";
