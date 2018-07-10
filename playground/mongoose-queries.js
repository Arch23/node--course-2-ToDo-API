const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {ToDo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b441ebda7ced23ed4042af3';
var id = '5b31a0ffc1fcfa60bdca5331';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// ToDo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// ToDo.findOne({
//     _id: id
// }).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo',todo);
// });

// ToDo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo by Id',todo);
// }).catch((e)=>{
//     console.log(e);
// });

User.findById(id).then((user)=>{
    if(!user){
        return console.log('User not found');
    }    
    console.log('User found: ',user);
}).catch((e)=>{
    console.log(e);
})