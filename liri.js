 var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var choice=process.argv[2];

 var Twitter = require('twitter');
 var Spotify = require('node-spotify-api');
 var request = require("request");
  


  

  

var twitterConsumerKey = keys.twitter.consumer_key;
var twitterConsumerSecret = keys.twitter.consumer_secret;
var twitterAccessKey = keys.twitter.access_token_key;
var twitterAccessSecret = keys.twitter.access_token_secret;

switch(choice){

	case "my-tweets":
	//tweet function here
	retrieveTweets();
	break;

	case "spotify-this-song":
	//tweet function here
	retrieveSpotify();
	break;

	case "movie-this":
	//tweet function here
	retrieveMovie();
	break;

	case "do-what-it-says":
	//tweet function here
	liriSays();
	break;
}


function retrieveTweets(){
// var client = new Twitter({
//     // testing : '123'
//   consumer_key: twitterConsumerKey,
//   consumer_secret: twitterConsumerSecret,
//   access_token_key:twitterAccessKey,
//   access_token_secret: twitterAccessSecret
// });
  var client = new Twitter(keys.twitter);
//console.log("client " + client.testing)
 

var params = {screen_name: 'KaLa_Kode'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});
}

function retrieveSpotify(){

// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
 var spotify = new Spotify(keys.spotify);
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items); 
});


}

function retrieveMovie(){


// Then run a request to the OMDB API with the movie specified
request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
  }
});
}
 

 function liriSays(){
 	console.log("This function works now read from random.txt");
 }


