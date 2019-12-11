const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPluginCopy = require('webpack-plugin-copy');

module.exports = {
    entry: { app: './resources/assets/js/app.js' },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].js',
        publicPath: './dist'
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                node_vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name: "vendor"
                }
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackPluginCopy([
            {from: './resources/assets/index.html', to: '../index.html' }
        ])
    ]
};