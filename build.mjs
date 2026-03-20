import { build } from "esbuild";
import { resolve } from "path";

await build({
  entryPoints: ["src/entry-edge.ts"],
  bundle: true,
  outfile: "api/tier.js",
  format: "cjs",
  target: "node18",
  platform: "node",
  alias: {
    "@/shared": resolve("src/shared"),
    "@/features": resolve("src/features"),
    "@/routes": resolve("src/routes"),
  },
});
