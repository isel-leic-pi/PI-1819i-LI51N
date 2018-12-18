'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bundlesWebApi = require('./bundles-web-api')
const authWebApi = require('./auth-web-api')
const webpackConfig = require('./webpack.config.js')
const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const nconf = require('nconf')
const bodyParser = require('body-parser')
const expressSession = require('express-session')

/**
 * Read configurations
 */
nconf
    .argv()
    .env()
    .defaults({'NODE_ENV': 'development'})
const NODE_ENV = nconf.get('NODE_ENV')
const isDev = NODE_ENV == 'development'
console.log('Running ' + NODE_ENV)
/**
 * Setup the express instance
 */
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(expressSession({secret: 'keyboard cat', resave: false, saveUninitialized: true }))
app.use(frontEndMiddleware(isDev))
/**
 * Add bundle and auth routes
 */
authWebApi(app)
bundlesWebApi(app)
/**
 * Starts the web server
 */
http
    .createServer(app)
    .listen(3000, () => console.log('Server running on port 3000'))

function frontEndMiddleware(isDev) {
    return isDev
        ? webpackMiddleware(webpack(webpackConfig))
        : express.static('dist')
}