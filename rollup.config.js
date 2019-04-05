import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'assets/js/main.mjs',
  output: [
    {
      file: 'main.bundle.js',
      format: 'cjs',
      sourceMap: true
    }
  ],
  external: [ 'ow' ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      externalHelpers: false,
      runtimeHelpers: true
    }),
    resolve({
      browser: true
    }),
    commonjs()
  ]
}
