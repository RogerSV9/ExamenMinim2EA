'use strict';

const Station = require('../models/station');
const Bike = require('../models/bike');

async function postBike(req, res) {
    const bike = new Bike(req.body);

    console.log(bike);

    try {
        await bike.save();
        res.status(200).send({message: "Bike created successfully"})
    } catch (err) {
        res.status(500).send(err);
        console.log(err);
    }
}

async function getBikes(req, res) {
    try {
        let bikes = await Bike.find();
        res.status(200).send(bikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function getUnassignedBikes(req, res) {
    try {
        let bikes = await Bike.find({assigned: false});
        res.status(200).send(bikes);
    } catch(err) {
        res.status(500).send(err)
    }
}

async function getBikeDetail(req, res) {
    try {
        const _id = req.params.bikeId;

        let bike = await Bike.findById(_id).populate('stations', 'name');
        if(!bike){
            return res.status(404).send({message: 'Bike not found'})
        }else{
            res.status(200).send(bike)
        }
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
            let bikeUpdated = await Bike.findByIdAndUpdate({_id: bikeId}, {$set: {assigned: true}});
            if (!stationUpdated) {
                return res.status(404).send({message: 'Station not found'})
            }
            if (!bikeUpdated) {
                return res.status(404).send({message: 'Bike not found'})
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

async function deleteBike(req, res) {
    try{
        const _id = req.params.bikeId;
        let bike = await Bike.findByIdAndRemove(_id);
        if(!bike){
            return res.status(404).send({message: 'Bike not found'})
        }else{
            res.status(200).send({message:'Bike deleted successfully'})
        }
    }catch(err){
        res.status(500).send(err)
    }
}


module.exports = {
    postBike,
    getBikes,
    getBikeDetail,
    postStationBike,
    deleteBike,
    getUnassignedBikes
};
