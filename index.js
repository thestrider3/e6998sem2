var express = require('express'); // For making HTTP requests Eg: GET, PUT etc.
var Twitter = require('twitter'); // Connecting with Twitter Streamin API
var path = require("path"); // Path name of the files

// Creating Server and HTTP get Request
var app = express();
var server = express.Router();
server.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/home.html'));
});
app.use('/', server);
var http = require('http').Server(app);
var server = http.listen(process.env.PORT || 5000, function(){
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});

// create web socket when a user connects to the server
var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('1 user connected');
  socket.on('disconnect', function(){
    console.log('1 user disconnected');
  });
});

// create twitter client for streaming tweets
var tweetClient = new Twitter({
  consumer_key: '7d1U5FV64wSvSp09oSvV4xHRH',
  consumer_secret: 'SPg9cUgG70c5VtDHTOhZ0dMxFALg5l7oP1R9CIIRRuGSrOjUCy',
  access_token_key: '137228501-kSbbq3aiN1IbA8raQXhMOeA7hI1xkKe8fjSgvNnj',
  access_token_secret: '68DTqobUOtgpRFzpzxiy3HhUG7aEpPgjMX2CPHqExhQF5'
});


// process a tweet raw data and extract relevant information
var processTweet = function(rawTweet) {
    if(rawTweet.user != null && rawTweet.user.name != null 
        && rawTweet.text!= null) {
            var tweet = "<div>";
            tweet += "Username: "+"<br>" + rawTweet.user.name + "<br>";
            tweet += "Tweettext: "+"<br>" + rawTweet.text + "<br>"+"<br>" ;
            tweet += "</div>"
            console.log(tweet); // outputs tweet data onto stdout
            io.emit('tweet', tweet); // emits tweet to all the websockets
        }
};

// stream tweets of the entire world, process them and 
// publich it to all the web sockets connected to the server.
tweetClient.stream('statuses/filter', {'locations':'-180,-90,180,90'},function(stream){
    stream.on('data', function(data) {
        processTweet(data);
    });
});

