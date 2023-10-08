require('dotenv').config();
const express= require('express');
const cors = require("cors");
const mongooseDb = require('./app/products');
const categories = require('./app/categories');
const users = require("./app/users");
const mongoose = require('mongoose');

const config = require('./config');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = 8000;

app.use('/products', mongooseDb);
app.use('/categories', categories);
app.use('/users', users);

const run = async () =>{

    await mongoose.connect(config.db.url, config.db.options);

    app.listen(port, () => {
        console.log(`server stared on ${port}`);
    });

    // process.on('exit', () =>{
    //     console.log('exiting');
    //     mongoDb.disconnect();
    // });

}
run().catch((console.error));