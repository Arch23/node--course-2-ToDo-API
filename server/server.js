require('./config/config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {ToDo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res)=>{
    var toDo = new ToDo({
        text: req.body.text,
        _creator: req.user._id
    });

    toDo.save().then((doc)=>{
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res)=>{
    ToDo.find({
        _creator: req.user._id
    }).then((todos)=>{
        res.send({
            todos
        });
    },(e)=>{
        res.status(400).send(e);
    });
});

//GET /todos/id
app.get('/todos/:id', authenticate, (req, res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    ToDo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({
            todo
        });
    },(e)=>{
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, (req, res)=>{
    const id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    ToDo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.send({
            todo
        });
    },(e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res)=>{
    const id = req.params.id;
    const body = _.pick(req.body,['text','completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    //$new: true - return the updated object, not the original
    ToDo.findOneAndUpdate({
        _id: id,
        _creator: req.user._id
    },{$set: body},{new: true}).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }

        res.send({
            todo
        });
    }).catch((e)=>res.status(400).send());
});

app.post('/users',(req,res)=>{
    const body = _.pick(req.body,['email','password']);
    var user = new User(body);

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

app.post('/users/login', (req,res)=>{
    const body = _.pick(req.body,['email','password']);
    
    User.findByCredentials(body.email,body.password).then((user)=>{
        return user.generateAuthToken().then((token)=>{
            res.header('x-auth',token).send(user);
        });
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.get('/users/me', authenticate, (req, res)=>{
    res.send(req.user);
});

app.delete('/users/me/token',authenticate,(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },(e)=>{
        res.status(400).send();
    });
});

app.listen(port, ()=>{
    console.log(`Started @ port ${port}`);
});

module.exports = {
    app
};