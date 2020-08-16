'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
        formatter: require('eslint-friendly-formatter'),
        emitWarning: !config.dev.showEslintErrorsInOverlay,
    },
});

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath,
    },
    externals: { api: 'api' },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            assets: resolve('src/assets'),
            config: process.env.NODE_ENV === 'production' ?
                resolve('src/config/system') : resolve('src/config/system/k-config.yml'),
            custom: resolve('src/config/custom/custom.xml'),
            view: resolve('src/view'),
            '@': resolve('src'),
        },
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {
                test: /\.vue$/,
                use: [{
                        loader: 'vue-loader',
                        options: vueLoaderConfig,
                    },
                    {
                        loader: '@ktw/kcore-loader',
                        options: {
                            prefix: false,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client'),
                    resolve('node_modules/@ktw/permission/src'),
                ],
            },
            {
                test: /\.svg$/,
                include: [resolve('src/assets/icon')],
                use: [{
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'kicon-[name]',
                        },
                    },
                    'svgo-loader',
                ],
            },
            // {
            //     test: /\.yml$/,
            //     loader: 'yml-loader',
            // },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                exclude: [resolve('src/assets/icon')],
                options: {
                    limit: 10000,
                    publicPath: '../../',
                    name: utils.assetsPath('img/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../../',
                    name: utils.assetsPath('media/[name].[hash:7].[ext]'),
                },
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    publicPath: '../../',
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
                },
            },
            //xml使用kxml-loader加载器解析
            {
                test: /\.xml$/,
                loader: require.resolve('../src/utils/xml-loader.js'),
                query: {
                    explicitArray: false, //默认点会转换为一个数组,设置explicitArray可以转换为数字或字符串
                    ignoreAttrs: true,
                    xmlRoot: 'root', //xml文件的根节点,移除掉xml根节点
                    conclusionType: true, //推断数据类型(Boolean和Number),并转换为对应类型值
                },
            },
            //自定义yml loader加载器
            {
                test: /\.yml$/,
                loader: require.resolve('../src/utils/yaml-loader.js'),
            }
        ],
    },
    node: {
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    },
};