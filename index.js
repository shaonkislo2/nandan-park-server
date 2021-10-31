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
        const database = client.db('nandan_park');
        const rideCollection = database.collection('rides')

        // GET Rides API

        app.get('/rides', async(req, res) =>{
            const cursor = rideCollection.find({})
            const rides = await cursor.toArray();
            res.send(rides);
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