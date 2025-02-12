const mongoose = require("mongoose");

require("dotenv").config({
    path: "../config/.env"
});

const connector = async (url) => {
    try {
        await mongoose.connect(url);
        console.log("Connected to MongoDB successfully!");
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connector;