import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import cssnanoPlugin from 'cssnano';
import tailwindcss from 'tailwindcss';

const OVERWRITING_WARN_MESSAGE = 'The emitted file "core.min.css" overwrites a previously emitted file of the same name.';

export default [
  // JavaScript configuration
  {
    input: 'assets/js/core.js',
    output: {
      file: 'assets/js/core.min.js',
      format: 'es',
    },
    plugins: [resolve(), terser()],
  },
  // CSS configuration
  {
    input: 'assets/css/core.css',
    output: {
      file: 'assets/css/core.min.css',
    },
    onwarn: (warning, defaultHandler) => {
      if (warning.message !== OVERWRITING_WARN_MESSAGE) {
        defaultHandler(warning);
      }
    },
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        plugins: [tailwindcss, autoprefixer(), cssnanoPlugin({ preset: 'default' })],
      }),
    ],
  },
];
