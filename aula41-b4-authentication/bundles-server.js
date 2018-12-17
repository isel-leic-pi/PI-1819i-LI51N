'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bundlesWebApi = require('./bundles-web-api')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const nconf = require('nconf')

/**
 * Setup the express instance
 */
nconf
    .argv()
    .env()
    .defaults({'NODE_ENV': 'development'})

const app = express()
app.use(morgan('dev'))

const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'

console.log('Running ' + NODE_ENV)

if(isDev)
    app.use(webpackMiddleware(webpack(webpackConfig), {
        publicPath: '/',
        stats: {colors: true}
    }))
else
    app.use(express.static('dist'))

/**
 * Add bundle routes
 */
bundlesWebApi(app)

/**
 * Starts the web server
 */
http
    .createServer(app)
    .listen(3000, () => console.log('Server running on port 3000'))
