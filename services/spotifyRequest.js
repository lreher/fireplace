var axios = require('axios')

module.exports = function(method, endpoint, token, callback) {

  axios({
    method: method,
    url: 'https://api.spotify.com/v1' + endpoint,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(result => {
    callback(null, result.data)
  })
  .catch(callback)
}
