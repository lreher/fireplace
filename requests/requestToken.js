var axios = require('axios')
var queryString = require('querystring')

// Safety first!
var clientID = process.env.CLIENT_ID
var secretKey = process.env.CLIENT_SECRET

module.exports = function(callback) {
  var authorizationText = (clientID + ':' + secretKey)
  var base64Auth = Buffer.from(authorizationText).toString('base64')

  var data = {
    grant_type: 'client_credentials'
  }

  axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    json: true,
    headers: {
      Authorization: 'Basic ' + base64Auth
    },
    data: queryString.stringify(data)
  })
  .then(result => {
    callback(null, result.data.access_token)
  })
  .catch(callback)
}
