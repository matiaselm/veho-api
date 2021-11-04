'use strict';
import User from "../models/User.js";

export default {
    Query: {
        Users: async (_, args) => {
            return User.find()
        },
        User: async (_, args) => {
            return User.findById(args.id)
        }
    },
    Mutation: {
        DeleteUser: async (_, args, context) => {
            return User.findByIdAndDelete(args.id)
        },
        AddUser: async (_, args, context) => {
            try {
                const { ...data } = args;
                const response = new User(data).save();
                return response;
            } catch (e) {
                console.error(e)
            }
        },
        ModifyUser: async (_, args, context) => {
            try {
                const { id, ...data } = args
                const modifiedUser = await User.findByIdAndUpdate(id, { ...data });
                return modifiedUser
            } catch (e) {
                console.error(e)
            }
        }
    },
}