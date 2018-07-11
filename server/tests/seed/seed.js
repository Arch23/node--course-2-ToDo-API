const {ObjectID} = require('mongodb');
const {ToDo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'userOne@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET)
    }]
},{
    _id: userTwoId,
    email: 'userTwo@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET)
    }]
}];

const todos = [{
    _id: new ObjectID(),
    text:'First test todo',
    _creator: userOneId
},{
    _id: new ObjectID(),
    text:'Second test todo',
    completed: true,
    completedAt: new Date().getTime(),
    _creator: userTwoId
}];

const populateTodos = (done)=>{
    ToDo.remove({}).then(()=>{
        return ToDo.insertMany(todos);
    }).then(()=>done());
};

const populateUsers = (done)=>{
    User.remove({}).then(()=>{
        var userOne = new User(users[0]).save();
        var userTwo = new User(users[1]).save();

        return Promise.all([userOne,userTwo]);
    }).then(()=>done());
};

module.exports = {
    todos,
    populateTodos,
    users,
    populateUsers
};