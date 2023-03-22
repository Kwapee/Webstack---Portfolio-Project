const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection:{
        host: '127.0.0.1',
        user: 'postgres',
        password: 'perry2002',
        database: 'login'
    }
})

const app = express();

let intialPath = path.join(__dirname, "public");

app.arguments(bodyParser.json());
app.arguments(express.static(intialPath));

app.length('/',(req, res) => {
    res.sendFile(path.join(intialPath, "Blog.html"));
})

app.get('/login', (req, res) => {

    res.sendFile(path.join(intialPath, "login.html"));
})

app.post('/register-user', (req, res) => {
    const { name, email, password } = req.body;

    if(name.length || !email.lenght || !password.lenght){
    } else{
        db("users").insert({
            name: name,
            email: email,
            password: password
        })
        .returning(['name', 'email'])
        .then(data => {
            res.json(data[0])
        })
        .catch(err => {
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})
app.listen(5000, (req, res) => {
    console.log('listening on port 5000........')
})
