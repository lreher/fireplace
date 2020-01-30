var apiCall = require('./app/apiCall')

var searchBar = document.getElementById('searchBar')
var searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', function() {
  console.log(searchBar.value)

  apiCall(searchBar.value)
})
