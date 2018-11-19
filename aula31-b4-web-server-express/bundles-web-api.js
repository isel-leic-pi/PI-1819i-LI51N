'use strict'

const url = require('url')
const Bundle = require('./lib/bundle')
// const Bundle = require('./lib/bundle-mock')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const bundle = Bundle.init(es)

module.exports = (app) => {
    app.use(postBundle)
    app.use(getBundle)
    app.use(resourceNotFond)
    return app

    function postBundle(req, resp) {
        const {pathname, query}  = url.parse(req.url, true) // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: request to ${pathname}`)
    
        if(method == 'POST' && pathname == '/api/bundle'){
            const name = query.name
            bundle.create(name, (err, data) => {
                if(err) {
                    resp.statusCode = err.code
                    resp.end()
                } else {
                    resp.statusCode = 200
                    resp.end(JSON.stringify(data))
                }
            })
            // create a bundle
            return true
        }
        return false
    }

    function getBundle(req, resp) {
        const {pathname}  = url.parse(req.url, true) // true to parse also the query-string
        const method = req.method
        console.log(`${Date()}: request to ${pathname}`)
    
        if(method == 'GET' && pathname.indexOf('/api/bundle') >= 0){
            const id = pathname.split('/').pop()
            bundle.get(id, (err, bundle) => {
                if(err) {
                    resp.statusCode = err.code
                    resp.end()
                } else {
                    resp.statusCode = 200
                    resp.end(JSON.stringify(bundle))
                }
            })
            return true
        }
        return false
    }

    function resourceNotFond(req, resp) {
        resp.statusCode = 404
        resp.end('Resource Not Found!')
        return true
    }
}

