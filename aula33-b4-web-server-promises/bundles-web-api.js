'use strict'

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
    app.post('/api/bundle', postBundle)
    app.get('/api/bundle/:id', getBundle)
    app.use(resourceNotFond)
    app.use(errorHandler)

    function postBundle(req, resp, next) {
        const name = req.query.name
        bundle.create(name, (err, data) => {
            if(err) return next(err)
            resp.json(data)
        })
    }
    function getBundle(req, resp, next) {
        const id = req.params.id
        bundle.get(id, (err, bundle) => {
            if(err) return next(err)
            resp.json(bundle)
        })
    }
    function resourceNotFond(req, resp, next) {
        next({
            'code': 404,
            'error': 'Resource Not Found!'
        })
    }
    function errorHandler(err, req, res, next) {
        res.statusCode = err.code
        res.end(err.error)
    }
}

