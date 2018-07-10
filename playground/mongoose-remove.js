const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// ToDo.remove({}).then((result)=>{
//     console.log(result);
// });

// ToDo.findOneAndRemove()

// ToDo.findByIdAndRemove()

// ToDo.findByIdAndRemove('5b442c7f3bc0634fac32b402').then((todo)=>{
//     console.log(todo);
// });