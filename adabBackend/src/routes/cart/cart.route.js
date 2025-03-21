const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/cart/cart.controller');

// Add to Cart
router.post('/add', cartController.addToCart);

// Update Cart
router.put('/update', cartController.updateCart);

// Delete from Cart
router.delete('/delete', cartController.deleteFromCart);

// Get Cart
router.get('/:userId', cartController.getCart);

module.exports = router;