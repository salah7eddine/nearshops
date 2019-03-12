const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/user');

exports.getUser = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
      .select('_id email lat lon password')
      .populate('user')
      .exec()
      .then(user => {
        if(!user) {
          return res.status(404).json({
            message: "User not found"
          });
        }
        res.status(200).json({
          user: user,
          request: {
            type: 'POST',
            url: 'http://localhost:3000/users/login'
          }
        })


      })
};

exports.userLogin = (req, res, next) => {
  User
    .find({ email : req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1 ) {
        return res.status(404).json({
          message: 'Auth failed'
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if(err) {
          return res.status(401).json({
            message: 'Auth failed'
          }); 
        }
        if(result) {
          const token = jwt.sign({
            email: user[0].email,
            lat: user[0].lat,
            lon: user[0].lon,
            userId: user[0]._id
          }, process.env.JWT_KEY,
          {
            expiresIn: "1h"
          },
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          });
        }
        return res.status(401).json({
          message: 'Auth failed'
        }); 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.userSignup = (req, res, next) => {
  User
    .find({ email: req.body.email })
    .exec()
    .then(user => {
      if(user.length >= 1) {
        res.status(409).json({
          message: 'Mail exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if(err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              lat: new Number(req.body.lat),
              lon: new Number(req.body.lon),
              password: hash
            });
      
            user.save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: 'User created'
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
          }
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
 
};

exports.userDelete = (req, res, next) => {
  User
    .remove({ _id: req.params.id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
