import { build } from "esbuild";

await build({
  entryPoints: ["api/index.ts"],
  bundle: true,
  outfile: "api/index.js",
  format: "esm",
  target: "es2022",
  platform: "neutral",
  external: [],
  alias: {
    "@/*": "./src/*",
  },
  tsconfig: "tsconfig.json",
});
