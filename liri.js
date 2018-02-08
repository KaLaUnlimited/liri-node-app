 var dotenv = require("dotenv").config();
 var keys = require("./keys.js");
 var choice = process.argv[2];
 var query = process.argv[3];

 var Twitter = require('twitter');
 var Spotify = require('node-spotify-api');
 var request = require("request");
 var fs = require("fs");







 function selection(choice) {

     switch (choice) {

         case "my-tweets":

             retrieveTweets();
             break;

         case "spotify-this-song":

             retrieveSpotify(query);
             break;

         case "movie-this":
             if (!query) {
                 query = "Mr.Nobody";
             }
             retrieveMovie(query);
             break;

         case "do-what-it-says":

             liriSays(query);
             break;
     }
 }

 function retrieveTweets() {

     var client = new Twitter(keys.twitter);



     var params = { screen_name: 'KaLa_Kode' };
     client.get('statuses/user_timeline', params, function(error, tweets, response) {
         if (!error) {
             console.log("");
             console.log("The " + tweets.length + " most recent tweets: ")
             var t= " ";
             for (var i = 0; i < tweets.length; i++) {



                 console.log((i + 1) + "......" + tweets[i].text);
                 t+="\n"+ (i + 1) + "......" + tweets[i].text;
                  
             }
             log(t);
         }



     });
 }

 function retrieveSpotify(a) {


     var spotify = new Spotify(keys.spotify);
     spotify.search({ type: 'track', query: a }, function(err, data) {
         if (err) {
             return console.log('Error occurred: ' + err);
         }



         console.log("");
         console.log("******Result*******");

         var data = "\nArtist: " + data.tracks.items[0].artists[0].name +
             "\nSong: " + data.tracks.items[0].name +
             previewURL() +

             "Album: " + data.tracks.items[0].album.name;

         console.log(data)
         log(data);

         function previewURL() {
             if (data.tracks.items[0].preview_url == "null") {
                 return "\nPreview: not available \n"
             } else {
                 return "\nPreview: " + data.tracks.items[0].preview_url+'\n'
             }
         }
     });




 }

 function retrieveMovie(a) {


     // Then run a request to the OMDB API with the movie specified
     request("http://www.omdbapi.com/?t=" + a + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

         // If the request is successful (i.e. if the response status code is 200)
         if (!error && response.statusCode === 200) {

             // Parse the body of the site and recover just the imdbRating
             // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
             //console.log("\nTitle: " + body);

             var data = "\nResult:\nTitle: " + JSON.parse(body).Title +
                 "\nYear: " + JSON.parse(body).Year +
                 "\nIMDB rating is: " + JSON.parse(body).imdbRating +
                 "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                 "\nCountry where the movie was produced: " + JSON.parse(body).Country +
                 "\nLanguage of the movie:" + JSON.parse(body).Language +
                 "\nPlot of the movie: " + JSON.parse(body).Plot +
                 "\nActors: " + JSON.parse(body).Actors;

             console.log(data);
             log(data);

         }
     });

 }




 function liriSays() {

     // This block of code will read from the "random.txt" file.
     // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
     // The code will store the contents of the reading inside the variable "data"
     fs.readFile("random.txt", "utf8", function(error, data) {

         // If the code experiences any errors it will log the error to the console.
         if (error) {


             fs.writeFile("log.txt", error, function(err) {

             })
             return console.log(error);
         }

         // We will then print the contents of data
         console.log("Spotify sequence for: '" + data + "' will begin...");
         query = data;

         selection("spotify-this-song");
         //log(data);

     });


 }


 function log(data) {

     var time = new Date();
     var formattedTime = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
     var d = new Date()
     var today = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

     fs.appendFile("log.txt", "\n\n*******Data logged: " + today + " " + formattedTime +  data, function(err) {

     })
 }


 selection(choice);