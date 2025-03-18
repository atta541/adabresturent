const SubItem = require('../../models/subItems.model');
const Item = require('../../models/items.model');


// Create a new sub-item
exports.createSubItem = async (req, res) => {
    try {
        const { name, description, price, picture, itemId } = req.body;

        if (!name || !description || !price || !picture || !itemId) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newSubItem = new SubItem({ name, description, price, picture, itemId });
        await newSubItem.save();

        res.status(201).json(newSubItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all sub-items for a specific item
exports.getSubItemsByItemId = async (req, res) => {
    try {
        const { itemId } = req.params;

        const subItems = await SubItem.find({ itemId: itemId });
        res.status(200).json(subItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single sub-item by ID
exports.getSubItemById = async (req, res) => {
    try {
        const subItem = await SubItem.findById(req.params.id);
        if (!subItem) {
            return res.status(404).json({ message: "Sub-item not found" });
        }
        res.status(200).json(subItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a sub-item by ID
exports.updateSubItem = async (req, res) => {
    try {
        const updatedSubItem = await SubItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedSubItem) {
            return res.status(404).json({ message: "Sub-item not found" });
        }

        res.status(200).json(updatedSubItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a sub-item by ID
exports.deleteSubItem = async (req, res) => {
    try {
        const deletedSubItem = await SubItem.findByIdAndDelete(req.params.id);

        if (!deletedSubItem) {
            return res.status(404).json({ message: "Sub-item not found" });
        }

        res.status(200).json({ message: "Sub-item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};





exports.getSubItemsByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: "Category is required" });
        }

        // Find items with the specified category
        const items = await Item.find({ category: category });
        const itemIds = items.map(item => item._id);

        // Find sub-items for those items
        const subItems = await SubItem.find({ itemId: { $in: itemIds } });

        res.status(200).json(subItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




// Get all sub-items with their associated item details
exports.getSubItemsWithItemDetails = async (req, res) => {
    try {
        const { category } = req.query;

        console.log(category);
        let query = {};
        if (category) {
            // Find items with the specified category
            const items = await Item.find({ category: category });
            const itemIds = items.map(item => item._id);

            // Filter sub-items by itemIds
            query = { itemId: { $in: itemIds } };
        }

        const subItems = await SubItem.find(query).populate('itemId');
        res.status(200).json(subItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};