var axios = require('axios')

module.exports = function(query, token, callback) {
  queryString = "?q=" + query.replace(/\s/g , "+") + "&type=track"

  axios({
    method: 'GET',
    url: 'https://api.spotify.com/v1/search' + queryString,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(result => {
    console.log(result)
    callback(null, result.data.tracks.items)
  })
  .catch(callback)
}
