'use strict'

const http = require('http')
const express = require('express')
const morgan = require('morgan')
const bundlesWebApi = require('./bundles-web-api')

const webServer = express()
webServer.use(morgan('dev'))
bundlesWebApi(webServer)
http
    .createServer(webServer)
    .listen(3000, () => console.log('Server running on port 3000'))
