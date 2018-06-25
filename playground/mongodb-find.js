//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //get database reference
    const db = client.db('ToDoApp');

    // db.collection('ToDos').find({
    //     _id: new ObjectID('5b311037f72aa4522e286f76')
    // }).toArray().then((docs) => {
    //     console.log('ToDos');
    //     console.log(JSON.stringify(docs,undefined,3));
    // }, (err) => {
    //     console.log('Unable to fetch ToDos',err);
    // });

    // db.collection('ToDos').find().count().then((count) => {
    //     console.log(`ToDos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch ToDos',err);
    // });

    db.collection('Users').find({
        name: 'Lisa'
    }).toArray().then((user)=>{
        console.log('User');
        console.log(JSON.stringify(user,undefined,3));

    },(err) =>{
        console.log('Unable to fetch Users',err);
    });

    //close client not db
    // client.close();
});