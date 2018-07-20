'use strict';

const express = require('express');
var fetch = require("node-fetch");
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
const MongoDb = require('./dbConfig');


app.use(MongoDb);

app.get('/', (req, res) =>{
  req.db.collection('EmployeeCollection').find().toArray(function(err,results){
      if(err) return console.log(err);
      console.log(results)
      res.send(results)
  });
});


app.post('/', (req, res) => {
  if(req.query.Name != undefined && req.query.Name != "" && req.query.Designation != undefined && req.query.Designation != ""){
      var data={
          Name:req.query.Name,
          Designation:req.query.Designation
      }
      console.log(data)
      
      req.db.collection('EmployeeCollection').save(data,(err,result)=>{
          if (err) return console.log(err)
          console.log('saved to database')
          res.send('saved to database')
          
      })
  }else{
      res.send('Something bad happened')
  }
  
 
})




app.get('/api/epic', (req, res) => {


  var data =getData(function(records){
    res.send(records)
  });

});

var getData=(callback) =>{
  var records;
  fetch("http://192.168.10.18:1337/api/products", { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
    .then(res => res.json())
    .then(json => callback(json))
    .catch((error)=>callback(json));
}


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);