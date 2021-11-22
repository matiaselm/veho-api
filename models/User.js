'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image_url: String,
    name: String,
    points: 'Number',
    language: String,
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
});

export default mongoose.model('User', userSchema);
