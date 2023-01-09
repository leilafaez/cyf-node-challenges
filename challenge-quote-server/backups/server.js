// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
const lodash = require("lodash");
var cors = require("cors");
//load the quotes JSON
const Quotes = require("./quotes.json");
app.use(cors());
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function(request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes",(request,response)=>{
  response.json(Quotes)
});
app.get("/quotes/random",(request,response)=>{
  response.json(pickFromArray(Quotes))
});
app.get("/quotes/search",(request,response)=>{
  
  if(request.query.term){
    let result = Quotes.filter((item) => {
      return (
        item.quote.toLowerCase().includes(request.query.term.toLowerCase()) ||
        item.author.toLowerCase().includes(request.query.term.toLowerCase())
      );
    });
    response.send(result);
  }
  
})
app.get("/echo",(request,response)=>{
  let word=request.query.word;
  response.send(`you said ${word}`)
})
app.get("/quotes/random_quote",(request,response)=>{
  const randQuote=lodash.sample(Quotes);
  response.send(randQuote)
})
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
