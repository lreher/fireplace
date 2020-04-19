module.exports = function(method, url, data, callback) {
  var xhr = new XMLHttpRequest();
  
  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      callback(null, xhr.responseText);
    } else if (xhr.readyState === XMLHttpRequest.DONE) {
      callback({
        status: xhr.status,
        responseText: xhr.responseText
      }, null);
    }
  }
  
  xhr.open(method, url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  xhr.send(data)
}

