// MONGODB PW: REdZ170gKQpf8KS8
// MONGODB CONNEXION: mongodb+srv://will:<password>@cluster0-lh2dz.mongodb.net/test?retryWrites=true&w=majority

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

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

app.post('/api/stuff', (req, res, next) => {
    const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });
    thing.save().then(
        () => {
            res.status(201).json({
                message: 'Post saved successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'odfdjdfy',
            title: 'My first thing',
            description: 'All the info about my first thing',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 4599,
            userId: 'hdhsnnchd',
        },
        {
            _id: 'jjdsbstsq',
            title: 'My second thing',
            description: 'All the info about my second thing',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Canon_EOS_60D_01.jpg',
            price: 2399,
            userId: 'hdhsnnchd',
        },
    ];
    res.status(200).json(stuff);
});


module.exports = app;