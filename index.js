const express = require('express');
const app = express();
const menuRouter = require("./src/controllers/menu.js");

require("dotenv").config({
	path: "./src/config/.env"
})

const port = process.env.port;
const url = process.env.url;

const connectDatabase = require("./src/database/database");


app.listen(port, async () => {
	console.log(`App is running at http://localhost:${port}`);

    try {
      await connectDatabase(url);
    }
	catch (error) {
    	console.log(error);
    }
});

app.use(express.json());

app.use("/", menuRouter);