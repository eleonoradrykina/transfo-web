/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: "#DEC1FB",
        },
        purple: {
          DEFAULT: "#766DB8",
        },
        blue: {
          DEFAULT: "#3F4194",
          dark: "#222369",
        },
        orange: {
          DEFAULT: "#EA5739",
          dark: "#D8695E",
          light: "#FA846C",
        },
        white: "#FBFBFB",
        black: "#10113A",

        gray: {
          DEFAULT: "#E7E7E7",
          dark: "#C8C8C8",
        },
      },
      fontFamily: {
        whyte: ["Whyte", "sans-serif"],
        camera: ["Camera", "sans-serif"],
      },
    },
  },
  plugins: [],
};
