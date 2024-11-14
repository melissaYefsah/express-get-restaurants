const express = require("express");
const { Router } = require("express");
const app = require('../src/app');
const restaurantRouter = Router();
const {Menu,Item,Restaurant} = require ("../models/index")
const db = require('../models/Restaurant')
const {check,validationResult} = require('express-validator')


restaurantRouter.get('/',async (req,res)=>{
    const restaurants = await Restaurant.findAll({
    include: [{
        model: Menu,
        include: [{ model: Item }]
    }]
});
    res.json(restaurants);
})
restaurantRouter.get('/:id',async (req,res)=>{
    const parameter = req.params.id;
    const restaurant = await Restaurant.findByPk(parameter);
    res.json(restaurant);
})
restaurantRouter.post('/',[check("name").not().isEmpty().trim().isLength({min:10,max:30})],[check("location").not().isEmpty().trim()],[check("cuisine").not().isEmpty().trim()], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
    else {
        const restaurant = await Restaurant.create(req.body);
        res.json(restaurant);
    }

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
