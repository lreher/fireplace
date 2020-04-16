const request = require('../utils/request');

function createID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}

function getIDFromCookie(cookie) {
  var values = cookie.split(';');
  var userID = null;

  values.map((value) => { 
    if (value.split('=')[0] === 'userID') {
      userID = value.split('=')[1];
    }
  })

  return userID;
}

function loggedIn(callback) {
  var storedID = getIDFromCookie(document.cookie);
  var userID = null;

  if (storedID != undefined && storedID != null) {
    request('GET', 'http://localhost:8081/me?userID=' + storedID, {}, (error, response) => {
      // stored ID not longer in back-end  
      if (error) {
        callback(storedID, null);
        return;
      }

      // stored ID is in back-end
      callback(null, storedID);
      return;
    })
  } else {
    callback('FIX ME!!!', null);
  }
}

module.exports = {
  createID,
  getIDFromCookie,
  loggedIn
}