'use strict';
import car from '../models/Car.js';

export default {
  getAll: async (req, res) => {
    res.send(await car.find());
  },

  getOne: async (req, res) => {
    try{
      res.send(await car.findById(req.params.id));
    } catch(e){
      res.send('Cant find cat with id ' + req.params.id)
    }
  },

  create: async (req, res) => {
    const { image_url, manufacturer, model, price, year, km } = req.body;
    const car = await car.create({
      image_url: image_url,
      manufacturer: manufacturer,
      model: model,
      price: price,
      year: year,
      km: km
    });
    res.send(`car ${car.model} created with id: ${car._id}`);
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
