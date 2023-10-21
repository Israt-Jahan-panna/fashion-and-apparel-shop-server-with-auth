const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors());
app.use(express.json());

app.get(('/') , (req , res)=>{
    console.log('My Fashion and Apparel Shop server is running')
})

app.listen(port, ()=>{
    console.log(`My Fashion and Apparel Shop server is running on port:${port}`)
})