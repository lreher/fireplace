const React = require('react');
const ReactDOM = require('react-dom');

const Header = require('./components/header');
const Login = require('./components/login');

const user = require('./utils/user');
var userID;

class LoginApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>
      <Header></Header>
      <Login userID={userID}></Login>
    </div>
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>
      <Header></Header>
    </div>
  }
}


document.addEventListener('DOMContentLoaded', function () {
  userID = user.getIDFromCookie(document.cookie);

  if (userID == null) {
    userID = user.createID();
    document.cookie = 'userID=' + userID + ';'
    ReactDOM.render(<LoginApp/>, document.getElementById('root'));
  } else {
    ReactDOM.render(<App/>, document.getElementById('root'));
  }
})