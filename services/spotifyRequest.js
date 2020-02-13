var axios = require('axios')
var queryString = require('querystring')

module.exports = function(method, endpoint, body, token, callback) {

  axios({
    method: method,
    url: 'https://api.spotify.com/v1' + endpoint,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
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
