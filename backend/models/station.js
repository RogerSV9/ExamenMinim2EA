const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Definition of station schema
 */
const StationSchema = new Schema({
    name: { type: String, required: true},
    state: { type: String, required: true },
    description: { type: String, required: true },
    bikes: [{ type: Schema.ObjectId, ref: 'Bike', unique: false }]
});

/**
 * Export the station schema
 * @type {Model}
 */
module.exports = mongoose.model('Station', StationSchema);

