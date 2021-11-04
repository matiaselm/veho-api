'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carSchema = new Schema({
    image_url: String,
    manufacturer: String,
    model: String,
    year: 'Number',
    km: 'Number',
    fueltype: String,
});

export default mongoose.model('Car', carSchema);
