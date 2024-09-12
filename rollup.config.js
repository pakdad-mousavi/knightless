import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import pluginManifest from 'rollup-plugin-output-manifest';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const { default: outputManifest } = pluginManifest;

const removeFiles = async (dir, pattern) => {
  const resolvedDir = path.resolve(dir);
  try {
    (await fs.readdir(resolvedDir))
      .filter((f) => pattern.test(f))
      .map(async (f) => {
        const filePath = path.join(resolvedDir, f);
        await fs.unlink(filePath);
        console.log(filePath);
      });
  } catch (e) {
    console.log(e);
  }
};

// Delete the previous min files
const deleteOldMinFiles = {
  name: 'delete-old-min-files',
  async buildStart() {
    await Promise.all([
      // Define directories to clean
      removeFiles('assets/css', /core\.min\..*\.css/),
      removeFiles('assets/js', /core\.min\..*\.js/),
    ]);
  },
};

// Custom plugin to move and hash the CSS file and update the manifest
const moveAndHashCss = {
  name: 'move-and-hash-css',
  async writeBundle() {
    const srcPath = path.resolve('assets/js/core.min.css');
    const destDir = path.resolve('assets', 'css');

    try {
      // Generate hash based on CSS content
      const content = await fs.readFile(srcPath, 'utf-8');
      const cssHash = crypto.createHash('md5').update(content).digest('base64').slice(0, 10);
      const destPath = path.join(destDir, `core.min.${cssHash}.css`);

      // Create the destination directory if it doesn't exist
      await fs.mkdir(destDir, { recursive: true });

      // Move the CSS file and rename it with the hash
      await fs.rename(srcPath, destPath);
      console.log(`CSS moved and renamed to: assets/css/core.min.${cssHash}.css`);

      // Update manifest with the CSS file
      const manifestPath = path.resolve('assets', 'manifest.json');
      let manifest = {};

      if (await fs.stat(manifestPath).catch(() => false)) {
        manifest = JSON.parse(await fs.readFile(manifestPath, 'utf-8'));
      }

      manifest['core.min.css'] = `core.min.${cssHash}.css`;

      await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
      console.log('CSS file added to manifest.');
    } catch (error) {
      console.error('Error in moveAndHashCss plugin:', error);
    }
  },
};

const keyValueDecorator = (key, value, opt) => {
  // Rename 'core.js' to 'core.min.js'
  if (key === 'core') {
    return { 'core.min.js': value };
  }
};

export default {
  // Input file
  input: './assets/js/core.js',

  // Output file
  output: {
    dir: './assets/js',
    format: 'es',
    entryFileNames: 'core.min.[hash:10].js', // Add a hash to JS file
  },

  // Watch options
  watch: {
    include: ['./assets/js/**/*.{js,mjs}', './assets/css/**/*.css'],
  },

  plugins: [
    deleteOldMinFiles,
    nodeResolve(),
    terser(),
    postcss({
      extract: 'core.min.css', // Initial name before it's moved and hashed
    }),
    outputManifest({
      fileName: '../manifest.json', // Manifest in /assets/manifest.json
      keyValueDecorator, // Replace core.js with core.min.js
    }),
    moveAndHashCss, // Move and hash the CSS file, update manifest
  ],
};
