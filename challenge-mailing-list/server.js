const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
app.use(express.json());
let lists= new Map();

lists.set("staff", ["talea@techtonica.org", "michelle@techtonica.org"]);
lists.set("students", ["chris@techtonica.org", "hamid@techtonica.org"]);

// console.log(Array.from(lists, ([name, members]) => ({ name, members })));
app.get("/lists",(request,response)=>{
    const listArray=Array.from(lists.keys())
    if(listArray){
      response.status(200).json({ listArray });
    }else{
      response.status(200).json([])
    }
    
})

app.get("/lists/:name",(request,response)=>{
  const nameParam= request.params.name;
  const findName = Array.from(lists, ([name, members]) => ({ name, members }));
  const result=findName.filter(item=>item.name===nameParam)
    if(result){
    response.status(200).json({result})
  }else{
    response.status(404).json("not found")
  }
})

app.delete("lists/:name",(request,response)=>{
  
})

const listener = app.listen(process.env.PORT||3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});