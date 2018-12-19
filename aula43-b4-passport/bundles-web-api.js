'use strict'

const Bundle = require('./lib/bundle')
// const Bundle = require('./lib/bundle-mock')
const passport = require('passport')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

const bundle = Bundle.init(es)

module.exports = (app) => {
    app.use(checkAuthentication)
    app.post('/api/bundle', postBundle)
    app.get('/api/bundle', getBundles)
    app.get('/api/bundle/:id', getBundle)
    app.get('/api/books/search', bookSearch)
    app.use(resourceNotFond)
    app.use(errorHandler)

    function checkAuthentication(req, resp, next) {
        if(req.isAuthenticated()) 
            next()
        else next({
            'statusCode': 401,
            'err': 'Cannot access /api/bundle by unauthenticated users!'
        })
    }

    function bookSearch(req, resp, next) {
        const title = req.query.title
        const authors = req.query.authors
        bundle
            .searchBook(title, authors)
            .then(data => resp.json(data))
            .catch(next)
    }
    function postBundle(req, resp, next) {
        const name = req.body.name
        bundle
            .create(req.user._id, name)
            .then(data => resp.json(data))
            .catch(next)
    }
    function getBundles(req, resp, next) {
        bundle
            .getAll(req.user._id)
            .then(data => resp.json(data))
            .catch(next)
    }
    function getBundle(req, resp, next) {
        const id = req.params.id
        bundle
            .get(id)
            .then(bundle => resp.json(bundle))
            .catch(next)
    }
    function resourceNotFond(req, resp, next) {
        next({
            'statusCode': 404,
            'error': 'Resource Not Found!'
        })
    }
    function errorHandler(err, req, res, next) {
        res.statusCode = err.statusCode || 500
        const error = err instanceof Error
            ? { 'message': err.message, 'stack': err.stack}
            : err
        res.json(error)
    }
}

