import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryRed: "#FD0101",
        placeholder: "#9B9B9A",

      }
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      "main-blue": {
        colors: {
          primary: {
            50: "#3B096C",
            100: "#520F83",
            200: "#7318A2",
            300: "#9823C2",
            400: "#c031e2",
            500: "#DD62ED",
            600: "#F182F6",
            700: "#FCADF9",
            800: "#FDD5F9",
            900: "#FEECFE",
            DEFAULT: "#070288",
            foreground: "#ffffff",

          },
          focus: "#F182F6",
        },

      },
    },
  })]
}
export default config
