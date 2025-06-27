import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const packageJson = require('./package.json');

const extensions = ['.js', '.jsx'];

export default {
    input: 'src/index.js',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
        {
            file: packageJson.browser,
            format: 'umd',
            sourcemap: true,
            name: 'JwtAuth', // This will be the global variable name for UMD build
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'jsxRuntime' // Added to remove warning
            }
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve({ extensions }),
        babel({ // Moved Babel before commonjs
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            extensions,
        }),
        commonjs(),
    ],
};