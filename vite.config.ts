import { pages } from "vike-cloudflare";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import vike from "vike/plugin";

export default defineConfig({
  resolve: {
    alias: {
      "#root": __dirname,
    },
  },
  plugins: [
    vike({}),
    devServer({
      entry: "hono-entry.ts",

      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],

      injectClientScript: false,
    }),
    react({}),
    tailwindcss(),
    pages({
      server: {
        kind: "hono",
        entry: "hono-entry.ts",
      },
    }),
  ],
  build: {
    target: "es2022",
  },
});
