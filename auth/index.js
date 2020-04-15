var requestAccessToken = require('../services/requestAccessToken');

// ahhh
var users = {};

function authorize(code, userID, callback) {
  requestAccessToken(code, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }

    users[userID] = {
      accessToken:  response.data.access_token, 
      refreshToken: response.data.refresh_token
    };

    //setInterval(tokenRefresh, 300000);
 
    callback(null, response);
  })
 }

 function getUserToken(userID) {
  if (users[userID]) {
    return users[userID].accessToken;
  }

  return null;
 }
 

module.exports = {
  authorize, 
  getUserToken
}