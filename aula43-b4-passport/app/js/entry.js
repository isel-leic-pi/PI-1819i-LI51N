'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
require('./../../node_modules/bootstrap/dist/js/bootstrap.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const util = require('./util.js')
const bookSearch = require('./bookSearch')
const b4index = require('./b4index')
const bundles = require('./bundles')
const login = require('./login')
const mainView = require('./../views/main.html')
const navView = Handlebars.compile(require('./../views/navbar.hbs'))
/**
 * Add mainView and get placeholders references: divMain and divNavbar
 */
document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')
const divNavbar = document.getElementById('divNavbar')
/**
 * Gets the authentication session and insert the navbar.
 */
getAuthAndInsertNavbar()
/**
 * Add handlers for navigation menu
 */
window.onhashchange = showView
window.onload = showView
util.showAlert('b4app is working!', 'info')
/**
 * Navigation handler that dispatches to the corresponding front-end function.
 */
function showView() {
    const path = window.location.hash
    switch(path) {
        case '#b4index':
            b4index(divMain)
            break
        case '#bundles':
            bundles(divMain)
            break
        case '#bookSearch':
            bookSearch(divMain)
            break
        case '#login':
            login(divMain, getAuthAndInsertNavbar)
            break
        case '#signout':
            // TO DO !!!!
            break
        default:
            divMain.innerHTML = 'Resource not found!'
    }
    updateNav(path)
}
/**
 * Updates the navigation bar with the active menu option.
 * @param {String} path 
 */
function updateNav(path){
    // Deactivate previous anchor
    const prev = document.querySelector('a.active')
    if(prev) prev.classList.remove('active')

    // Activate anchor in navigation bar
    const option = document.getElementById('nav' + path)
    if(option) option.classList.add('active')
}
/**
 * Fetches the authentication session from /api/auth and 
 * inserts the navbar with the corresponding state.
 */
function getAuthAndInsertNavbar() {
    util.fetchJSON('/api/auth/session')
        .catch(err => util.showAlert('fetch /api/auth/session: ' + JSON.stringify(err)))
        .then(session => divNavbar.innerHTML = navView(session))
}

