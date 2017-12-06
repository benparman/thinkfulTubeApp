'use strict'

//Initializes app once document is loaded
$(document).ready(function() {
  getSearchTerms();
})

//Store's information about current application state
let STORE = {
  vidThumbs: [],
  videoURLS: []
}

//Variables to store YouTube API enpdoint and API Key
const endpoint = "https://www.googleapis.com/youtube/v3/search?";
const apiKey = "AIzaSyCXea0ie5sLMSUTuJOdNrkXuk-UX61BSmw";

//Event Listeners / Handlers
function getSearchTerms() {
  //Calls 'queryAPI' function to query YouTube API with user's search term and default app parameters (ie maxResults);
  $('#js-vidSearch').submit(function(event) {
    event.preventDefault();
    let searchTerms = $('#searchTerm').val();
    console.log(`Search Term: ${searchTerms}`);
    //Calls 'queryAPI' function, passing in the value of 'searchTerm' as the functions 'query' argument
    queryAPI(searchTerms);
  })
}

//API Query Function
function queryAPI(query) {  //'query' = 'searchTerms' (defined in 'getSearchTerms') which = user's search terms
  let params = {
    part: 'snippet',
    key: apiKey,
    q: query,
    maxResults: 5
  }
  $.getJSON(endpoint, params, function(JSONdata) {  //This callback function argument works, but do not fully understand how it works
    console.log(JSONdata);
    sortResults(JSONdata);
  });
}

//Renderer Function - Sorts API Results and applies them to store, calls HTML Generator Function (below)
function sortResults(results) {  //results argument called with JSONdata in queryAPI function above
  for (let i=0; i<results.items.length; i++) {
    STORE.vidThumbs.push(results.items[i].snippet.thumbnails.default.url);
    STORE.videoURLS.push('https://www.youtube.com/watch?v='+results.items[i].id.videoId);
  }
  console.log(STORE.vidThumbs);
  console.log(STORE.videoURLS);
}






//what is the format for a youTube query string?
