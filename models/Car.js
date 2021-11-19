'use strict';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const carSchema = new Schema({
    manufacturer: String,
    model: String,
    year: 'Number',
    doors: 'Number',
    type: String,
    image_url: String,
    description: String,
    fueltype: String,
    gearbox: String,
    km: 'Number',
    liters: 'Number', 
    price: 'Number',
    monthly_price: 'Number',
    seats: 'Number',
    location: String,
});

export default mongoose.model('Car', carSchema);
