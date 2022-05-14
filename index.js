const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const req = require('express/lib/request');
const res = require('express/lib/response');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json())
require('dotenv').config();




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kckwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const servicesCollection = client.db('doctors').collection('services');
        const bookingCollection = client.db('doctors').collection('bookings');


        app.get('/service', async(req,res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const result = await  cursor.toArray();
            res.send(result);
        });

        app.post('/booking', async(req,res)=>{
            const booking = req.body;
            const query = {treatment: booking.treatment, date: booking.date, patient: booking.patient};
            const exist = await bookingCollection.findOne(query);
            if(exist){
                return res.send({success: false, booking: exist})
            }
            const result = await bookingCollection.insertOne(booking);
            res.send({success: true, result});
        })

    }
    finally{
        // client.close();
    }
}
run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('Doctors portal server is running...')
});

app.listen(port, (req,res) => {
    console.log('Listening to port: ',port);
})