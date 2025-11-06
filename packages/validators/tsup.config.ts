import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  treeshake: true,
  minify: false,
  external: ['react', 'react-dom', '@react-dynamic-forms/core'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});