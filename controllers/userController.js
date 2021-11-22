'use strict';
import User from '../models/User.js';

export default {
    getAll: async (req, res) => {
        res.send(await User.find());
    },

    getOne: async (req, res) => {
        try {
            res.send(await User.findById(req.params.id));
        } catch (e) {
            res.send('Cant find cat with id ' + req.params.id)
        }
    },

    create: async (req, res) => {
        try {
            const created = await User.create({ 
                ...req.body,
                language: req.body.language?.toLowerCase() ?? 'fi',
                points: 0
            });
            res.status(200).send(created);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    update: (req, res) => {
        User.findByIdAndUpdate(req.params.id, { ...req.body }, { returnDocument: 'after' }).then(u => {
            res.status(200).send(u);
        }).catch(e => {
            res.status(500).send(e)
        })
    },

    delete: async (req, res) => {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).send(`Deleted user ${req.params.id}`);
    },

    getOrders: async (req, res) => {
        try {
            console.log('orders')
            const user = await User.findById(req.params.id).populate('orders');
            console.log(user)
            res.send(user);
        } catch (e) {
            res.send('Cant find User with id ' + req.params.id)
        }
    }
}