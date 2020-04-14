const React = require('react');

module.exports = function(props) {
  return <div class="content">
    <form action="https://accounts.spotify.com/authorize" method="GET">
      <input type="hidden" name="client_id" value="bb0223ab795042bea7ba790b47c20a5c"></input>
      <input type="hidden" name="response_type" value="code"></input>
      <input type="hidden" name="scope" value="playlist-modify-public user-read-playback-state streaming user-read-email user-modify-playback-state user-read-private"></input>
      <input type="hidden" name="redirect_uri" value="http://localhost:8081/callback"></input>

      <button type="submit" id="searchButton" value="Spotify Login">Play</button>
    </form>
  </div>
    
}