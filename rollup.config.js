import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'assets/js/index.js',
    output: [
        {
            file: 'assets/js/main.bundle.js',
            format: 'iife',
            sourceMap: true
        }
    ],
    external: [ 'ow' ],
    plugins: [
        resolve({
            browser: true
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: false,
            runtimeHelpers: true
        })
    ]
};
