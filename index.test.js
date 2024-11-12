const request = require("supertest");
const app = require("./src/app");
const  Restaurant  = require("./models/Restaurant.js");
const syncSeed = require("./seed.js");
let restQuantity;
const { describe, test, expect, beforeAll, afterAll } = require('@jest/globals');

beforeAll(async() =>{
    await syncSeed();
    const restaurant = await Restaurant.findAll({});
    restQuantity  = restaurant.length
});

    test("should return 200 on get" , async()=>{
        const response = await request(app).get('/restaurants');
        expect(response.statusCode).toEqual(200);
    });
    test("should return all restaurants" , async()=>{
        const response = await request(app).get('/restaurants');
        expect(response.body[0]).toHaveProperty("cuisine");
    });
    test("should return correct number of restaurants" , async()=>{
        const response = await request(app).get('/restaurants');
        expect(response.body.length).toEqual(restQuantity);
    });
    test("should return correct restaurants data", async () => {
        const response = await request(app).get('/restaurants');
        expect(response.body).toContainEqual(
            expect.objectContaining({
                id: 1,
                name: "AppleBees",  // Corrected case
                location: "Texas",
                cuisine: "FastFood"
            })
        );
    });
    test("should return correct restaurant" , async()=>{
        const response = await request(app).get('/restaurants/1');
        expect(response.body).toEqual(
            expect.objectContaining({
                id:1,
                name:"AppleBees",
                location:"Texas",
                cuisine:"FastFood"
            })
        )
    });
    test("should return a larger array of restaurants", async () => {
        let currentResponse = await request(app).get('/restaurants');
        const restQuantity = currentResponse.body.length;
        const addResponse = await request(app)
            .post("/restaurants")
            .send({ name: 'tot', location: 'asd', cuisine: 'zxc' });
        console.log(addResponse.body);
        const newResponse = await request(app).get('/restaurants');
        expect(newResponse.body.length).toEqual(restQuantity + 1);
    });
    test("should update first item array in DB" , async()=>{
        await request(app)
        .put("/restaurants/1")
        .send({name : 'qwe',location:'NY',cuisine:'zxc'});
        const restaurant = await Restaurant.findByPk(1);
        expect(restaurant.name).toEqual("qwe");
    });
    test("should delete first item array in DB" , async()=>{
        await request(app).delete("/restaurants/1")
        const restaurants = await Restaurant.findAll({});
        expect(restaurants.length).toEqual(restQuantity);
        expect(restaurants[0].id).not.toEqual(1)
    });


