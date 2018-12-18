'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const alertView = Handlebars.compile(require('./../views/alert.hbs'))

module.exports = {
    showAlert,
    fetchJSON
}

/**
* Show an alert to the user.
*/
function showAlert(message, type = 'danger') {
    document
        .getElementById('divAlerts')
        .insertAdjacentHTML('beforeend', alertView({type, message}))
}

/**
* Convenience method to fetch and decode JSON.
*/
async function fetchJSON(url) {
    const options = {method: 'GET', credentials: 'same-origin'}
    const resp = await fetch(url, options)
    const body = await resp.json()
    if(resp.status != 200) throw body
    else return body
}
