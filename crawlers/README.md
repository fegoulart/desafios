# Reddit Crawler

This app is a web crawler that get data from https://old.reddit.com.
It is also a Telegram Bot (@GoulartBot). 

 
## Definitions

  

### important definitions adopted

#### post relevance
Only posts with at least 5,000 likes are considered 

#### post date
Only posts written on or after the last 24 hours be considered 

#### telegram chatbot
Telegram chatbot user: @GoularBot 

## Architecture

  

### container

I used a default Node docker container to avoid environment issues.

### relevant modules used

#### production
  "messaging-api-telegram": "^0.7.11",  
  "cheerio": "^1.0.0-rc.3",
  "phantom": "6.2.0"  
  
#### testing
  "chai": "~4.2.0",  
  "mocha": "~6.1.4",  
 
 
## Tests

 
I've used chai, mocha and supertest modules.


### Running tests

  

```

npm run test

```
or


```

npm run coverage

```
  

## Building the server

  
### Docker
```

docker build -t crawler .
docker create --name crawler crawler
docker start crawler

```

### Local

Inside app folder:
```

npm install
npm run start

```

## Interacting with telegram chatbot

### Command
Send subreddits separated by ; after /nadaprafazer command
```

/nadaprafazer cats;aww;AskReddit

```

