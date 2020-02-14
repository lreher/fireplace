hasDevice();

(e=>{const t="function",n="isNode",o=(e,t)=>typeof e===t,r=(e,t)=>{null!==t&&(Array.isArray(t)?t.map(t=>r(e,t)):(i[n](t)||(t=document.createTextNode(t)),e.appendChild(t)))};function i(e,a){let d,f,l=arguments,c=1;if(e=i.isElement(e)?e:document.createElement(e),o(a,"object")&&!i[n](a)&&!Array.isArray(a))for(d in c++,a)f=a[d],o(d=i.attrMap[d]||d,t)?d(e,f):o(f,t)?e[d]=f:e.setAttribute(d,f);for(;c<l.length;c++)r(e,l[c]);return e}i.attrMap={},i.isElement=(e=>e instanceof Element),i[n]=(e=>e instanceof Node),i.proxy=new Proxy(i,{get:(e,t)=>(!(t in i)&&(i[t]=i.bind(null,t)),i[t])}),e(i,t)})((e,t)=>{"object"==typeof exports?module.exports=e:typeof define===t&&define.amd?define(()=>e):this.crel=e});

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
        var deviceElement = crel('p', { class: 'device' },
          crel('h4', device.name),
          button = crel('button', 'Select')
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
      console.log("maybe")
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

      crel(songList, { style: "display: block" },
        crel("h3", "Queue")
      );

      console.log("heyho")
      // var songList = document.getElementById("songList")
      // songList.style.display = 'block'
      //
      // // Refresh Search Results
      // while (songList.firstChild) {
      //   songList.removeChild(songList.firstChild);
      // }
      //
      // // Set Title
      // var title = document.createElement('h3')
      // title.innerHTML = "Queue"
      // songList.appendChild(title)
      //
      // // Render Queue
      // for(var i = 0; i < songs.length; i++) {
      //   var song = document.createElement("p")
      //   var songButton = document.createElement("button")
      //
      //   song.innerHTML = songs[i].name + '<br/>' + songs[i].artists + '<br/>' + songs[i].album
      //   songButton.innerHTML = "Play"
      //   songButton.setAttribute('id', songs[i].uri)
      //
      //   songButton.addEventListener('click', function(event) {
      //     playSong(event.srcElement.id)
      //   })
      //
      //   songList.appendChild(song)
      //   songList.appendChild(songButton)
      // }
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
