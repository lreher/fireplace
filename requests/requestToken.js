var request = require('request')

// Safety first!
var clientID = process.env.CLIENT_ID
var secretKey = process.env.CLIENT_SECRET

module.exports = function(callback) {
  var authorizationText = (clientID + ':' + secretKey)
  var base64Auth = Buffer.from(authorizationText).toString('base64')

  request.post({
    url: 'https://accounts.spotify.com/api/token',
    json: true,
    headers: {
      'Authorization': 'Basic ' + base64Auth
    },
    form: {
      grant_type: 'client_credentials'
    }
  },
  function(error, response, body) {
    if (!error) {
      callback(body.access_token)
    } else {
      console.log('lol')
    }
  })
}
