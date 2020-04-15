var axios = require('axios')
var queryString = require('querystring')
var auth = require('../auth/')

module.exports = function(method, endpoint, body, userID, callback) {
  axios({
    method: method,
    url: 'https://api.spotify.com/v1' + endpoint,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + auth.getUserToken(userID)
    },
    data: body
  })
  .then(result => {
    callback(null, result.data)
  })
  .catch(error => {
    callback(error, null)
  })
}
