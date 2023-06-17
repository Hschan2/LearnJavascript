import esbuild from 'rollup-plugin-esbuild';
import peerExternal from 'rollup-plugin-peer-deps-external';
import pkg from './package.json' assert {type:'json'};

export default {
    input: 'src/index.js',
    output: [
        {
            file: pkg.exports['.'].import,
            format: 'cjs',
        },
        {
            file: pkg.exports['.'].require,
            format: 'esm',
        },
    ],
    plugins: [
        esbuild({
            include: /\.jsx?$/,
            minify: process.env.NODE_ENV === 'production',
            jsx: 'automatic',
        }),
        peerExternal(),
    ]
}