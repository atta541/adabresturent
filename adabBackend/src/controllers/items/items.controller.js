// const Item = require('../../models/items.model'); 

// // Create a new item
// // exports.createItem = async (req, res) => {
// //     try {
// //         const { name, picture } = req.body;
// //         if (!name || !picture) {
// //             return res.status(400).json({ message: "Name and picture are required" });
// //         }

// //         const newItem = new Item({ name, picture });
// //         await newItem.save();
// //         res.status(201).json(newItem);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };


// exports.createItem = async (req, res) => {
//     try {
//         const { name, picture, category } = req.body;

//         if (!name || !picture || !category) {
//             return res.status(400).json({ message: "Name, picture, and category are required" });
//         }

//         const newItem = new Item({ name, picture, category });
//         await newItem.save();

//         res.status(201).json(newItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };




// // Get all items
// // exports.getAllItems = async (req, res) => {
// //     try {
// //         const items = await Item.find();
// //         res.status(200).json(items);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };


// // Get all items or filter by category
// exports.getAllItems = async (req, res) => {
//     try {
//         const { category } = req.query; // Get category from query parameters
//        console.log(category);
//         let items;

//         if (category) {
//             items = await Item.find({ category: category });
//         } else {
//             items = await Item.find();
//         }

//         res.status(200).json(items);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };





// // Get a single item by ID
// exports.getItemById = async (req, res) => {
//     try {
//         const item = await Item.findById(req.params.id);
//         if (!item) {
//             return res.status(404).json({ message: "Item not found" });
//         }
//         res.status(200).json(item);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update an item by ID
// exports.updateItem = async (req, res) => {
//     try {
//         const updatedItem = await Item.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );

//         if (!updatedItem) {
//             return res.status(404).json({ message: "Item not found" });
//         }

//         res.status(200).json(updatedItem);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete an item by ID
// exports.deleteItem = async (req, res) => {
//     try {
//         const deletedItem = await Item.findByIdAndDelete(req.params.id);

//         if (!deletedItem) {
//             return res.status(404).json({ message: "Item not found" });
//         }

//         res.status(200).json({ message: "Item deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };



const Item = require('../../models/items.model');

// Create a new item
exports.createItem = async (req, res) => {
    try {
        const { name, picture, category } = req.body;

        if (!name || !picture || !category) {
            return res.status(400).json({ message: "Name, picture, and category are required" });
        }

        const newItem = new Item({ name, picture, category });
        await newItem.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all items or filter by category
exports.getAllItems = async (req, res) => {
    try {
        const { category } = req.query; // Get category from query parameters
        let items;

        if (category) {
            items = await Item.find({ category: category });
        } else {
            items = await Item.find();
        }

        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};