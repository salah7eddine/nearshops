const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const shopRoutes = require('./routes/shops');
const userRoutes = require('./routes/user');
const reviewRoutes = require('./routes/reviews');

mongoose.connect('mongodb://admin:'+ process.env.MONGO_ATLAS_PW+'@projectnode-shard-00-00-kgrep.mongodb.net:27017,projectnode-shard-00-01-kgrep.mongodb.net:27017,projectnode-shard-00-02-kgrep.mongodb.net:27017/test?ssl=true&replicaSet=ProjectNode-shard-0&authSource=admin&retryWrites=true', {

  useNewUrlParser: true

});

mongoose.Promise = global.Promise;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accespt, Authorization');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// Routes which sould handl requests
app.use('/shops', shopRoutes);
app.use('/users', userRoutes);
app.use('/reviews', reviewRoutes);

// every Routes goes to index.html
app.get('*', (req, res)=> {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;