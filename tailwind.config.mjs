/** @type {import('tailwindcss').Config} */

const SIZES = {
  15: "15px",
  30: "30px",
  60: "60px",
  120: "120px",
  180: "180px",
  360: "360px",
};

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      screen: {
        mobile: "450px",
        tablet: "768px",
        laptop: "1024px",
      },
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
      padding: SIZES,
      margin: SIZES,
      gap: SIZES,
      inset: SIZES,
      height: SIZES,
      width: SIZES,
      maxWidth: {
        ...SIZES,
        smallParagraph: "520px",
        paragraph: "640px",
      },
    },
  },
  plugins: [],
};
