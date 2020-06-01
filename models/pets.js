/**
 * File Name: pets.js
 * Description: File contains schema for Pets document
 */

const mongoose = require('mongoose');

// Define Pets Schema
const Schema = mongoose.Schema;

module.exports = mongoose.model('Pets', Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  colour: {
    type: String,
    require: true,
  }
}));