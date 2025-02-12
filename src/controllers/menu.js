const {Router} = require('express');
const menuModel = require("./../models/schema");

const menuRouter = Router();

menuRouter.post("/menu", async (request, response) => {
    const {
        name,
        description,
        price
    } = request.body;

    try {
        const newItem = new menuModel({
            name,
            description,
            price,
        })

        const savedItem = await newItem.save();

        response.status(201).json({
            message: "Item created successfully",
            item: savedItem,
        });
    }
    catch (error) {
        console.log(error)

        response.status(500).json({
            message: "Failed to create menu item",
            error: error.message,
        });
    }
})

menuRouter.get("/menu", async (request, response) => {
    try {
        const menuItems = await menuModel.find();

        response.status(200).json(menuItems);
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Failed to fetch menu items",
            error: error.message,
        });
    }
});

menuRouter.put("/menu/:id", async (request, response) => {
    const { id } = request.params;
    const { name, description, price } = request.body;

    // Validate required fields
    if (!name && !price) {
        return response.status(400).json({
            message: "At least one of name or price is required to update.",
        });
    }

    try {
        const updatedItem = await menuModel.findByIdAndUpdate(
            id,
            { name, description, price },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedItem) {
            return response.status(404).json({
                message: "Menu item not found.",
            });
        }

        response.status(200).json({
            message: "Item updated successfully",
            item: updatedItem,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Failed to update menu item",
            error: error.message,
        });
    }
});

// Delete an existing menu item
menuRouter.delete("/menu/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const deletedItem = await menuModel.findByIdAndDelete(id);

        if (!deletedItem) {
            return response.status(404).json({
                message: "Menu item not found.",
            });
        }

        response.status(200).json({
            message: "Item deleted successfully",
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Failed to delete menu item",
            error: error.message,
        });
    }
});

module.exports = menuRouter;