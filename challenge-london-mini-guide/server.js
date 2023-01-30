const { response } = require("express");
const express= require("express");
const { request } = require("http");
const app=express();
const cors= require("cors")

app.use(cors())
app.use(express.json())

const Harrow=require("./data/Harrow.json")
const Heathrow=require("./data/Heathrow.json")
const Stratforf=require("./data/Stratford.json")



//Level 100
app.get("/allPharmecies",(request,response)=>{
    const listOfPharmeciesForStratford =Stratforf.pharmacies;
    const listOfPharmeciesForHeathrow=Heathrow.pharmacies;
    const listOfPharmeciesForHarrow=Harrow.pharmacies;
    const result={listOfPharmeciesForHarrow ,listOfPharmeciesForHeathrow,listOfPharmeciesForStratford}
    response.json({ result } );
})
//Level 200
app.get("/pharmacies", (request, response) => {
    response.json(Stratforf.pharmacies);
});
app.get("/colleges", (request, response) => {
    response.json(Stratforf.colleges);
});
app.get("/doctors", (request, response) => {
    response.json(Stratforf.doctors)
});
app.get("/hospitals", (request, response) => {
    response.json(Stratforf.hospitals)
});

// Level 300
app.get("/:city/pharmacies", (request, response) => {
    const cities = eval("(" + request.params.city + ")");
    response.json( cities.pharmacies);
});
app.get("/:city/colleges", (request, response) => {
    const cities = eval("(" + request.params.city + ")");
    response.json(cities.colleges);
});
app.get("/:city/doctors", (request, response) => {
      const cities = eval("(" + request.params.city + ")");
      response.json(cities.doctors);
});
app.get("/:city/hospitals", (request, response) => {
    const cities = eval("(" + request.params.city + ")");
    response.json(cities.hospitals);
});

//level 500
app.get("/app/:city/:category",(request,response)=>{
const cities = eval("(" + request.params.city + ")");
const category = request.params.category;
response.json(cities[category])

})




const port= process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server is ready on ${port}`);
})