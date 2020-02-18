var axios = require('axios')
var queryString = require('querystring')

function requestToken(code, callback) {
  // Safety first!
  var clientID = process.env.CLIENT_ID
  var secretKey = process.env.CLIENT_SECRET

  var authorizationText = (clientID + ':' + secretKey)
  var base64Auth = Buffer.from(authorizationText).toString('base64')

  var data = {
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: 'http://localhost:8080/callback'
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
    callback(null, result)
  })
  .catch(callback)
}

module.exports = requestToken
