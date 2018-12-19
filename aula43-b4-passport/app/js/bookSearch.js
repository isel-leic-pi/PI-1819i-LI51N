'use strict'

const Handlebars = require('./../../node_modules/handlebars/dist/handlebars.js')
const searchResultsTemplate = require('./../views/bookSearchResults.hbs')
const bookSearchView = require('./../views/bookSearch.html')
const util = require('./util')

module.exports = (divMain) => {

    divMain.innerHTML = bookSearchView
    document
        .getElementById('buttonSearch')
        .addEventListener('click', searchHandler)

    const inputTitle = document.getElementById('inputTitle')
    const inputAuthors = document.getElementById('inputAuthors')
    const divSearchResults = document.getElementById('divSearchResults')
    const searchResultsView = Handlebars.compile(searchResultsTemplate)

    function searchHandler(ev){
        ev.preventDefault()
        const title = inputTitle.value
        const authors = inputAuthors.value
        util.fetchJSON(`http://localhost:3000/api/books/search?title=${title}&authors=${authors}`)
            .then(arr => divSearchResults.innerHTML = searchResults(arr))
            .catch(err => util.showAlert('fetch /api/books/search: ' + JSON.stringify(err)))
    }
    /**
     * Returns an HTML partial view binding this template with a Book object.
     * 
     * @param {*} books Array of Book objects with: title, authors array and subjects array.
     */
    function searchResults(books) {
        return searchResultsView({books})
    }
}