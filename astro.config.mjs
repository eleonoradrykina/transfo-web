// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

import tailwind from "@astrojs/tailwind";
import { Language } from "./src/services/types";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: "static",
  adapter: vercel(),
  i18n: {
    defaultLocale: Language.NL,
    locales: Array.from(Object.values(Language)),
  },
});
