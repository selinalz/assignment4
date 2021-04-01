
console.log("Hello, Airtable");

// load the airtable library, call it "Airtable"
var Airtable = require("airtable");
console.log(Airtable);

//use airtable library, connect to our base using API key
var base = new Airtable({apiKey: 'keyj2kPXpFWW8uq2L'}).base('applzsGCh7WXoSwPw');

//get our collection base, select all records
//specify functions that will receive the data
base("music").select({}).eachPage(gotPageOfSongs, gotAllSongs);

// an empty array to hold our song data
var songs = [];

// callback function that receives our data
function gotPageOfSongs(records, fetchNextPage) {
  console.log("gotPageOfSongs()");
  // add the records from this page to our books array
  songs.push(...records);
  // request more pages
  fetchNextPage();
}

// call back function that is called when all pages are loaded
function gotAllSongs(err) {
  console.log("gotAllSongs()");

// report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

// call functions to log and show the songs
  consoleLogSongs();
  showSongs();
}

// just loop through the songs and console.log them
function consoleLogSongs() {
  console.log("consoleLogSongs()");
  songs.forEach((song) => {
    console.log("Song:", song);
  });
}

// loop through our airtable data, create elements
function showSongs() {
  console.log("showSongs()");
  songs.forEach((song) => {

    //creating a new div container
    //this is where our song info will go
    var songContainer = document.createElement("div");
    songContainer.classList.add("song-container");
    document.querySelector(".container").append(songContainer);

    //add song titles to song container
    var songTitle = document.createElement("p");
    songTitle.classList.add("song-title");
    songTitle.innerText = song.fields.album_title;
    songContainer.append(songTitle);

    //add song artists to song container
    var songArtist = document.createElement("p");
    songArtist.classList.add("song-artist");
    songArtist.innerText = song.fields.artist;
    songContainer.append(songArtist);

    //add song images to song container
    var songImage = document.createElement("img");
    songImage.classList.add("song-image");
    songImage.src = song.fields.album_artwork[0].url;
    songContainer.append(songImage);

    //add eventlistener, when users click on sound container, image will appear or disappear
    songContainer.addEventListener("click", function(){
      songImage.classList.toggle("active");
    })
  });
}
