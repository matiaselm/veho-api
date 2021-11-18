'use strict';
import user from '../models/User.js';

export default {
    getAll: async (req, res) => {
        res.send(await user.find());
    },

    getOne: async (req, res) => {
        try {
            res.send(await user.findById(req.params.id));
        } catch (e) {
            res.send('Cant find cat with id ' + req.params.id)
        }
    },

    create: async (req, res) => {
        try {
            const user = await user.create({ ...req.body });
            res.status(200).send(user);
        } catch (e) {
            res.status(500).send(e);
        }
    },

    update: (req, res) => {
        console.log(req.body);
        user.findByIdAndUpdate(req.params.id, { ...req.body }).then(u => {
            res.status(200).send(u);
        }).catch(e => {
            res.status(500).send(e)
        })
    },

    delete: async (req, res) => {
        const del = await user.deleteOne({ _id: req.params.id });
        res.send(`deleted ${del.deletedCount} cat post`);
    }
}