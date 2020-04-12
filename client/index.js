const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <div>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(<App/>, document.getElementById('root'));
})