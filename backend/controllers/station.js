'use strict';

const mongoose = require('mongoose');
const Station = require('../models/station');
const Bike = require('../models/bike');

async function postStation(req, res) {
    const station = new Station(req.body);

    console.log(station);

    try {
        await station.save();
        res.status(200).send({message: "station created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

async function deleteStation(req, res) {
    try {
        const _id = mongoose.Types.ObjectId(req.params.stationId);

        let station = await Station.findByIdAndDelete(_id);
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            await Bike.update({}, {$pull: {stations: _id}}, {multi: true});

            res.status(200).send({message:'station deleted successfully'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

async function updateStation(req, res) {
    try{
        const _id = req.params.stationId;
        let station = await Station.findByIdAndUpdate(_id, req.body, {runValidators: true});
        if(!station){
            return res.status(404).send({message: 'station not found'})
        }else{
            res.status(200).send(station)
        }
    }catch(err){
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

async function getStations(req, res) {
    try {
        let stations = await Station.find();
        res.status(200).send(stations);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function postStationBike(req, res) {
    try{
        const bikeId = req.body.bikeId;
        const stationId = req.body.stationId;

        console.log(`bikeID: ${bikeId}, stationID: ${stationId}`);

        let bikeFound = await Bike.findById(bikeId);

        if (!bikeFound) {
            return res.status(404).send({message: 'Bike not found'})
        } else {
            let stationUpdated = await Station.findByIdAndUpdate({_id: stationId}, {$addToSet: {bikes: bikeId}});
            await Bike.findByIdAndUpdate({_id: bikeId}, {$set: {assigned: true}});
            if (!stationUpdated) {
                return res.status(404).send({message: 'Station not found'})
            }
        }

        res.status(200).send({message: "Bike added successfully to the station"})
    } catch(err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(409).send({err: err.message, code: err.code})
        }
        res.status(500).send(err)
    }
}

async function getStationBikeDetail(req, res) {
    try {
        const _id = req.params.stationId;

        let station = await Station.findById(_id).populate('bikes');
        if(!station){
            return res.status(404).send({message: 'Station not found'})
        }else{
            res.status(200).send(station)
        }
    } catch(err) {
        res.status(500).send(err)
    }
}

async function deleteBikeStation(req, res) {
    try {

        let station = await Station.findByIdAndUpdate({_id: req.body.stationId}, {$pull: {bikes: req.body.bikeId}});
        if(!station){
            return res.status(404).send({message: 'station not found'})
        }else{
            await Bike.findByIdAndUpdate({_id: req.body.bikeId}, {$set: {assigned: false}});

            res.status(200).send({message:'station deleted successfully'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
}
module.exports = {
    postStation,
    deleteStation,
    updateStation,
    getStations,
    postStationBike,
    getStationBikeDetail,
    deleteBikeStation
};
