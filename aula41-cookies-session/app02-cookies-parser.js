'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
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
app.use((req, resp, next) => {
    console.log(req.cookies)
    next()
})
app.use((req, resp) => {
    resp.cookie('username', 'fmcarvalho', {expires: new Date(Date.now() - 1000)})
    resp.cookie('bag', JSON.stringify(bag))
    resp.cookie('location', 'Lisbon')
    resp.end()
})
/**
 * Launch server
 */
app.listen(3000)
console.log('Listening on port 3000...')