var axios = require('axios')
var queryString = require('querystring')

// Safety first!
var clientID = process.env.CLIENT_ID
var secretKey = process.env.CLIENT_SECRET

var lastToken;

function requestToken(callback) {
  if(lastToken){
    return callback(null, lastToken);
  }

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
    lastToken = result.data.access_token
    callback(null, result.data.access_token)
  })
  .catch(callback)
}

requestToken(console.log);

module.exports = requestToken
