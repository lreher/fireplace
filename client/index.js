const React = require('react');
const ReactDOM = require('react-dom');

const Login = require('./components/login');
const App = require('./components/app');

const user = require('./utils/user');

function initializeRender(callback) {
  user.loggedIn(function(error, response) {
    if (error) {
      // create and set new ID
      const userID = user.createID();
      document.cookie = 'userID=' + userID + ';'

      callback(<Login userID={userID}></Login>, null);
      return;
    }
    
    callback(null, <App userID={response}></App>);
  });
} 

document.addEventListener('DOMContentLoaded', function () {

  initializeRender((promptLogin, promptApp) => {
    if (promptLogin) {
      ReactDOM.render(promptLogin, document.getElementById('root'));
      return;
    }

    ReactDOM.render(promptApp, document.getElementById('root'));
  })
})