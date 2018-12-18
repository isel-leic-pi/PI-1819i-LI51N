'use strict'

const util = require('./util.js')
const loginView = require('./../views/login.html')

module.exports = (divMain) => {
    divMain.innerHTML = loginView

    const txtFullname = document.getElementById('inputFullname')
    const txtPassword = document.getElementById('inputPassword')
    const txtUsername = document.getElementById('inputUsername')

    const bt = document.getElementById('buttonSignup')
    bt.addEventListener('click', signupHander)
    document
        .getElementById('buttonLogin')
        .addEventListener('click', loginHander)

    function signupHander(ev) {
        ev.preventDefault()
        const url = 'http://localhost:3000/api/auth/signup'
        const options = {
            method: 'POST',
            body: JSON.stringify({
                'fullname': txtFullname.value,
                'username': txtUsername.value,
                'password': txtPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch(url, options)
            .then(resp => window.location.hash = '#b4index')
            .catch(err => util.showAlert(err, 'danger'))
    }
    function loginHander(ev) {
        ev.preventDefault()
    }
}