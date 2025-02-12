const mongoose = require("mongoose");

const schematic = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    }
})

const menuSchematic = mongoose.model("Menu", schematic);

module.exports = menuSchematic;