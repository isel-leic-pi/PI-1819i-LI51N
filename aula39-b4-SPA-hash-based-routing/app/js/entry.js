'use strict'

require('./../../node_modules/bootstrap/dist/css/bootstrap.css')
const bookSearch = require('./bookSearch')
const b4index = require('./b4index')
const mainView = require('./../views/main.html')

document.body.innerHTML = mainView
const divMain = document.getElementById('divMain')

window.onhashchange = showView
window.onload = showView

function showView() {
    const path = window.location.hash
    switch(path) {
        case '#b4index':
            b4index(divMain)
            break
        case '#bookSearch':
            bookSearch(divMain)
            break

    }
}