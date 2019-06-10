const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of Bike schema
 */
const BikeSchema = new Schema ({
    name: { type: String, required: true},
    kms: { type: String, required: true },
    description: { type: String, required: true },
    assigned: { type: Boolean, default: false}
});

/**
 * Export the Bike schema
 * @type {Model}
 */
module.exports = mongoose.model('Bike', BikeSchema);
