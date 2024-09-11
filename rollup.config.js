import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import fs from 'fs';
import path from 'path';

const moveCss = {
  name: 'move-css',
  writeBundle() {
    const srcPath = path.resolve('assets/js/core.min.css');
    const destDir = path.resolve('assets', 'css');
    const destPath = path.join(destDir, 'core.min.css');

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Move the CSS file
    fs.renameSync(srcPath, destPath);
    console.log('CSS moved to dist/css/bundle.css');
  },
};

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
    include: ['./assets/js/**/*.{js,mjs}', './assets/css/**/*.css'],
  },

  plugins: [
    nodeResolve(),
    terser(),
    postcss({
      extract: 'core.min.css',
    }),
    moveCss,
  ],
};
