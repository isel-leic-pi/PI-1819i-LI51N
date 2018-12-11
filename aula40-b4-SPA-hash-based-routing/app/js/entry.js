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