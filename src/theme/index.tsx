import * as React from "react";

import { CssBaseline } from "@mui/material";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import type { PaletteOptions } from "@mui/material";

import Palettes from "./palettes";
import Breakpoints from "./breakpoints";

import Overrides from "./overrides";
import { useAppContext } from "../App-context";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mode } = useAppContext();

  const palette: PaletteOptions =
    mode === "dark"
      ? { mode: "dark" }
      : {
          ...Palettes.light,
          background: { default: "#ebebeb" },
        };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#5bc5a7",
        light: "rgba(221, 235, 215, 1)",
        dark: "rgba(0, 26, 24, 1)",
      },
      secondary: {
        main: "#ffb297",
        light: "#bbbfb5",
        dark: "#22261c",
      },

      text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)",
      },
    },
    typography: {
      htmlFontSize: 16,

      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: {
        // color: colors.red[50],
        fontWeight: 500,
        fontSize: "2.5rem",
        lineHeight: "1.125rem",
        letterSpacing: "-0.01562em",
        "@media (max-width: 730px)": {
          fontSize: "1.8rem", // Font size for h1 on screens wider than 600px
          lineHeight: "2rem",
        },
      },
      // h2: {  },
      // h3: {},
      // h4: {},
      h5: {
        fontSize: "1.875rem",
        lineHeight: "1.25rem",
        "@media (max-width: 450px)": {
          fontSize: "1.21rem", // Font size for h1 on screens wider than 600px
          lineHeight: "2.24rem",
        },
        "@media(min-width:1520px)": {
          fontSize: "2.175rem",
          lineHeight: "1.45rem",
        },
        "@media (min-width: 1920px)": {
          fontSize: "2.5rem",
          lineHeight: "1.66rem",
        },
      },
      h6: {},
      subtitle1: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: "1.25rem",

        "@media (max-width: 1500px)": {
          fontSize: "0.75rem", // Font size for h1 on screens wider than 600px
          lineHeight: "1.25rem",
        },
        "@media (max-width: 1200px)": {
          fontSize: "0.7rem", // Font size for h1 on screens wider than 600px
        },
      },
      subtitle2: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: "0.625rem",
        lineHeight: "1.25rem",
        "@media (max-width: 600px)": {
          fontSize: "0.6rem", // Font size for h1 on screens wider than 600px
        },
      },
      body1: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: "1rem",
        fontWeight: 340,
        lineHeight: "1.26rem",
        "@media (max-width: 600px)": {
          fontSize: "0.75rem", // Font size for h1 on screens wider than 600px
          lineHeight: "0.9rem",
        },
        "@media (max-width: 900px)": {
          fontSize: "0.85rem", // Font size for h1 on screens wider than 600px
          lineHeight: "1rem",
        },
      },
      // body2: {},

      caption: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
        fontSize: "0.85rem",
        lineHeight: "1.125rem",
        "@media (max-width: 450px)": {
          fontSize: "0.60rem", // Font size for h1 on screens wider than 600px
          lineHeight: "0.91rem",
        },
        "@media(min-width:1920px)": {
          fontSize: "1.187rem",
          lineHeight: "1.66rem",
        },
      },
    },
    // breakpoints: {
    //   values: {
    //     mobile: 0,
    //     xs: 450,
    //     sm: 650,
    //     md: 950,
    //     lg: 1250,
    //     xl: 1520,
    //   },
    // },
  });

  //   export default theme;
  theme.components = Overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}
