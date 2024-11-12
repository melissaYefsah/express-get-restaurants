const express = require("express");
const app = express();

const db = require("../db/connection");
const restaurantRouter = require("../routes/restaurants")
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use('/restaurants',restaurantRouter);
//TODO: Create your GET Request Route Below: 



module.exports = app;