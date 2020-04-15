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

module.exports = {
  createID,
  getIDFromCookie
}