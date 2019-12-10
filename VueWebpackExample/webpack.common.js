const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPluginCopy = require('webpack-plugin-copy');

module.exports = {
    entry: './resources/assets/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.js',
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
    plugins: [
        new CleanWebpackPlugin(),
        new WebpackPluginCopy([
            {from: './resources/assets/index.html', to: '../index.html' }
        ])
    ]
};