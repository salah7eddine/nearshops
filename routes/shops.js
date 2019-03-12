const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const shopsControllers = require('../controllers/shops');

// Handle incoming GET requests to /shops
router.get('/', checkAuth, shopsControllers.shopsGetAll);

// Handle incoming POST requests to /shops
router.post('/', checkAuth, shopsControllers.shopsCreateshop);

// Handle incoming GET requests to /shops/:shopId
router.get('/:shopId', checkAuth, shopsControllers.shopsGetShop);

// Handle incoming PATCH requests to /shops/:shopId
router.patch('/:shopId', checkAuth, shopsControllers.shopsUpdateShop);

// Handle incoming DELETE requests to /shops/:shopId
router.delete('/:shopId', checkAuth, shopsControllers.shopsDeleteShop);

module.exports = router;

