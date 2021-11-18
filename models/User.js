'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    points: 'Number',
    language: String,
});

export default mongoose.model('User', userSchema);
