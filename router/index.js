var fs = require('fs');
var path = require('path');


module.exports = function(request, response) {
  var url = request.url;
    
  switch(url) {
    default: 
      response.writeHead(400);
      response.end("Bad Request.");
  }
}