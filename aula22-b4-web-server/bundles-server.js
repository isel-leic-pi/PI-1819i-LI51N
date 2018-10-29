'use strict'

const http = require('http')
const url = require('url')
const bundlesWebApi = require('./bundles-web-api')

const webServer = new WebServer()
bundlesWebApi(webServer)
http
    .createServer(webServer.router)
    .listen(3000, () => console.log('Server running on port 3000'))

function WebServer() {
    const routes = []
    this.use = (r) => {
        routes.push(r)
    }
    this.router = (req, resp) => {
        const {pathname}  = url.parse(req.url, true) // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: ${method} request to ${pathname}`)
        
        for (let index = 0; index < routes.length; index++) {
            const r = routes[index]
            if(r(req, resp)) {
                // The route sends a response
                break
            }
        }
    }
}