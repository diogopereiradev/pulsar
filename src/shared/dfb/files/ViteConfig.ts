import beautify from "beautify";

export function ViteConfig() {
  return beautify(/* javascript */`
    import path from 'path';
    import { sync } from 'glob';
    import { defineConfig } from 'vite';
    
    export default defineConfig({
      base: '',
      root: path.resolve(__dirname, 'src'),
      build: {
        rollupOptions: {
          input: sync(path.resolve(__dirname, 'src/**/*.{html,css,js}')),
          preserveEntrySignatures: true
        },
        outDir: '../dist',
        emptyOutDir: true
      }
    });
  `, {
    format: 'js'
  });
}