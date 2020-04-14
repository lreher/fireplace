var requestAccessToken = require('../services/requestAccessToken');

var accessToken;
var refreshToken;

function authorize(code, callback) {
  requestAccessToken(code, function(error, response) {
    if (error) {
      console.log(error)
      callback(error, null);
      return;
    }
 
    accessToken = response.data.access_token;
    refreshToken =  response.data.refresh_token;

    console.log(accessToken);
    console.log(refreshToken);
 
    //setInterval(tokenRefresh, 300000);
 
    callback(null, response);
  })
 }
 

module.exports = {
  authorize
}