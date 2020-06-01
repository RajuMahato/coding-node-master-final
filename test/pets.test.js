/**
 * File Name: pets.test.js
 * Description: Test file containing test cases for pets
 */

const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);

const mongoose = require('mongoose');

// Pets test suite
describe('**********Pets Unit test suite************', () => {

  it('Should fetch all pets but will return empty as db table is blank for first time', async () => {
    // Fetch all pets
    const petRes = await request(app).get('/pets').send();
    expect(petRes.status).to.equal(201);
    expect(petRes.body.length).to.equal(0);
  });
  it('Should fail to create a pet without a name', async () => {
    const res = await request(app).post('/pets').send({
      age: 1,
      colour: 'white',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"name" is required');
  });

  it('Should fail to create a pet without a age', async () => {
    const res = await request(app).post('/pets').send({
      name: "Jack",
      colour: 'white',
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"age" is required');
  });

  it('Should fail to create a pet without a colour', async () => {
    const res = await request(app).post('/pets').send({
      name: "Mini",
      age: 2,
    });
    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('"colour" is required');
  });

  it('Should fail to create a pet with string type of age', async () => {
    const res = await request(app).post('/pets').send({
      name: "Jack",
      age: "22",
      colour: 'white',
    });
    expect(res.status).to.equal(201);
  });

  it('Should create a pet', async () => {
    const pet = {
      name: 'Tom',
      age: 3,
      colour: 'brown',
    };
    const res = await request(app).post('/pets').send(pet);
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);
    expect(res.body.age).to.equal(pet.age);
    expect(res.body.colour).to.equal(pet.colour);
  });

  it('Should fetch a pet with valid name', async () => {
    const pet = {
      name: 'Mew',
      age: 1,
      colour: 'white',
    };
    // Create the pet
    const res = await request(app).post('/pets').send(pet);
    // This is to check save pet call is succeeded
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);

    // Fetch the pet
    const petRes = await request(app).get('/pets/' + pet.name).send();
    expect(petRes.status).to.equal(201);
    expect(petRes.body.length).to.greaterThan(0);
    expect(petRes.body[0].name).to.equal(pet.name);
    expect(petRes.body[0].age).to.equal(pet.age);
    expect(petRes.body[0].colour).to.equal(pet.colour);
  });

  it('Should fail to fetch a pet due to invalid pet name', async () => {
    const pet = {
      name: 'dan',
      age: 2,
      colour: 'golden',
    };
    // Create the pet
    const res = await request(app).post('/pets').send(pet);
    // This is to check save pet call is succeeded
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);

    // Fetch the pet
    const petRes = await request(app).get('/pets/invalidName').send();
    expect(petRes.status).to.equal(201);
  });

  it('Should fetch all pets', async () => {
    const pet = {
      name: 'kan',
      age: 2,
      colour: 'golden',
    };
    // Create the pet
    const res = await request(app).post('/pets').send(pet);

    // Fetch all pets
    const petRes = await request(app).get('/pets').send();
    expect(petRes.status).to.equal(201);
    expect(petRes.body.length).to.greaterThan(0);
  });

  it('Should fail to delete a pet due to invalid pet _id', async () => {
    const pet = {
      name: 'Tim',
      age: 3,
      colour: 'Black',
    };
    // Create the pet
    const res = await request(app).post('/pets').send(pet);
    // This is to check save pet call is succeeded
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);

    // Fetch the pet
    const petRes = await request(app).delete('/pets/').send({ _id: "invalid_id" });
    expect(petRes.status).to.equal(500);
    expect(petRes.body.message).to.equal('Cast to ObjectId failed for value "invalid_id" at path "_id" for model "Pets"')
  });

  it('Should fail to delete a pet due to blank pet _id', async () => {
    const pet = {
      name: 'Sam',
      age: 1,
      colour: 'Brown',
    };
    // Create the pet
    const res = await request(app).post('/pets').send(pet);
    // This is to check save pet call is succeeded
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);

    // Fetch the pet
    const petRes = await request(app).delete('/pets/').send();
    expect(petRes.status).to.equal(400);
    expect(petRes.body.message).to.equal('"_id" is required');
  });

  it('Should delete a pet', async () => {
    const pet = {
      name: 'neo',
      age: 3,
      colour: 'white',
    };
    // Create the pet
    const res = await request(app).post('/pets').send(pet);
    // This is to check save pet call is succeeded
    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(pet.name);

    // Fetch the pet
    const petRes = await request(app).delete('/pets/').send({ _id: res.body._id });
    expect(petRes.status).to.equal(201);
    expect(petRes.body).to.equal("Pet deleted");
  });
});