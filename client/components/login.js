const React = require('react');

module.exports = function(props) {
  return <div class="content">
    <form action="https://accounts.spotify.com/authorize" method="GET" id="spotifyLogin">
      <input type="hidden" name="client_id" value="9aa2e7de31584c679c82b6c1e2f4238b"></input>
      <input type="hidden" name="response_type" value="token"></input>
      <input type="hidden" name="scope" value="user-read-playback-state user-read-email user-read-private"></input>
      <input type="hidden" name="redirect_uri" value="http://localhost:8081/callback"></input>
      {/* <input type="hidden" name="state" value={props.userID}></input> */}

      <button type="submit" id="searchButton" value="Spotify Login">login</button>
    </form>
  </div>
    
}