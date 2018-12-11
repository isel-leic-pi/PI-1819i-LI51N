'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    'entry': {
        index: './app/js/entry.js'
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/views/b4index.html',
            inject: true,
            chunks: ['index'],
            filename: 'b4index.html',
            favicon: './app/img/Frogatto.png'
        }),
        new HtmlWebpackPlugin({
            template: './app/views/bookSearch.html',
            inject: true,
            chunks: ['index'],
            filename: 'bookSearch.html',
            favicon: './app/img/Frogatto.png'
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
            test: /\.hbs$/,
            use: 'raw-loader'
        },
        {
            test: /\.html$/,
            use: 'html-loader'
        }]
    }
}

