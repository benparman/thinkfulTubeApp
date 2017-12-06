'use strict'

$(document).ready(function() {
  getSearchTerms();
})


const STORE = {
  vidThumbs: [],
  videoURLS: []
}


const endpoint = "https://www.googleapis.com/youtube/v3/search?";
const apiKey = "AIzaSyCXea0ie5sLMSUTuJOdNrkXuk-UX61BSmw";

//API Query Function
function queryAPI(query) {
  let params = {
    part: 'snippet',
    key: apiKey,
    q: query,
    maxResults: 5
  }
  console.log($.getJSON(endpoint,params));
  $.getJSON(endpoint, params, function(data) {
              console.log(data.items[4].snippet.thumbnails.default.url) //example of video thumbnail from data array
              console.log(data.items);
    for (let i=0; i<data.items.length; i++) {
      STORE.videoURLS.push(`https://www.youtube.com/watch?v=${data.items[i].id.videoId}`);
      STORE.vidThumbs.push(data.items[i].snippet.thumbnails.default);
    }
    console.log(STORE);
  }); //how do I write this callback function?
}

//HTML Generators

function listThumbnails() {
  let thumbList = [];
  for (let i=0; i<=STORE.vidThumbs.length; i++) {
    //thumbList.push(`<li> <a href=${STORE.vidThumbs[i].url}`)
    // console.log(STORE.vidThumbs[i].url); // WHY IS THIS UNDEFINED?
  }
  console.log(thumbList);
}


//Event Listeners / Handlers
function getSearchTerms() {
  $('#js-vidSearch').submit(function(event) {
    event.preventDefault();
    let searchTerms = $('#searchTerm').val();
    console.log('Search Term:' + searchTerms);
    queryAPI(searchTerms);
    listThumbnails();
    //console.log(searchTerms);
  })
}

console.log(STORE.vidThumbs)

//what is the format for a youTube query string?
