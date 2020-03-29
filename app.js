const express = require('express');

const app = express();

app.use('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'odfdjdfy',
            title: 'My first thing',
            description: 'All the info about my first thing',
            imageUrl: '',
            price: 4900,
            userId: 'hdhsnnchd',
        },
        {
            _id: 'jjdsbstsq',
            title: 'My second thing',
            description: 'All the info about my second thing',
            imageUrl: '',
            price: 2300,
            userId: 'hdhsnnchd',
        },
    ];
    res.status(200).json(stuff);
});


module.exports = app;