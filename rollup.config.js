import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  // Input file
  input: './assets/js/core.js',

  // Output file
  output: {
    file: './assets/js/core.min.js',
    format: 'es',
  },

  // Watch options
  watch: {
    include: './assets/js/**/*.{js,mjs}',
  },

  plugins: [nodeResolve(), terser()],
};
