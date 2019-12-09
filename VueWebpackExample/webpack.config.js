const webpack = require('webpack');
const path = require('path');


console.log(process.env.NODE_ENV);

module.exports = {
        entry: './resources/assets/js/app.js',
        output: {
            path: path.resolve(__dirname, 'public/js'),
            filename: 'app.js',
            publicPath: './public'
        },
        module: {
            rules: [
                {
                    test: /\.js%/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js'
            }
        },
        plugins: []
};

if (process.env.production === "production") {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        })
    );
}
