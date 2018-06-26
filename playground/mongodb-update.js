//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //get database reference
    const db = client.db('ToDoApp');

    // db.collection('ToDos').findOneAndUpdate({
    //     _id: new ObjectID('5b31378bf72aa4522e2877e1')
    // },{
    //     $set:{
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'Homer'
    },{
        $inc:{
            age: +1
        },
        $set:{
            name: "Marge"
        }
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result)
    });

    //close client not db
    client.close();
});