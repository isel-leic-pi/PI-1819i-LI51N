'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
require('./../../node_modules/bootstrap/dist/js/bootstrap.js')
const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const util = require('./util.js')
const bookSearch = require('./bookSearch')
const b4index = require('./b4index')
const bundles = require('./bundles')
const mainView = require('./../views/main.html')
const navView = Handlebars.compile(require('./../views/navbar.hbs'))

document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')
const divNavbar = document.getElementById('divNavbar')

util.fetchJSON('/api/auth/session')
    .catch(err => util.showAlert('fetch /api/auth/session: ' + err))
    .then(session => divNavbar.innerHTML = navView(session))


window.onhashchange = showView
window.onload = showView
util.showAlert('b4app is working!', 'info')

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
        default:
            divMain.innerHTML = 'Resource not found!'
    }
    updateNav(path)
}
function updateNav(path){
    // Deactivate previous anchor
    const prev = document.querySelector('a.active')
    if(prev) prev.classList.remove('active')

    // Activate anchor in navigation bar
    const option = document.getElementById('nav' + path)
    if(option) option.classList.add('active')
}
