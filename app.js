// MONGODB PW: REdZ170gKQpf8KS8
// MONGODB CONNEXION: mongodb+srv://will:<password>@cluster0-lh2dz.mongodb.net/test?retryWrites=true&w=majority 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();  

mongoose.connect('mongodb+srv://will:REdZ170gKQpf8KS8@cluster0-lh2dz.mongodb.net/test?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
})
.catch((error) => {
    console.log('Unable to connect to MongoDB Altas!');
    console.error(error);
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);
app.use('api/auth', userRoutes);

module.exports = app;