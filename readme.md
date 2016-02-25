####This is the solution of Assignment 1 of Coms6998- Story Telling with Streaming Data

#####Part a:
I have used the Twitter Streaming API as my Data Stream.I chose the Twitter Streaming API because the API is a treasure trove of
information regarding public opinion on several day to day incidents occuring around the world.
Twitter API is also easy to implement and needs only access tokens and API keys to access the stream. 


The API offers samples of the public data flowing through Twitter. Once the applications establish a connection to a 
streaming endpoint, they are delivered a feed of Tweets, without needing to worry about polling or REST API rate limits.
Each tweet provided by the streaming API has information such as the Tweet_id, Twitter User Name, 
Twitter text, the GeoLocation coordinates from where the tweets where posted, Creation time,
Number of retweets and many such relevant information.
In very rare cases, the Streaming API may elect to deliver an incomplete Tweet field instead of waiting for data which is taking a long time to fetch.
In the case of a numeric count, this will manifest as a -1 value. 

More details: https://dev.twitter.com/overview/api/tweets


I am filtering the tweets such that only tweets with not null username, tweet and geographical coordinates are taken.
The rate at which I am getting tweets is almost 8 tweets per second.

#####Part b:
I am consuming all the tweets which have text and username and delivering it to socket.io websocket server 
to display the tweets obtained from Twitter Streaming API onto the web browser. 
I am using NodeJS for doing all the above work.


#####To run the application:
*Write your twitter access keys in index.js

*Do npm install to install all the dependencies mentioned in package.json

*Run node index.js

*Go to htth://localhost:5000 to see the webpage

