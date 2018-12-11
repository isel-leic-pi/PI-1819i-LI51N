'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bundlesWebApi = require('./bundles-web-api')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const nconf = require('nconf')

nconf
    .argv()
    .env()
    .defaults({'NODE_ENV': 'development'})

const webServer = express()
webServer.use(morgan('dev'))

const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'

console.log('Running ' + NODE_ENV)

if(isDev)
    webServer.use(webpackMiddleware(webpack(webpackConfig), {
        publicPath: '/',
        stats: {colors: true}
    }))
else
    webServer.use(express.static('dist'))

bundlesWebApi(webServer)
http
    .createServer(webServer)
    .listen(3000, () => console.log('Server running on port 3000'))
