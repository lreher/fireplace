getQueue();

var searchSongs = document.getElementById('searchSongs')

searchSongs.addEventListener('submit', function(event) {
  event.preventDefault()

  var searchQuery = {
    song: document.getElementById("searchBarSong").value,
    album: document.getElementById("searchBarAlbum").value,
    artist: document.getElementById("searchBarArtist").value
  }

  var url = 'http://localhost:8080/search'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderSearch(xhr.responseText)
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(searchQuery))
})

function renderSearch(songsResponse) {
  var songs = JSON.parse(songsResponse)

  var songList = document.getElementById("songList");
  songList.innerHTML = "";

  function renderSong(song) {
    var button;
    var songElement = crel('div', { class: 'song' },
      crel('p', song.name),
      crel('p', song.album),
      crel('p', song.artists),
      button = crel('button', { class: "addSongButton" }, 'Add to Queue')
    );
    button.addEventListener('click', () => addSong(song))

    return songElement;
  }

  crel(songList,
    songs.map(renderSong)
  );
}

function renderQueue(queueResponse) {
  var songs = JSON.parse(queueResponse)

  var queueList = document.getElementById("queueList")
  queueList.innerHTML = "";

  function renderSong(song) {
    var songElement = crel('div', { class: 'song' },
      crel('p', song.name),
      crel('p', song.album),
      crel('p', song.artists),
    );

    return songElement;
  }

  crel(queueList,
    songs.map(renderSong)
  );

}

function addSong(song) {
  var url = 'http://localhost:8080/add'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderQueue(xhr.responseText)
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send(JSON.stringify(song))
}

function getQueue() {
  var url = 'http://localhost:8080/queue'
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderQueue(xhr.responseText)
    }
  }

  xhr.open("POST", url, true)
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.send()
}
