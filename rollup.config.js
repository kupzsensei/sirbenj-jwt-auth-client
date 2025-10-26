import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

const packageJson = require('./package.json');

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

const makeConfig = (input, cjs, esm, umdName) => ({
    input,
    output: [
        { file: cjs, format: 'cjs', sourcemap: true },
        { file: esm, format: 'esm', sourcemap: true },
        umdName && {
            file: packageJson.browser,
            format: 'umd',
            sourcemap: true,
            name: umdName,
            globals: { react: 'React', 'react-dom': 'ReactDOM', 'react/jsx-runtime': 'jsxRuntime' }
        },
    ].filter(Boolean),
    external: ['react', 'react-dom', '@tanstack/react-query'],
    plugins: [
        peerDepsExternal(),
        resolve({ extensions }),
        babel({ babelHelpers: 'bundled', exclude: 'node_modules/**', extensions }),
        commonjs(),
        typescript(),
    ],
});

export default [
    makeConfig('src/index.ts', packageJson.main, packageJson.module, 'JwtAuth'),
    makeConfig('src/query.ts', 'dist/query.js', 'dist/query.esm.js', null),
];
