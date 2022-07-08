const express=require('express');
const cors= require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        
        app.get('/allProduct',async(req,res)=>{
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const query = {};

            const cursor = await productCollection.find(query).sort({ _id: -1 });
            let bills;
            if (page || size) {
                const rest = (page - 1);

                bills = await cursor.skip(rest * size).limit(size).toArray();
            }
            else {
                bills = await cursor.toArray();
            }


            res.send(bills);
        })
        app.get('/entityCount',async(req,res)=>{
            const query={};
            // const cursor= productCollection.find(query);
            const count=await productCollection.countDocuments();
            // console.log(products);
             res.send({count});

        })
        app.get('/my-products',async(req,res)=>{
            const email=req.query.email;
            console.log(email);
            const query={email:email}
            const products= productCollection.find(query)
            const result=await products.toArray();
            res.send(result);
            console.log(result);
        })
        app.post('/add-product',async(req,res)=>{
                const newProduct=(req.body)
               const result= await productCollection.insertOne(newProduct);
               console.log(newProduct);
                res.send({success:'added successfully'});

        })
        app.delete('/delete-product',async(req,res)=>{
            const id=req.query.id;
            const query={_id:ObjectId(id)}
            const result=await productCollection.deleteOne(query);
            res.send(result);
        })


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
run().catch(console.dir);
