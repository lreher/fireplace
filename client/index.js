const React = require('react');
const ReactDOM = require('react-dom');

const Header = require('./components/header');
const Login = require('./components/login');

const request = require('./utils/request');

const user = require('./utils/user');
var userID;

class App extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      userName: "Bobby"
    };
  }

  promptLogin() {
    var login;
    var userID = user.getIDFromCookie(document.cookie);

    if (userID == null) {
      userID = user.createID();
      document.cookie = 'userID=' + userID + ';'
      login = <Login userID={userID}></Login>
    } else {
      request('GET', 'http://localhost:8081/me?userID=' + userID, {}, (error, response) => {
        // userID not longer in back-end  
        if (error) {
          login = <Login userID={userID}></Login>
          console.log('hmm')
          return;
        }

        var userInfo = JSON.parse(response);

        this.setState({
          ...this.state,
          userName: userInfo.display_name
        })
      })
    }

    console.log(login)
    return login;
  }

  render() {
    return <div>
      <Header userName={this.state.userName}></Header>
      {this.promptLogin()}
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<App/>, document.getElementById('root'));
})