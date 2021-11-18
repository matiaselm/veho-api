'use strict';
import order from '../models/Order.js';

export default {
  getAll: async (req, res) => {
    res.send(await order.find({ user_id: req.params.user_id }));
  },

  getOne: async (req, res) => {
    try {
      res.send(await order.findById(req.params.id));
    } catch (e) {
      res.send('Cant find cat with id ' + req.params.id)
    }
  },

  create: async (req, res) => {
    const starts_at = new Date(req.body.starts_at);
    const ends_at = new Date(req.body.ends_at);
    try {
      const orders = await order.find({ user_id: req.body.user_id })
      for (let order of orders) {
        if (order.starts_at < ends_at && order.ends_at > starts_at) {
          throw new Error('Order overlaps with another order')
        }
      }
    } catch (error) {
      res.send(error)
    }

    new order({
      ...req.body,
      starts_at: starts_at,
      ends_at: ends_at,
    }).save().then(res => {
      console.log('res:', res);
      res.send(res);
    }).catch(err => {
      res.send(err);
    });
  },

  modify: async (req, res) => {
    try {
      const { id, ...data } = req.body
      const modifiedOrder = await order.findByIdAndUpdate(id, { ...data });
      res.send(modifiedOrder)
    } catch (e) {
      console.error(e)
      res.send(e)
    }
  }
}

