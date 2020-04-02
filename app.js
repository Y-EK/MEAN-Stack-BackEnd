// MONGODB PW: REdZ170gKQpf8KS8
// MONGODB CONNEXION: mongodb+srv://will:<password>@cluster0-lh2dz.mongodb.net/test?retryWrites=true&w=majority 

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const Thing = require('./models/thing');
const Product = require('./models/product');

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


// Creates a new instance of Product model in the database

app.post('/api/products', (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    product.save().then(
        (product) => {
            res.status(201).json({
                product
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

// Returns the product with the provided  _id  as  { product: Product }

app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        (product) => {
            res.status(200).json({ 
                product
            });
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
});

// Updates the product with the provided _id  with the data provided in the request body

app.put('/api/products/:id', (req, res, next) => {
    const product = new Product({
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inStock: req.body.inStock
    });
    Product.updateOne({_id: req.params.id}, product).then(
        () => {
            res.status(201).json({
                message: 'Modified!'
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

// Deletes the product with the provided  _id

app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(
        () => {
            res.status(200).json({
                message: 'Deleted!'
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

// Returns all products in the database as  { products: Product[] }

app.use('/api/products', (req, res, next) => {
    Product.find().then(
      (products) => {
        res.status(200).json({
            products
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

module.exports = app;