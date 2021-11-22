'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    starts_at: Date,
    ends_at: Date,
    active: Boolean,
    user: { type: Schema.Types.ObjectID, ref: 'User' },
    car: { type: Schema.Types.ObjectID, ref: 'Car' }
});

export default mongoose.model('Order', orderSchema);