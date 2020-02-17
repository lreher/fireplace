var axios = require('axios')
var queryString = require('querystring')
var authorization = require('../controller/authorizationController')

module.exports = function(method, endpoint, body, callback) {

  axios({
    method: method,
    url: 'https://api.spotify.com/v1' + endpoint,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + authorization.getAccessToken()
    },
    data: body
  })
  .then(result => {
    console.log(result)
    callback(null, result.data)
  })
  .catch(error => {
    callback(error, null)
  })
}
