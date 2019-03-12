const mongoose = require('mongoose');

const Shop = require('../models/shop');



exports.shopsGetAll = (req, res, next) => {
  Shop
    .find()
    .select('_id title image lat lon')
    .exec()
    .then(shops => {
      const response = {
        count: shops.length,
        shops: shops.map(shop => {
          return {
            _id: shop._id,
            title: shop.title,
            image: shop.image,
            lat: shop.lat,
            lon: shop.lon,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/shops/' + shop._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.shopsCreateshop =  (req, res, next) => {
  const shop = new Shop({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    image: req.body.image,
    lat: req.body.lat,
    lon: req.body.lon
  });
  shop.save().then(result => {
    console.log(result);
    res.status(201).json({
      message: "Created shop successfully",
      createdShop: {
        _id: result._id,
        title: result.title,
        image: result.image,
        lat: result.lat,
        lon: result.lon,
        request: {
          type: 'GET',
          url: 'http://localhost:3000/shops/' + shop._id
        }
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err 
    });
  });
};

exports.shopsGetShop = (req, res, next) => {
  const id = req.params.shopId;
  Shop
    .findById(id)
    .select('_id title image lat lon')
    .exec()
    .then(shop => {
      console.log("From database", shop);
      if(shop) {
        res.status(200).json({
          shop,
          request: {
            type: 'GET',
            description: 'Get all shops',
            url: 'http://localhost:3000/shops'
          }
        });
      } else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }    
    }).catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.shopsUpdateShop = (req, res, next) => {
  const id = req.params.shopId;
  const updateOps = {};
  for(const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Shop
    .update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Shop updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/shops/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err 
      });
    });
};

exports.shopsDeleteShop = (req, res, next) => {
  const id = req.params.shopId;
  Shop.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'Shop deleted',
          request: {
            type: 'POST',
            url: 'http://localhost:3000/shops',
            data: {
              title: 'String',
              image: 'String',
              'lat': 'Number',
              'lon': 'Number'
            }
          }
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
};


