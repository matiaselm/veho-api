'use strict';
import Car from "../models/Car.js";

export default {
    Query: {
        Cars: async () => {
            try {
                return Car.find().sort({ index: 1, title: 1 }).exec()
            } catch (e) {
                return e.message
            }
        },
        Car: async (_, args) => {
            return Car.findById(args.id)
        }
    },
    Mutation: {
        CreateCar: async (_, args) => {
            try {
                return new Car(args).save();
            } catch (e) {
                return e.message
            }
        },
        DeleteCar: async (_, args) => {
            try {
                await (await Car.findByIdAndDelete(args.id)).save();
                return `deleted car ${args.id}`
            } catch (e) {
                return e.message
            }
        },
        ModifyCar: async (_, args) => {
                try {
                    const { id, ...body } = args
                    return await Car.findByIdAndUpdate(id, { ...body }).save();
                } catch (e) {
                    console.error(e)
                    return e.message
                }
        }
    }
}