'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const util = require('./util.js')
const bundlesCreateView =  Handlebars.compile(require('./../views/bundlesCreate.hbs'))
const bundlesListView =  Handlebars.compile(require('./../views/bundlesList.hbs'))

module.exports = async (divMain) => {
    
    
    try{
        divMain.innerHTML = ''
        const session = await util.fetchJSON('/api/auth/session')
        if(!session.auth)
            return util.showAlert('You cannot access Bundles! Only for authenticated users.')
        divMain.innerHTML = bundlesCreateView()
        const view = await getBundlesView()
        divMain.insertAdjacentHTML('beforeend', view)
        document
            .getElementById('btNewBundle')
            .addEventListener('click',  newBundleHandler)
    }
    catch(err){
        util.showAlert(JSON.stringify(err))
    }

    function newBundleHandler(ev) {
        ev.preventDefault()
        const txtBundleName = document.getElementById('txtBundleName')
        const url = 'http://localhost:3000/api/bundle'
        const options = {
            method: 'POST',
            body: `name=${txtBundleName.value}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        fetch(url, options)
            .then(getBundlesView)
            .then(view => {
                divMain.querySelector('table').remove()
                divMain.insertAdjacentHTML('beforeend', view)
            })
            .catch(err => util.showAlert(err, 'danger'))
    }
    function getBundlesView() {
        return fetch('http://localhost:3000/api/bundle')
            .then(resp => resp.json())
            .then(arr => bundlesListView({'bundles': arr}))
    }
}
