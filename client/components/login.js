const React = require('react');

const Header = require('./header');

module.exports = function(props) {
  return <div>
    <Header userName={null}></Header>
    <div className="login">
      <form action="https://accounts.spotify.com/authorize" method="GET">
        <input type="hidden" name="client_id" value="bb0223ab795042bea7ba790b47c20a5c"></input>
        <input type="hidden" name="response_type" value="code"></input>
        <input type="hidden" name="scope" value="playlist-modify-public user-read-playback-state streaming user-read-email user-modify-playback-state user-read-private user-library-read user-top-read"></input>
        <input type="hidden" name="state" value={props.userID}></input>
        <input type="hidden" name="redirect_uri" value="https://fireplace.onrender.com/callback"></input>

        <button type="submit" id="loginButton" value="Spotify Login">login</button>
      </form>
    </div>
  </div>
}