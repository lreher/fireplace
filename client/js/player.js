var queue;
var playButton = document.getElementById("playButton");

playButton.addEventListener('click', function() {
  if (playButton.className === 'play') {
    playButton.setAttribute('class', 'pause')
  } else {
    playButton.setAttribute('class', 'play')
  }
})

hasDevice();

function hasDevice() {
  var url = 'http://localhost:8080/current_device'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderQueue()
    } else if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 404) {
      selectDevice()
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function selectDevice() {
  var url = 'http://localhost:8080/devices'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      devices = JSON.parse(xhr.responseText).devices

      var deviceList = document.getElementById("deviceList")

      function renderDevice(device){
        var button;
        var deviceElement = crel('div', { class: 'device' },
          crel('h4', device.name),
          button = crel('button', { class: "addDeviceButton" }, 'Select')
        );

        button.addEventListener('click', () => setDevice(device.id))

        return deviceElement;
      }

      crel(deviceList, devices.map(renderDevice))
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function setDevice(deviceID) {
  var url = 'http://localhost:8080/set_device'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderQueue()
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(deviceID)
}

function renderQueue() {
  deviceList = document.getElementById("deviceList")
  deviceList.style.display = 'none'

  var url = 'http://localhost:8080/songs'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var songs = JSON.parse(xhr.responseText)
      queue = songs

      function renderSong(song) {
        var songElement = crel('div', { class: 'song' },
          crel('p', song.name),
          crel('p', song.album),
          crel('p', song.artists)
        );

        return songElement;
      }

      crel(playerQueue, { style: "display: block" },
        songs.map(renderSong)
      );
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
    songURI: songURI
  }))
}
