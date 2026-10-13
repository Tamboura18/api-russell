const Reservation = require("../models/Reservation");
/**
*Récupère toutes les réservations enregistrées dans la base de données.
*@async
*@returns {Promise<Array>} La liste des réservations. */ 

const getAllReservations = async () => { 
    return await Reservation.find(); 
};
/**
*Récupère toutes les réservations associées à un catway.
*@async
*@param {number} catwayNumber - Le numéro du catway.
*@returns {Promise<Array>} La liste des réservations du catway. */ 

const getReservationsByCatway = async (catwayNumber) => { 
    return await Reservation.find({ catwayNumber }); 
};
/**
*Recherche une réservation précise pour un catway donné.
*@async
*@param {number} catwayNumber - Le numéro du catway.
*@param {string} idReservation - L'identifiant de la réservation.
*@returns {Promise<Object|null>} La réservation trouvée ou null. */ 

const getReservationById = async (catwayNumber, idReservation) => { 
    return await Reservation.findOne({ 
        catwayNumber, _id: idReservation }); 
    };
/**
*Crée une nouvelle réservation.
*@async
*@param {Object} data - Les données de la réservation.
*@returns {Promise<Object>} La réservation créée. */ 

const createReservation = async (data) => { 
    const reservation = new Reservation(data); 
    return await reservation.save(); };
/**
*Modifie une réservation appartenant à un catway donné.
*@async
*@param {number} catwayNumber - Le numéro du catway.
*@param {string} idReservation - L'identifiant de la réservation.
*@param {Object} data - Les données à mettre à jour.
*@returns {Promise<Object|null>} La réservation modifiée ou null. */ 

const updateReservation = async (catwayNumber, idReservation, data) => { 
    return await Reservation.findOneAndUpdate( { 
        catwayNumber, _id: idReservation }, data, 
        { new: true, 
        runValidators: true } 
    ); 
};
/**
*Supprime une réservation appartenant à un catway donné.
*@async
*@param {number} catwayNumber - Le numéro du catway.
*@param {string} idReservation - L'identifiant de la réservation.
*@returns {Promise<Object|null>} La réservation supprimée ou null. */ 
const deleteReservation = async (catwayNumber, idReservation) => { 
    
    return await Reservation.findOneAndDelete({ 
        catwayNumber, _id: idReservation }); 
    };
    
module.exports = { getAllReservations, getReservationsByCatway, getReservationById, createReservation, updateReservation, deleteReservation };