const express = require("express");
const app = express();
const Restaurant = require("../models/index")
const db = require("../db/connection");

//TODO: Create your GET Request Route Below: 
app.get('/restaurants',async (req,res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})
app.get('/restaurants/:id',async (req,res)=>{
    const parameter = req.params.id;
    const restaurant = await Restaurant.findByPk(parameter);
    res.json(restaurant);
    
})



module.exports = app;