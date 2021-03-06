var queue;

var playButton = document.getElementById("playButton");

playButton.addEventListener('click', function() {
  if (playButton.innerHTML === 'Start') {
    start()
  } else {
    end()
  }
})

hasDevice();

function hasDevice() {
  var url = 'http://localhost:8080/current_device'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderQueue()
      renderPlayed()

      setInterval(renderQueue, 5000)
      setInterval(renderPlayed, 5000)
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

      if (deviceList.length === 0) {
        setTimeout(selectDevice, 3000)
        return;
      }

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
    } else if (xhr.readyState === XMLHttpRequest.DONE) {
      setTimeout(selectDevice, 3000)
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
      hasDevice();
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

  var url = 'http://localhost:8080/queue'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var songs = JSON.parse(xhr.responseText)
      queue = songs

      var playerList  = document.getElementById('playerList')
      playerList.innerHTML = ""

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

function renderPlayed() {
  var url = 'http://localhost:8080/played'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      var songs = JSON.parse(xhr.responseText)

      var playedList  = document.getElementById('playedList')
      playedList.innerHTML = ""

      var saveButton = document.getElementById('saveButton')

      function renderSong(song) {
        var songElement = crel('div', { class: 'song' },
          crel('p', song.name),
          crel('p', song.album),
          crel('p', song.artists)
        );

        return songElement;
      }

      saveButton = crel('button', { id: 'saveButton' }, 'Save playlist')

      crel(playedList, { style: "display: block" },
        songs.map(renderSong),
        saveButton
      );

      saveButton.addEventListener('click', function() {
        save(saveButton)
      })
    }
  }

  xhr.open("GET", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function start() {
  var url = 'http://localhost:8080/start'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      playButton.innerHTML = ""
      crel(playButton, "End")

      playButton.classList.remove("success")
      void playButton.offsetWidth;
      playButton.classList.add("success")

    } else if (xhr.readyState === XMLHttpRequest.DONE) {
      playButton.classList.remove("fail")
      void playButton.offsetWidth;
      playButton.classList.add("fail")
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function end() {
  var url = 'http://localhost:8080/end'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      playButton.classList.remove("success")
      void playButton.offsetWidth;
      playButton.classList.add("success")

      window.location.reload(true);

    } else if (xhr.readyState === XMLHttpRequest.DONE) {
      playButton.classList.remove("fail")
      void playButton.offsetWidth;
      playButton.classList.add("fail")
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}

function save(saveButton) {
  var url = 'http://localhost:8080/save'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      saveButton.classList.remove("success")
      void saveButton.offsetWidth;
      saveButton.classList.add("success")

    } else if (xhr.readyState === XMLHttpRequest.DONE) {
      saveButton.classList.remove("fail")
      void saveButton.offsetWidth;
      saveButton.classList.add("fail")
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}
