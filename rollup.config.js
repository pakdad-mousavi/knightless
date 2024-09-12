import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import pluginManifest from 'rollup-plugin-output-manifest';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const { default: outputManifest } = pluginManifest;

// Custom plugin to move and hash the CSS file and update the manifest
const moveAndHashCss = {
  name: 'move-and-hash-css',
  writeBundle() {
    const srcPath = path.resolve('assets/js/core.min.css');
    const destDir = path.resolve('assets', 'css');

    // Generate hash based on CSS content
    const content = fs.readFileSync(srcPath, 'utf-8');
    const cssHash = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
    const destPath = path.join(destDir, `core.min.${cssHash}.css`);

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Move the CSS file and rename it with the hash
    fs.renameSync(srcPath, destPath);
    console.log(`CSS moved and renamed to: assets/css/core.min.${cssHash}.css`);

    // Update manifest with the CSS file
    const manifestPath = path.resolve('assets', 'manifest.json');
    const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf-8')) : {};

    manifest['core.min.css'] = `core.min.${cssHash}.css`;

    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Manifest updated with CSS file.');
  },
};

export default {
  // Input file
  input: './assets/js/core.js',

  // Output file
  output: {
    dir: './assets/js',
    format: 'es',
    entryFileNames: 'core.min.[hash].js', // Add a hash to JS file
  },

  // Watch options
  watch: {
    include: ['./assets/js/**/*.{js,mjs}', './assets/css/**/*.css'],
  },

  plugins: [
    nodeResolve(),
    terser(),
    postcss({
      extract: 'core.min.css', // Initial name before it's moved and hashed
    }),
    outputManifest({
      fileName: '../manifest.json', // Manifest in /assets/manifest.json
    }),
    moveAndHashCss, // Move and hash the CSS file, update manifest
  ],
};
