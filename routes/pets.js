/**
 * File Name: pets.js
 * Description: File to manage all the routes related to Pets
 */

const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();


// API to add pets (http://xxxxx:port:/pets)
router.post("/", validateBody(Joi.object().keys({
  name: Joi.string().required().description('Pet name'),
  age: Joi.number().integer().required().description('Pet age'),
  colour: Joi.string().required().description('Pet colour')
}),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pets(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (exception) {
      next(exception);
    }
  });

// API to get all pets (http://xxxxx:port:/pets/)
router.get("/", async (req, res, next) => {
  try {
    const pets = await Pets.find().exec();
    res.status(201).json(pets);
  } catch (exception) {
    next(exception);
  }
});


// API to search or get a specific pet by name (http://xxxxx:port:/pets/:name)
router.get("/:name",
  async (req, res, next) => {
    try {
      const petName = req.params.name;
      const pets = await Pets.find({ name: petName }).exec();
      res.status(201).json(pets);
    } catch (exception) {
      next(exception);
    }
  });


// Post API to delete pets (http://xxxxx:port:/pets/_:id)
router.delete("/",
  validateBody(Joi.object().keys({
    _id: Joi.string().required().description('Pet _id')
  }),
    {
      stripUnknown: true,
    }), async (req, res, next) => {
      try {
        const petId = req.body._id;
        const pets = await Pets.deleteOne({ _id: petId });
        // res.status(201).json(pets);
        pets.deletedCount && res.status(201).json("Pet deleted");
      } catch (exception) {
        next(exception);
      }
    });


module.exports = router;