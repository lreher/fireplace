var test = require('tape');
var axios = require('axios');

var createServer = require('../../server');
var serveFile = require('../../router/serveFile');

test('serves HTML files correctly', function(t) {
  t.plan(1);

  var server = createServer(function(request, response) {
    serveFile(response, '../client/static/index.html');
  });

  axios.get('https://fireplace.onrender.com/')
    .then(function(response) {
      t.assert(response.headers['content-type'] == 'text/html');
      server.close();
  })
})

test('serves CSS files correctly', function(t) {
  t.plan(1);

  var server = createServer(function(request, response) {
    serveFile(response, '../client/static/stylesheet.css');
  });

  axios.get('https://fireplace.onrender.com/')
    .then(function(response) {
      t.assert(response.headers['content-type'] == 'text/css');
      server.close();
  })
})

test('serves JS files correctly', function(t) {
  t.plan(1);

  var server = createServer(function(request, response) {
    serveFile(response, '../client/static/bundle.js');
  });

  axios.get('https://fireplace.onrender.com/')
    .then(function(response) {
      t.assert(response.headers['content-type'] == 'text/json');
      server.close();
  })
})
