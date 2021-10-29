const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app = express()
const port = process.env.PORT || 7000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2ztzd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


  
async function run(){
    try{
        await client.connect(); 
        const database = client.db('health_care');
        const serviceCollection = database.collection('services')

        // GET Services API
        
        app.get('/services', async(req, res) =>{
            const cursor = serviceCollection.find({})
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally{
        // await client.close()
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Running my Nandan Park Server !!')
})

app.listen(port, () => {
    console.log('Running Surver on port',  port)
})