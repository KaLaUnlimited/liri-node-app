 var dotenv = require("dotenv").config();
 var keys = require("./keys.js");
 var choice = process.argv[2];
 var query = process.argv[3];

 var Twitter = require('twitter');
 var Spotify = require('node-spotify-api');
 var request = require("request");
 var fs = require("fs");







 // var twitterConsumerKey = keys.twitter.consumer_key;
 // var twitterConsumerSecret = keys.twitter.consumer_secret;
 // var twitterAccessKey = keys.twitter.access_token_key;
 // var twitterAccessSecret = keys.twitter.access_token_secret;

 switch (choice) {

     case "my-tweets":
         //tweet function here
         retrieveTweets();
         break;

     case "spotify-this-song":
         //tweet function here
         retrieveSpotify(query);
         break;

     case "movie-this":
         //tweet function here
         retrieveMovie(query);
         break;

     case "do-what-it-says":
         //tweet function here
         liriSays();
         break;
 }


 function retrieveTweets() {

     var client = new Twitter(keys.twitter);



     var params = { screen_name: 'KaLa_Kode' };
     client.get('statuses/user_timeline', params, function(error, tweets, response) {
         if (!error) {
             console.log("");
             console.log("The " + tweets.length + " most recent tweets: ")
             for (var i = 0; i < tweets.length; i++) {



                 console.log((i + 1) + "......" + tweets[i].text);
             }
         }
     });
 }

 function retrieveSpotify(a){

 // var spotify = new Spotify({
 //   id: <your spotify client id>,
 //   secret: <your spotify client secret>
 // });

  var spotify = new Spotify(keys.spotify);
 spotify.search({ type: 'track', query: a }, function(err, data) {
   if (err) {
     return console.log('Error occurred: ' + err);
   }
  // for (var i = 0; i < data.length; i++) {

  		console.log("");
  		console.log("");
  		console.log("******Result*******");

		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Song: " + data.tracks.items[0].name);
		if(data.tracks.items[0].preview_url=="null"){
			console.log("Preview: not available ");
		}
		console.log("Preview: " + data.tracks.items[0].preview_url);
		console.log( "Album: " + data.tracks.items[0].album.name);
                 
   //         }
  
 });


 }

 // function retrieveMovie(a ){


 // // Then run a request to the OMDB API with the movie specified
 // request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy", function(error, response, body) {

 //   // If the request is successful (i.e. if the response status code is 200)
 //   if (!error && response.statusCode === 200) {

 //     // Parse the body of the site and recover just the imdbRating
 //     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
 //     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
 //   }
 // });
 // }


 //  function liriSays(){
 //  	console.log("This function works now read from random.txt");




 // // This block of code will read from the "movies.txt" file.
 // // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
 // // The code will store the contents of the reading inside the variable "data"
 // fs.readFile("random.txt", "utf8", function(error, data) {

 //   // If the code experiences any errors it will log the error to the console.
 //   if (error) {


 //     fs.writeFile("log.txt", error, function(err){
 //         console.log(" rejoices")


 //     })
 //      return console.log(error);
 //   }

 //   // We will then print the contents of data
 //   console.log("Spotify sequence for: " + data + " will begin...");


 //     fs.writeFile("random.txt", error, function(err){
 //         console.log(" rejoices")


 //     })

 //   // // Then split it by commas (to make it more readable)
 //   // var dataArr = data.split(",");

 //   // // We will then re-display the content as an array for later use.
 //   // console.log(dataArr);

 // });

 //  }