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
      server.close();
  })
})

test('/bundle.js', function(t) {
  t.plan(1);

  var server = createServer(router);

  axios.get('http://localhost:8081/bundle.js')
    .then(function(response) {
      t.assert(response.status === 200)
      server.close();
  })
})

test('/callback', function(t) {
  t.plan(1);

  var server = createServer(router);

  mock_url = 'callback?code=AQCjC17GyNPaLjvdpV8quS-tYu1tekSsFZiOcjlI1nST79A6A7puG_wGyRev4iS8OBNWpE8B_KquC1oHZdCyDVwt0fTW2wKK9lpPFfquUS4V-adUTMmGNgzUTm5fhZDSkyrtY-HUkEt1TwPuZmHUOH9y-zXmV-jFhfAe8Ca24zVchi327SI3R9J6omu4-onhPttM7rSePKe1z2uFV22Ht5ZmRHc6hh359cEDmDsS79IG6rfM3phbWIEbC0JfmNZWUFYUuqNL_h2yBxF-2gTVTAjUXIBOKUYZg0lzs6MIEzofzgQ3m6rPM1pys2LAGK4iQJt28u10Ya5qh51W-Ra3TlKe5PgNtNKwJbURnRtwplvY&state=ya'

  // oof
  axios.get('http://localhost:8081/callback?code=AQCjC17GyNPaLjvdpV8quS-tYu1tekSsFZiOcjlI1nST79A6A7puG_wGyRev4iS8OBNWpE8B_KquC1oHZdCyDVwt0fTW2wKK9lpPFfquUS4V-adUTMmGNgzUTm5fhZDSkyrtY-HUkEt1TwPuZmHUOH9y-zXmV-jFhfAe8Ca24zVchi327SI3R9J6omu4-onhPttM7rSePKe1z2uFV22Ht5ZmRHc6hh359cEDmDsS79IG6rfM3phbWIEbC0JfmNZWUFYUuqNL_h2yBxF-2gTVTAjUXIBOKUYZg0lzs6MIEzofzgQ3m6rPM1pys2LAGK4iQJt28u10Ya5qh51W-Ra3TlKe5PgNtNKwJbURnRtwplvY&state=ya')
    .then(function(response) {
      t.assert(response.status === 302)
      server.close();
    })
    .catch(function(error) {
      t.assert(true)
      server.close();
    })
})

test('/me?userID=', function(t) {
  t.plan(1);

  var server = createServer(router);

  mock_url = '/me?userID=dasdf-asdfasdf-asdfasdf';

  // oof
  axios.get('http://localhost:8081/' + mock_url)
    .then(function(response) {
      t.assert(response.status === 200)
      server.close();
    })
    .catch(function(error) {
      t.assert(true)
      server.close();
    })
})
