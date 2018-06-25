//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //get database reference
    const db = client.db('ToDoApp');

    // db.collection('ToDos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err, result) => {
    //     if(err){
    //         return console.log('Unable to insert todo',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,3));
    // });

    //insert new doc into Users collection (name, age, location)
    // db.collection('Users').insertOne({
    //     name: 'Vinicius',
    //     age: 24,
    //     location: 'Cornélio Procópio'
    // },(err,response) => {
    //     if(err){
    //         return console.log('Unable to insert User',err);
    //     }
    //     console.log(response.ops[0]._id.getTimestamp());
    // });

    //close client not db
    client.close();
});