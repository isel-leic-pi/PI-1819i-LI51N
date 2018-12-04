'use strict'

fetch('http://localhost:3000/api/books/search?title=djfhd&authors=Twain')
    .then(res => res.json())
    .then(arr => {
        console.log(arr[1].title)
        document.body.innerHTML += JSON.stringify(arr[1])
    })
    .catch(err => console.log(err))