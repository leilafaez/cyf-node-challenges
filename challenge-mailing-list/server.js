const { response } = require("express");
const express = require("express");
const { request } = require("http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
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

app.delete("/lists/:name",(request,response)=>{
  const nameToDel = request.params.name;
  const myList = Array.from(lists, ([name, members]) => ({ name, members }));
  const result=myList.filter(item=>item.name !==nameToDel);
  if(result){
    response.status(200).json({result});
  }else{
    response.status(404).json();
  }
})
app.put("/lists/:name",(request,response)=>{
  const name= request.params.name;
  const newName=request.body.name;
  const myList = Array.from(lists, ([name, members]) => ({ name, members }));
  const userIndex=myList.findIndex(user=>user.name===name);
  if(userIndex===-1){
    response.status(404).json(`user with name ${name} not found`)
    return
  } 
  myList[userIndex].name=newName;
  response.status(200).json({myList})
})

const listener = app.listen(process.env.PORT||3001, function () {
  console.log("Your app is listening on port " + listener.address().port);
});