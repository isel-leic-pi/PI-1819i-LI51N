'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    'entry': {
        index: './app/entry.js'
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/b4index.html',
            inject: true,
            chunks: ['index'],
            filename: 'b4index.html'
        }),
        new HtmlWebpackPlugin({
            template: './app/bookSearch.html',
            inject: true,
            chunks: ['index'],
            filename: 'bookSearch.html'
        })
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        },{
            test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
        },
        {
            test: /\.(hbs)$/,
            use: 'raw-loader'
        },
        {
            test: /\.(html)$/,
            use: 'html-loader'
        }]
    }
}

