'use strict';
import order from '../models/Order.js';

export default {
  getAll: async (req, res) => {
    try {
      if(req.body.user_id) {
        res.send(await order.find({ user_id: req.body.user_id }));
      } else {
        res.send(await order.find());
      }
    } catch(e) {
      res.status(500).send(e.message);
    }

  },

  getOne: async (req, res) => {
    try {
      res.send(await order.findById(req.params.id));
    } catch (e) {
      res.send('Cant find order with id ' + req.params.id)
    }
  },

  create: async (req, res) => {
    try {
      const starts_at = new Date(req.body.starts_at);
      const ends_at = new Date(req.body.ends_at);
      const orders = await order.find({ user_id: req.body.user_id })
      for (let order of orders) {
        if (order.starts_at < ends_at && order.ends_at > starts_at) {
          throw new Error('Order overlaps with another order')
        }
      }

      const newOrder = await order.create({
        ...req.body,
        starts_at: starts_at,
        ends_at: ends_at,
      });
      res.status(200).send(newOrder);
    } catch (e) {
      console.error(e)
      res.status(500).send(e.message)
    }
  },

  modify: async (req, res) => {
    try {
      const modifiedOrder = await order.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
      res.send(modifiedOrder)
    } catch (e) {
      res.send(e.message)
    }
  }
}

