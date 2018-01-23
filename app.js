'use strict';

//Initializes app once document is loaded
$(document).ready(function() {
  getSearchTerms();
});

//The above document function is depricated - use this shorthand format instead
// $(function() {
//   getSearchTerms();
// });

//Store's information about current application state
const STORE = {
  vidThumbs: [],
  videoURLS: [],
  videoTitles: []
};

//Variables to store YouTube API enpdoint and API Key
// const endpoint = "https://www.googleapis.com/youtube/v3/search?";  ****Moved these variables to queryAPI function
// const apiKey = "AIzaSyCXea0ie5sLMSUTuJOdNrkXuk-UX61BSmw";

//Event Listeners / Handlers
function getSearchTerms() {
  //Calls 'queryAPI' function to query YouTube API with user's search term and default app parameters (ie maxResults);
  $('#js-vidSearch').submit(function(event) {
    resetStore();
    // STORE.vidThumbs = [];  ***moved these to seperate function
    // STORE.videoURLS = [];  ***see 'resetStore' function
    event.preventDefault();
    let searchTerms = $('#searchTerm').val();
    console.log(`Search Term: ${searchTerms}`);
    //Calls 'queryAPI' function, passing in the value of 'searchTerm' as the functions 'query' argument
    //If statement ensures user has entered text.  Renders video thumbnails if so, otherwise renders a message to enter text
    if (($('#searchTerm').val() !== '')) {
      queryAPI(searchTerms);
      renderResultCountMessage();
    } else {
      renderTextMessage();
    }
  });
}

//Function to reset status of STORE
function resetStore() {
  STORE.vidThumbs = [];
  STORE.videoURLS = [];
  STORE.videoTitles = [];
}

//API Query Function
function queryAPI(query) {  //'query' = 'searchTerms' (defined in 'getSearchTerms') which = user's search terms
  const endpoint = 'https://www.googleapis.com/youtube/v3/search?';
  const apiKey = 'AIzaSyCXea0ie5sLMSUTuJOdNrkXuk-UX61BSmw';
  let params = {
    part: 'snippet',
    key: apiKey,
    q: query,
    maxResults: 5
  };
  $.getJSON(endpoint, params, function(JSONdata) {  //This callback function argument works, but do not fully understand how it works
    console.log(JSONdata);
    sortResults(JSONdata);
  });
}

//Results Sorting Function - Sorts API Results and applies them to store, calls HTML Generator Function (below)
function sortResults(results) {  //results argument called with JSONdata in queryAPI function above
  for (let i=0; i<results.items.length; i++) {
    STORE.vidThumbs.push(results.items[i].snippet.thumbnails.default.url);
    STORE.videoURLS.push('https://www.youtube.com/watch?v='+results.items[i].id.videoId);
    STORE.videoTitles.push(results.items[i].snippet.title);
  }
  renderThumbnails();
}

//HTML Generators

//Thumbnail Generator - Loop creates a <li> for each thumbnail images and returns them inside a <ul>
function generateThumbnails() {
  let thumbsList = [];
  for (let i=0; i<STORE.vidThumbs.length; i++) {
    console.log(i);
    thumbsList.push(`<li><a href="${STORE.videoURLS[i]}"><img src="${STORE.vidThumbs[i]}" alt="video thumbnail">
      <span class = "captions">${STORE.videoTitles[i].slice(0,15)}...</span></li>`);
  }
  // console.log(`<ul>${thumbsList.toString().replace(/,/g/'')}</ul>`);
  return `<ul class ="thumbnails">${thumbsList.toString().replace(/,/g, '')}</ul>`;
}

function generateErrorMessagee() {
  let errorText = '<h3>You did not enter anything to search for!</h3>';
  return `${errorText}`;
}

function generateResultCountMessage() {
  let vidCountText = `<h3>Displaying ${STORE.vidThumbs.length} results</h3>`;
  return vidCountText;
}

//HTML Renderers
function renderThumbnails() {
  let thumbView = generateThumbnails();
  let text = generateResultCountMessage();
  $('.js-message').html(text);
  $('.js-results').html(thumbView);
}

function renderTextMessage() {
  let text = generateErrorMessagee();
  $('.js-results').html(text);
}


//what is the format for a youTube query string?


