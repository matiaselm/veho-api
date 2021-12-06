'use strict';
import Order from '../models/Order.js';

export default {
  getAll: async (req, res) => {
    try {
      let orders;
      if(req.body.user_id) {
        orders = await Order.find({ user: req.body.user_id }).populate('user').populate('car');
      } else if(req.body.active) {
        orders = await Order.find({ active: true }).populate('user').populate('car');
      } else {
        orders = await Order.find().populate('user').populate('car');
      }

      res.send(orders);
    } catch(e) {
      res.status(500).send(e.message);
    }

  },

  getOne: async (req, res) => {
    try {
      res.send(await Order.findById(req.params.id).populate('user').populate('car'));
    } catch (e) {
      res.send('Cant find order with id ' + req.params.id)
    }
  },

  create: async (req, res) => {
    try {
      const starts_at = new Date(req.body.starts_at);
      const ends_at = new Date(req.body.ends_at);
      const orders = await Order.find({ user: req.body.user })
      for (let order of orders) {
        if ((order.active || order.starts_at < ends_at && order.ends_at > starts_at)) {
          throw new Error('Order overlaps with another order')
        }
      }

      const newOrder = await Order.create({
        starts_at: starts_at,
        ends_at: ends_at,
        user: req.body.user,
        car: req.body.car,
        active: true
      });
      res.status(200).send(newOrder);
    } catch (e) {
      console.error(e.message)
      res.status(500).send(e.message)
    }
  },

  modify: async (req, res) => {
    try {
      const modifiedOrder = await Order.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
      res.send(modifiedOrder);
    } catch (e) {
      res.send(e.message)
    }
  }
}

