'use strict'

const passport = require('passport')
const auth = require('./lib/auth.js')

module.exports = (app) => {
    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((userId, done) => auth
        .getUser(userId)
        .then(user => done(null, user))
        .catch(err => done(err))
    )
    app.use(passport.initialize())
    app.use(passport.session())

    app.get('/api/auth/session', getSession)
    app.post('/api/auth/login', login)
    app.post('/api/auth/logout', logout)
    app.post('/api/auth/signup', signup)

    function getSession(req, resp, next) {
        const fullname = req.isAuthenticated() ? req.user.fullname : undefined
        resp.json({
            'auth': req.isAuthenticated(),
            'fullname': fullname
        })
    }
    function login(req, resp, next) {
        next()
    }
    function logout(req, resp, next) {
        next()
    }
    function signup(req, resp, next) {
        auth
            .createUser(req.body.fullname, req.body.username, req.body.password)
            .then(user => {
                req.login(user)
                resp.json(user)
            })
        next()
    }
}