var express = require('express'); // For making HTTP requests Eg: GET, PUT etc.
var Twitter = require('twitter'); // Connecting with Twitter Streamin API
var path = require("path"); // Path name of the files

// Creating Server and HTTP get Request
var app = express();
var server = express.Router();
server.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/home.html')); //redirecting to home.html page
});
app.use('/', server);
var http = require('http').Server(app);
var server = http.listen(process.env.PORT || 5000, function(){      //listening at port 5000
  console.log(' app listening at http://%s:%s', server.address().address, server.address().port);
});

// websocket connection
var io = require('socket.io').listen(server);
io.on('connection', function(socket){
  console.log('1 user connected');
  socket.on('disconnect', function(){
    console.log('1 user disconnected');
  });
});

// create twitter client for streaming tweets
var tweetClient = new Twitter({
  consumer_key: '####################',
  consumer_secret: '######################################',
  access_token_key: '##############################################',
  access_token_secret: '#########################################################'
});


//Extracting information from the tweet
var processTweet = function(rawTweet) {
    if(rawTweet.user != null && rawTweet.user.name != null // taking those tweets which have user as well as text field
        && rawTweet.text!= null) {
            var tweet = "<div>";
            tweet += "Username: "+"<br>" + rawTweet.user.name + "<br>";
            tweet += "Tweettext: "+"<br>" + rawTweet.text + "<br>"+"<br>" ;
            tweet += "</div>"
            console.log(tweet); // outputs tweet data onto stdout
            io.emit('tweet', tweet); // emits tweet to all the websockets
        }
};

//taking tweets from entire world and passing it to processTweet to use websocket and emit to the browser
tweetClient.stream('statuses/filter', {'locations':'-180,-90,180,90'},function(stream){
    stream.on('data', function(data) {
        processTweet(data);
    });
});

