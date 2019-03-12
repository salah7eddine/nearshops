const mongoose = require('mongoose');

const Review = require('../models/review');
const User = require('../models/user');
const Shop = require('../models/shop');


exports.reviewsGetAll = async (req, res, next) => {
  Review
    .find()
    .select('_id shop user like dislike timeDislike')
    .populate('user','_id email')
    .populate('shop','_id title image lat lon')
    .exec()
    .then(review => {
      res.status(200).json({
        count: review.length,
        reviews: review.map(rvw => {
          return {
            _id: rvw._id,
            shop: rvw.shop,
            user: rvw.user,
            like: rvw.like,
            dislike: rvw.dislike,
            timeDislike: rvw.timeDislike,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/reviews/' + rvw._id
            }
          }
        })
      })
    })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
};

exports.reviewsCreateReview = async (req, res, next) => {
  const user = await User.findById(req.body.userId);
    if(!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

  const shop  = await Shop.findById(req.body.shopId);
    if(!shop) {
      return res.status(404).json({
        message: 'Shop not found'
      });  
    };
  
    const review = new Review({
      _id: mongoose.Types.ObjectId(),
      user: req.body.userId,
      shop: req.body.shopId,
      like: req.body.like,
      dislike: req.body.dislike,
      timeDislike: new Date(),
    });

    const result = await review.save();
    
    if(result) {
      res.status(201).json({
        message: 'Review stored',
        createdReview: {
          message: 'Review stored',
          createdReview: {
            _id: result._id,
            shop: result.shop,
            user: result.user,
            like: result.like,
            dislike: result.dislike,
            timeDislike: result.timeDislike
          }
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/review/' + result._id
        }
      });
    } else {
      res.status(500).json({
        error: err
      });
    }
};

exports.reviewsGetReview = (req, res, next) => {
  const id = req.params.reviewId;
  Review
    .findById(id)
    .select('_id shop user like dislike timeDislike')
    .exec()
    .then(review => {
      console.log("From the database",review);
      if(review) {
        res.status(200).json({
          review: review,
          request: {
            type: 'GET',
            description: 'Get all review',
            url: 'http://localhost:3000/reviews'
          }
        });
      } else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

exports.reviewsGetReviewUser = (req, res, next) => {
  const id = req.params.userId;
  Review
    .find({
      user: {_id : id}
     })
    .select('_id shop user like dislike timeDislike')
    .populate('shop')
    .populate('user')
    .exec()
    .then(review => {
      if(review) {
        console.log(review);
        res.status(200).json({
          review: review,
          request: {
            type: 'GET',
            description: 'Get all review',
            url: 'http://localhost:3000/reviews'
          }
        });
      } else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }
    }).catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
};

exports.reviewsUpdateReview = (req, res, next) => {
  const id = req.params.reviewId;
  const updateOps = {};
  for(const ops of req.body) {
    if(ops.propName === 'timeDislike') {
      updateOps[ops.propName] = new Date(ops.value);
    }
    updateOps[ops.propName] = ops.value;
  }

  Review
    .update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Review updated',
        request: {
          type: 'GET',
          url: 'http://localhost:3000/reviews/' + id
        }
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({
        error: err 
      });
    });
}

exports.reviewsDeleteReview = (req, res, next) => {
  const id = req.params.reviewId;
  Review.remove({ _id: id})
        .exec()
        .then(result => {
          res.status(200).json({
            message: 'Review deleted',
            request: {
              type: 'POST',
              url: 'http://localhost:3000/reviews',
              data: {
                shop: 'id',
                user: 'id',
                like: 'Boolean',
                dislike: 'Boolean',
                timeDislike: 'Date',
              }
            }
          });
        })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
}