import { build } from "esbuild";
import { resolve } from "path";

await build({
  entryPoints: ["src/entry-edge.ts"],
  bundle: true,
  outfile: "api/index.js",
  format: "esm",
  target: "es2022",
  platform: "neutral",
  alias: {
    "@/shared": resolve("src/shared"),
    "@/features": resolve("src/features"),
    "@/routes": resolve("src/routes"),
  },
});
