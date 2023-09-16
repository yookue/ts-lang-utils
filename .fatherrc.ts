// @see "https://github.com/umijs/father/blob/master/docs/config.md"

import {defineConfig} from 'father';


const path = require('path');

export default defineConfig({
    cjs: {},
    esm: {},
    umd: {
        name: 'TsLangUtils',
    },
    alias: {
        '@': path.resolve(__dirname, './src'),
        '@yookue/ts-lang-utils': path.resolve(__dirname, './src'),
    },
    extraBabelPlugins: [
        ['babel-plugin-comments', {
            remove: 'all',
        }]
    ]
});