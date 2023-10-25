const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
app.use(cors());
app.use(express.json());







// mongodb connection 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j0yhois.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const myCardCollections =client.db('myproductDB').collection('myproduct')
    app.get('/myproduct', async (req , res)=>{
      const cursor = myCardCollections.find();
      const result = await cursor.toArray();
      res.send(result)
    })


    app.post('/myproduct', async (req , res) =>{
      const myCard = req.body;
      console.log(myCard)
      const result = await myCardCollections.insertOne(myCard)
      res.send(result);
    })

    // update 
    app.get('/product/:id' , async(req , res ) => {
      const id =req.params.id ;
    const query = {_id : new ObjectId (id)}
    const result = await productCollection.findOne(query)
    res.send(result)
    })

    app.put('/product/:id',async(req , res ) =>{
      const id = req.params.id;
      const filter = {_id : new ObjectId (id)}
      const updateProduct = req.body;
      const product = {
        $set:{
          name: updateProduct.name,
          brand: updateProduct.brand,
          description: updateProduct.description,
          type: updateProduct.type,
          price: updateProduct.price,
          image: updateProduct.image,
          rating: updateProduct.rating,
        }
      }
      const result = await productCollection.updateOne(filter,product);
      res.send(result);
    })


     // delete 

  app.delete('/myproduct/:id' , async(req , res ) =>{
    const id =req.params.id ;
    const query = {_id : new ObjectId (id)}
    const result = await myCardCollections.deleteOne(query);
    res.send(result);
  })




    const productCollection = client.db("insertDB").collection("product");

    app.get('/products' , async(req , res ) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    app.post('/products', async (req , res) =>{
        const newProduct = req.body ;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result)
    })

   app.get('/brand/:name', async(req , res)=>{
   const name =req.params.name;
   const query = { brand: name };
   const cursor =  productCollection.find(query);
    const result = await cursor.toArray();
   res.send(result); 
   })
  
  

  app.get('/brand/:name/:_id', async (req, res) => {
    const _id =req.params._id;
   const query = { _id: new ObjectId (_id) };
   const cursor =  productCollection.find(query);
    const result = await cursor.toArray();
   res.send(result); 
  });
  
 

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

    // this is commenting of beacuse of it will running everytime continusly . await client.close();
    // await client.close();
  }
}
run().catch(console.dir);


app.get(('/') , (req , res)=>{
    res.send('My Fashion and Apparel Shop server is running')
})

app.listen(port, ()=>{
    console.log(`My Fashion and Apparel Shop server is running on port:${port}`)
})