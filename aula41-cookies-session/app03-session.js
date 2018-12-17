'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
/**
 * Bag
 */
const bag = {
    items: ['iphone', 'laptop', 'bike'],
    total: 1750
}
/**
 * Setup express
 */
const app = express()
app.use(cookieParser())
app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true }))

app.use((req, resp, next) => {
    console.log(req.cookies)
    console.log(req.session)
    next()
})
app.use((req, resp) => {
    req.session.username = 'fmcarvalho'
    req.session.bag = JSON.stringify(bag)
    req.session.location = 'Lisbon'
    resp.end()
})
/**
 * Launch server
 */
app.listen(3000)
console.log('Listening on port 3000...')