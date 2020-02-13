var searchButton = document.getElementById('searchButton')

searchButton.addEventListener('click', function() {
  var searchBarSong = document.getElementById("searchBarSong")
  var searchBarAlbum = document.getElementById("searchBarAlbum")
  var searchBarArtist = document.getElementById("searchBarArtist")

  var searchQuery = {
    song: searchBarSong.value,
    album: searchBarAlbum.value,
    artist: searchBarArtist.value
  }

  console.log(searchQuery)

  var url = 'http://localhost:8080/search'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderSongs(xhr.responseText)
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(searchQuery))
})

function renderSongs(songsResponse) {
  var songs = JSON.parse(songsResponse)

  var songList = document.getElementById("songList")
  songList.style.display = 'block'

  // Refresh Search Results
  while (songList.firstChild) {
    songList.removeChild(songList.firstChild);
  }

  // Set Title
  var title = document.createElement('h3')
  title.innerHTML = "Songs:"
  songList.appendChild(title)

  // Render Songs
  for(var i = 0; i < songs.length; i++) {
    var song = document.createElement("p")
    var songButton = document.createElement("button")

    song.innerHTML = songs[i].name + '<br/>' + songs[i].album + '<br/>' + songs[i].artists
    songButton.innerHTML = "Add"
    songButton.setAttribute('id', JSON.stringify(songs[i]))

    songButton.addEventListener('click', function(event) {
      addSong(event.srcElement.id)
    })

    songList.appendChild(song)
    songList.appendChild(songButton)
  }
}

function addSong(song) {
  var url = 'http://localhost:8080/add'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText)
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(song)
}
