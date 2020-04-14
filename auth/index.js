var requestAccessToken = require('../services/requestAccessToken');

var accessToken;
var refreshToken;

// ahhh
var users = {};

function authorize(code, userID, callback) {
  requestAccessToken(code, function(error, response) {
    if (error) {
      callback(error, null);
      return;
    }
 
    accessToken = response.data.access_token;
    refreshToken =  response.data.refresh_token;

    users[userID] = {
      accessToken: accessToken, 
      refreshToken: refreshToken
    };
    console.log(users);

    //setInterval(tokenRefresh, 300000);
 
    callback(null, response);
  })
 }
 

module.exports = {
  authorize
}