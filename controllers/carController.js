'use strict';
import car from '../models/Car.js';

export default {
  getAll: async (req, res) => {
    res.send(await car.find());
  },

  getOne: async (req, res) => {
    try{
      res.send(await car.findById(req.params.id));
    } catch(e) {
      res.send('Cant find car with id ' + req.params.id)
    }
  },

  create: async (req, res) => {
    try {
      let response;
      if(Array.isArray(req.body)) {
        response = await car.insertMany(req.body);
      } else {
        response = await car.create(req.body)
      }
      
      res.status(200).send(response);
    } catch(e) {
      res.send("Can't create car")
    }
  },

  modify: async (req, res) => {
    const mod = await car.updateOne({ _id: req.params.id }, {...req.body});
    res.status(200).send(`updated sucessfully ${mod.nModified}`);
  },
  
  delete: async (req, res) => {
    const del = await car.deleteOne({ _id: req.params.id });
    res.send(`deleted ${del.deletedCount}`);
  }
}
