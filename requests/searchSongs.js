var request = require('request')

module.exports = function(query, token, callback) {
  queryString = "?q=" + query.replace(/\s/g , "+") + "&type=track"

  request.get({
    url: 'https://api.spotify.com/v1/search' + queryString,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  },
  function(error, response, body) {
    if (!error) {
      callback(body.tracks.items)
    } else {
      console.log('haha')
    }
  })
}
