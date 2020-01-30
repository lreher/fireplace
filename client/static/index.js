(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// var superagent = require('superagent')
//
// module.exports = function(data) {
//   superagent
//     .post('http://localhost:8080/')
//     .send(data)
//     .set('accept', 'json')
//     .end(function(err, res) {
//       console.log('test')
//       console.log(res)
//     })
// }
//

module.exports = function(data) {
  console.log("Making a request with " + JSON.stringify(data))

  var url = 'http://localhost:8080/' + JSON.stringify(data)
  var http_req = new XMLHttpRequest();

  http_req.onreadystatechange = function() {
    console.log(http_req.responseText)
  }

  http_req.open("POST", url, true)
  http_req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  http_req.send(JSON.stringify(data))
}

},{}],2:[function(require,module,exports){
var apiCall = require('./app/apiCall')

var searchBar = document.getElementById('searchBar')
var searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', function() {
  console.log(searchBar.value)

  apiCall(searchBar.value)
})

},{"./app/apiCall":1}]},{},[2]);
