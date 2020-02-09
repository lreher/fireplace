var axios = require('axios')
var queryString = require('querystring')

var clientID = process.env.CLIENT_ID
var secretKey = process.env.CLIENT_SECRET
var redirectURI = 'http://localhost:8080/callback'

function requestLogin(callback) {
  var body = {
    client_id: clientID,
    response_type: 'code',
    redirect_uri: redirectURI
  }

  console.log(body)

  axios({
    method: 'GET',
    url: 'https://accounts.spotify.com/authorize',
    json: true,
    data: queryString.stringify(body)
  })
  .then(result => {
    callback(null, result)
  })
  .catch(error => {
    callback(error, null)
  })
}

requestLogin()

module.exports = requestLogin
