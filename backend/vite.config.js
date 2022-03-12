import { defineConfig } from "vite"
import { join } from "path"
import { builtinModules } from "module"

// const PACKAGE_ROOT = __dirname

export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: ".",
    minify: process.env.MODE !== "development",
    lib: {
      entry: "index.ts",
      formats: ["cjs"],
    },
    rollupOptions: {
      external: [
        "electron",
        // 'electron-devtools-installer',
        ...builtinModules.flatMap((p) => [p, `node:${p}`]),
      ],
      output: {
        entryFileNames: "[name].cjs",
      },
    },
    emptyOutDir: true,
    brotliSize: false,
  },
})
