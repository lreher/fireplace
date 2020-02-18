var requestToken = require('../services/requestToken')
var refreshAccessToken = require('../services/refreshAccessToken')


var accessToken;
var refreshToken;

function authorize(code, callback) {
 requestToken(code, function(error, response) {
   if (error) {
     callback(error, null);
     return;
   }

   accessToken = response.data.access_token;
   refreshToken =  response.data.refresh_token;

   setInterval(tokenRefresh, 300000)

   callback(null, response);
 })
}

function getAccessToken() {
  return accessToken;
}

function tokenRefresh() {
  refreshAccessToken(refreshToken, function(error, response) {
    if (error) {
      return;
    }

    accessToken = response.accessToken
  })
}

module.exports = {
  authorize: authorize,
  getAccessToken:  getAccessToken
}
