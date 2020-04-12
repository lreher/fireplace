var test = require('tape');
var axios = require('axios');

var createServer = require('../../server');
var router = require('../../router');

test('/', function(t) {
  t.plan(2);

  var server = createServer(router);

  axios.get('http://localhost:8081/')
    .then(function(response) {
      t.assert(response.status === 200);
      t.assert(response.data != '');
      server.close();
  })
})

test('/stylesheet.css', function(t) {
  t.plan(1);

  var server = createServer(router);

  axios.get('http://localhost:8081/stylesheet.css')
    .then(function(response) {
      t.assert(response.status === 200)
      t.assert(response.data != '');
      server.close();
  })
})

test('serves bundle.js correctly', function(t) {
  t.plan(1);

  var server = createServer(router);

  axios.get('http://localhost:8081/bundle.js')
    .then(function(response) {
      t.assert(response.status === 200)
      t.assert(response.data != '');
      server.close();
  })
})

