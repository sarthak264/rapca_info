import merge from "lodash/merge";

export const ThemeProvider = merge(
  {},
  {
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
    },
  }
);
