'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    starts_at: Date,
    ends_at: Date,
    user_id: Schema.Types.ObjectID,
    car_id: Schema.Types.ObjectID,
    user: [{ type: Schema.Types.ObjectID, ref: 'User' }],
    car: [{ type: Schema.Types.ObjectID, ref: 'Car' }]
});

export default mongoose.model('Order', orderSchema);