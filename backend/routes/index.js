'use strict';

const express = require('express');
const stationCtrl = require('../controllers/station');
const bikeCtrl = require('../controllers/bike');
const api = express.Router();

/**
 * Routes restful API
 */
api.get('/bikes', bikeCtrl.getBikes);
api.get('/bikes/unassigned', bikeCtrl.getUnassignedBikes);
api.post('/bikes', bikeCtrl.postBike);
api.get('/bikes/:bikeId', bikeCtrl.getBikeDetail);
api.delete('/bikes/:bikeId', bikeCtrl.deleteBike);

api.get('/stations', stationCtrl.getStations);
api.post('/stations', stationCtrl.postStation);
api.get('/stations/:stationId', stationCtrl.getStationBikeDetail);
api.delete('/stations/:stationId', stationCtrl.deleteStation);
api.put('/stations/:stationId', stationCtrl.updateStation);
api.post('/stations/addbike', stationCtrl.postStationBike);
api.post('/stations/deletebike', stationCtrl.deleteBikeStation);


module.exports = api;
