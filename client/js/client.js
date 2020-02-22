setInterval(getQueue, 5000);

canAddSong = true;

var searchSongs = document.getElementById('searchSongs')

searchSongs.addEventListener('submit', function(event) {
  event.preventDefault()

  var searchQuery = {
    song: document.getElementById("searchBarSong").value,
    album: document.getElementById("searchBarAlbum").value,
    artist: document.getElementById("searchBarArtist").value
  }

  var url = 'https://fireplace.onrender.com/search'
  var xhr = new XMLHttpRequest();

  searchSongs.classList.remove("success")
  searchSongs.classList.remove("fail")

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderSearch(xhr.responseText)

      void searchSongs.offsetWidth;
      searchSongs.classList.add("success")
    } else if (xhr.readyState === XMLHttpRequest.DONE) {
      void searchSongs.offsetWidth;
      searchSongs.classList.add("fail")
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
    button.addEventListener('click', () => {
      addSong(song, button)
    })

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

function addSong(song, button) {
  var url = 'https://fireplace.onrender.com/add'
  var xhr = new XMLHttpRequest();

  button.classList.remove("success")
  button.classList.remove("fail")

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      renderQueue(xhr.responseText)

      canAddSong = false;
      setTimeout(() => canAddSong = true, 2000)

      void button.offsetWidth;
      button.classList.add("success")
    }
  }

  if (canAddSong) {
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(song))
  } else {
    void button.offsetWidth;
    button.classList.add("fail")
  }
}

function getQueue() {
  var url = 'https://fireplace.onrender.com/queue'
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
