# Break Text and Justify

This app receives a text file and a maximum line length and writes an output file with justified text.. 

 
## Definitions

  

### important definitions adopted

#### default input directory
./input

#### default output directory
./output 

## Architecture

  

### container

I used a default Node docker container to avoid environment issues.

### relevant modules used
   
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

docker build -t strings .
docker create --name strings strings
docker start strings

```

### Local

Inside app folder:
```

npm install
npm run start

```


## Using app

### Command line interface
```

Inform input file path please : ../input/input_parte1.txt

```