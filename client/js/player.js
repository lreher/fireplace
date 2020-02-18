var queue;

var playButton = document.getElementById("playButton");

playButton.addEventListener('click', function() {
  if (playButton.innerHTML === 'Play') {
    play()
  } else {
    stop()

    playButton.innerHTML = ""
    crel(playButton, "Play")
  }
})

hasDevice();

function hasDevice() {
  var url = 'https://fireplace.onrender.com/current_device'
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
  var url = 'https://fireplace.onrender.com/devices'
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
  var url = 'https://fireplace.onrender.com/set_device'
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
  player = document.getElementById('player');
  player.style.display  = 'block';

  deviceList = document.getElementById("deviceList")
  deviceList.style.display = 'none'

  var url = 'https://fireplace.onrender.com/queue'
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

      crel(playerList, { style: "display: block" },
        songs.map(renderSong)
      );
    }
  }

  xhr.open("GET", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function play() {
  var url = 'https://fireplace.onrender.com/play'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      playButton.innerHTML = ""
      crel(playButton, "Stop")
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function stop() {
  var url = 'https://fireplace.onrender.com/stop'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      playButton.innerHTML = ""
      crel(playButton, "Play")
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}
