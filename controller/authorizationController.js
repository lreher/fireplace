var requestToken = require('../services/requestToken')

var accessToken;

function authorize(code, callback) {
 requestToken(code, function(error, response) {
   if (error) {
     callback(error, null);
   }

   accessToken = response.data.access_token;
   callback(null, response);
 })
}

function getAccessToken() {
  return accessToken;
}

module.exports = {
  authorize: authorize,
  getAccessToken:  getAccessToken
}
