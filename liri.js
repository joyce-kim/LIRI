var dotenv = require("dotenv").config();
var request = require("request");
var inquirer = require("inquirer");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var Keys = require("./keys.js");
var fs = require('fsxt')

var spotifyClient = new Spotify(Keys.spotify);
var twitterClient = new Twitter(Keys.twitter);

var params = { screen_name: "elonmusk" };

// show last 20 tweets
var myTweets = function() {
	twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < 20; i++) {
				console.log(tweets[i].created_at);
				console.log(tweets[i].text);
				console.log("");
			}
		} else { console.log(error); };
	});
};

// show song info
var spotifyThisSong = function(songTitle) {
	spotifyClient
		.search({ type: 'track', query: songTitle })
		.then(function(response) {
			var song = response.tracks.items[0];
			console.log("NAME: " + song.name);
			song.album.artists.forEach(function(item) { console.log("ARTIST: " + item.name )});
			console.log("ALBUM: " + song.album.name);
			console.log("URL: " + song.preview_url);
		})
		.catch(function(err) {
			console.log(err);
		});
};

// output movie info
var movieThis = function(movie) {
	var movieLink = movie.replace(" ", "+");

	request("http://www.omdbapi.com/?t=" + movieLink + "&y=&plot=full&tomatoes=true&apikey=trilogy", function (error, response, body) {
		if (error) {
			console.log(error);
		} else {
			var jsonBody = JSON.parse(body);

			console.log("TITLE: " + jsonBody.Title);
			console.log("YEAR: " + jsonBody.Year);
			console.log("IMDB RATING: " + jsonBody.imdbRating);
			console.log("TOMATOMETER: " + jsonBody.tomatoMeter);
			console.log("COUNTRIES: " + jsonBody.Country);
			console.log("LANGUAGE: " + jsonBody.Language);
			console.log("PLOT: " + jsonBody.Plot);
			console.log("ACTORS: " + jsonBody.Actors);
			
		};
	});
};

// will take the text inside of random.txt 
// and then use it to call one of LIRI's commands
var doWhatItSays = function() {
	fs.readFile("random.txt", function(err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
			var dataArray = data;
			
			if (dataArray[0] == "my-tweets") {
				myTweets();
			} else if (dataArray[0] == "spotify-this-song") {
				spotifyThisSong(dataArray[1]);
			} else if (dataArray[0] == "movie-this") {
				movieThis(dataArray[1]);
			} else if (dataArray[0] == "do-what-it-says") {
				doWhatItSays();
			} else {
				console.log("text file unreadable");
			};
		};
	});
};

inquirer
	.prompt({
		name: "liriCommands",
		type: "rawlist",
		message: "Please choose a command.",
		choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
	})
	.then(function(answer) {
		if (answer.liriCommands === "my-tweets") {
			myTweets();
			
		} else if (answer.liriCommands === "spotify-this-song") {
			inquirer.prompt({
				name: "songInput",
				type: "input",
				message: "What song would you like to Spotify?"})
				.then(function(answer) {
					spotifyThisSong(answer.songInput);
				})
				.catch(function(err) { console.log(err); });

		} else if (answer.liriCommands === "movie-this") {
			inquirer.prompt({
				name: "movieInput",
				type: "input",
				message: "What movie would you like to search?"})
				.then(function(answer) {
					movieThis(answer.movieInput);
				})
				.catch(function(err) { console.log(err); });

		} else if (answer.liriCommands === "do-what-it-says") {
			doWhatItSays();

		} else {
			console.log("Liri the Robot Did Not Understand Command.");
		}
	});