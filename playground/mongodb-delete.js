//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp',(err,client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    //get database reference
    const db = client.db('ToDoApp');

    //deleteMany
    // db.collection('ToDos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('ToDos').deleteOne({text: 'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('ToDos').findOneAndDelete({completed: false}).then((result)=>{
    //     console.log(result);
    // })

    // db.collection('Users').deleteMany({
    //     name: 'Carl'
    // }).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').deleteOne({
        _id: new ObjectID('5b310d28cc933d1359e7f643')
    }).then((result) => {
        console.log(result);
    });

    //close client not db
    // client.close();
});