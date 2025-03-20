const express = require('express');
const router = express.Router();
const subItemsController = require('../../controllers/items/subItems.controller');

router.post('', subItemsController.createSubItem);
router.get('/with-item-details', subItemsController.getSubItemsWithItemDetails); // ✅ Define this first
router.get('/by-category', subItemsController.getSubItemsByCategory); // ✅ Define this first
router.get('/:itemId', subItemsController.getSubItemsByItemId); // ✅ Dynamic route comes after
router.get('/sub/:id', subItemsController.getSubItemById);
router.put('/:id', subItemsController.updateSubItem);
router.delete('/:id', subItemsController.deleteSubItem);

module.exports = router;