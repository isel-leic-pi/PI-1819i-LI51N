'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bundlesWebApi = require('./bundles-web-api')
const staticFiles = require('./lib/static-files')

const webServer = express()
webServer.use(morgan('dev'))
webServer.use(staticFiles('public'))
bundlesWebApi(webServer)
http
    .createServer(webServer)
    .listen(3000, () => console.log('Server running on port 3000'))
