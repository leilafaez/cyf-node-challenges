const { response } = require("express");
const express= require("express");
const { request } = require("http");
const app=express();

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
    const pharmecies=Stratforf.pharmacies;
    response.json({ pharmecies });
});
app.get("/colleges", (request, response) => {
    const colleges=Stratforf.colleges;
    response.json({colleges});
});
app.get("/doctors", (request, response) => {
    const doctors=Stratforf.doctors;
    response.json({doctors})
});
app.get("/hospitals", (request, response) => {
    const hospitals= Stratforf.hospitals;
    response.json({hospitals})
});

// Level 300
app.get("/:city/pharmacies", (request, response) => {
    const cities = eval("(" + request.params.city + ")");
    const pharmecyByCity = cities.pharmacies;
    response.json( {pharmecyByCity});
});
app.get("/:city/colleges", (request, response) => {
    const cities = eval("(" + request.params.city + ")");
    const collegesByCity = cities.colleges;
    response.json({ collegesByCity });
});
app.get("/:city/doctors", (request, response) => {
      const cities = eval("(" + request.params.city + ")");
      const doctorsByCity = cities.doctors;
      response.json({ doctorsByCity });
});
app.get("/:city/hospitals", (request, response) => {
    const cities = eval("(" + request.params.city + ")");
    const hospitalsByCity = cities.hospitals;
    response.json({ hospitalsByCity });
});

//level 500
app.get("/app/:city/:category",(request,response)=>{
const cities = eval("(" + request.params.city + ")");
const category = request.params.category;
const categoryData = cities[category]
response.json({categoryData})
})




const port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server is ready on ${port}`);
})