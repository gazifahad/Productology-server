const express=require('express');
const cors= require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

 const app=express();
 const port=process.env.PORT || 5000;

 app.use(cors());
 app.use(express.json());
 
 
// console.log(process.env.DB_USER);

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dbg5s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
   
    try {
        await client.connect();
        const productCollection=client.db("products").collection('product');
        productCollection.insertOne({name:"janina",price:"manina"})
        app.get('/',(req,res)=>{
            res.send('connected to warehouse')
        }) 

}
finally{

}
}
app.listen(port,()=>{
    console.log('connected to',port)
})
run().catch(console.dir);;
