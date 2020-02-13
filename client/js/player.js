var deviceID;

window.onload = function() {
  var url = 'http://localhost:8080/devices'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      devices = JSON.parse(xhr.responseText).devices

      var deviceList = document.getElementById("deviceList")

      for (var i = 0; i < devices.length; i++) {
        var device = document.createElement("p")
        var deviceButton = document.createElement("button")

        device.innerHTML = devices[0].name
        deviceButton.innerHTML = "Select"

        deviceButton.addEventListener('click', function() {
          deviceID = devices[0].id
          renderSongs(deviceID)
        })

        deviceList.appendChild(device)
        deviceList.appendChild(deviceButton)
      }
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function renderSongs() {
  var url = 'http://localhost:8080/songs'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var songs = JSON.parse(xhr.responseText)

      var songList = document.getElementById("songList")
      songList.style.display = 'block'

      for(var i = 0; i < songs.length; i++) {
        var song = document.createElement("p")
        var songButton = document.createElement("button")

        song.innerHTML = songs[i].name + '<br/>' + songs[i].artists + '<br/>' + songs[i].album
        songButton.innerHTML = "Select"
        songButton.setAttribute('id', songs[i].uri)

        songButton.addEventListener('click', function(event) {
          playSong(event.srcElement.id)
        })

        songList.appendChild(song)
        songList.appendChild(songButton)
      }
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 500) {
      console.log("ohboy")
    }
  }

  xhr.open("GET", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}


function playSong(songURI) {
  var url = 'http://localhost:8080/play'
  var xhr = new XMLHttpRequest();

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify({
    songURI: songURI,
    deviceID: deviceID
  }))
}
