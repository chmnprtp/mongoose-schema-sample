const express = require('express')
const app = express();
const db = require('./db');
const Person = require('./models/person');
const bodyParser= require ('body-parser'); 
const MenuItem = require('./models/MenuItem')
app.use(bodyParser.json()); //body Parser parse any form of data and store in req.body



app.get('/',function(req,res){
    res.send("Welcome to my hotel...How i can help you?  have list of menus")
})

app.post('/person', async (req,res)=>{


    try {
         const data = req.body // assuming the request body contains the person data
    // create a person data document using the mongoose model
    const newPerson = new Person(data);
    // newPerson.name = data.name;
    // newPerson.age = data.age;
    // newPerson.mobile = data.mobile;
    // newPerson.email = data.email;
    // newPerson.address = data.address;

    // save newPerson to database
   const response = await newPerson.save();
   console.log("Data Saved")
   res.status(200).json(response);
        
    } catch (error) {
        console.log(err)
        res.status(500).json({error:"Internal Server Error"});
    }
})


app.get('/person', async(req,res)=>{
    try {
        const data = await Person.find()
        console.log("Data Fetched")
         res.status(200).json(data);
    } catch (error) {
        console.log(err)
        res.status(500).json({error:"Internal Server Error"});
    }
})

app.listen(3000, ()=>{
    console.log('listening on port 3000')
})









// brew services restart mongodb/brew/mongodb-community
// coonect to MongoDB compass