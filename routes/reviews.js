const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const reviewControllers = require('../controllers/reviews');


// Handle incoming GET requests to /reviews
router.get('/', checkAuth, reviewControllers.reviewsGetAll);

// Handle incoming POST requests to /reviews
router.post('/', checkAuth, reviewControllers.reviewsCreateReview);

// Handle incoming GET requests to /reviews/:reviewId
router.get('/:reviewId', checkAuth, reviewControllers.reviewsGetReview);

// Handle incoming GET requests to /userReviews/:userid
router.get('/userReviews/:userId', checkAuth, reviewControllers.reviewsGetReviewUser);

// Handle incoming PATCH requests to /reviews/:reviewId
router.patch('/:reviewId', checkAuth, reviewControllers.reviewsUpdateReview);

// Handle incoming DELETE requests to /reviews/:reviewId
router.delete('/:reviewId', checkAuth, reviewControllers.reviewsDeleteReview);


module.exports = router;