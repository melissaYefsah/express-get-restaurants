const express = require("express");
const { Router } = require("express");
const app = require('../src/app');
const restaurantRouter = Router();
const db = require('../models/Restaurant')
const Restaurant = require("../models/index")


restaurantRouter.get('/',async (req,res)=>{
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
})
restaurantRouter.get('/:id',async (req,res)=>{
    const parameter = req.params.id;
    const restaurant = await Restaurant.findByPk(parameter);
    res.json(restaurant);
})
restaurantRouter.post('/',async(req,res)=>{
    const restaurant = await Restaurant.create(req.body);
    res.json(restaurant);
})
restaurantRouter.put('/:id',async(req,res)=>{
    const updatedRestaurant = await Restaurant.update(req.body,{where :{id : req.params.id}});
    res.json(updatedRestaurant);
})
restaurantRouter.delete("/:id",async(req,res)=>{
    const deletedRestaurant = await Restaurant.destroy({where :{id : req.params.id}});
    res.json(deletedRestaurant);
})

module.exports = restaurantRouter;
