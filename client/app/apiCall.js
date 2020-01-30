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
