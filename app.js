const express = require('express');
const bodyParser = require('body-parser');

const app = express();  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Thing created successfully!'
    });
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