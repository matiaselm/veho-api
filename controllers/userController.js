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
            const created = await user.create({ 
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
        user.findByIdAndUpdate(req.params.id, { ...req.body }, { returnDocument: 'after' }).then(u => {
            res.status(200).send(u);
        }).catch(e => {
            res.status(500).send(e)
        })
    },

    delete: async (req, res) => {
        const del = await user.deleteOne({ _id: req.params.id });
        res.status(200).send(`Deleted ${del.deletedCount} user`);
    }
}