const React = require('react');
const ReactDOM = require('react-dom');

const Header = require('./components/header');
const Login = require('./components/login');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>
      <Header></Header>
      <Login></Login>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<App/>, document.getElementById('root'));
})