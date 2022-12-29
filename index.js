const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.port || 5000
const app = express();





// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASS}@cluster0.6vknfdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// console.log(uri);



// load all appointments data
const DBConnect = async () => {
    try {
        client.connect();
        console.log("success connection");
    } catch (error) {
        console.log(error.message);
    }
}

DBConnect();
const tasksCollection = client.db('TaskManager').collection('tasks');


//------------------ alll get----------
app.get('/my-tasks', async (req, res) => {
    try {
        const result = await tasksCollection.find({}).toArray();
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
})

//------------------ alll get----------





//------------------ alll post----------
app.post('/add', async (req, res) => {
    try {
        const taskInfo = req.body;
        console.log(taskInfo);

        const result = await tasksCollection.insertOne(taskInfo);
        console.log(result);
        res.send(result);
    } catch (error) {
        console.log(error.message);
    }
})

//------------------ alll post----------





// test server
app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "Task manager app server is running.."
    })
})



app.listen(port, () => {
    console.log("server is running in ", port || 5000);
})