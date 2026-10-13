const Catway = require("../models/catway");
/**
Récupère tous les catways enregistrés dans la base de données.
*@async
*@returns {Promise<Array>} La liste des catways. 
*/ 
const getAllCatways = async () => { 
    return await Catway.find(); };
/**
*Récupère un catway à partir de son numéro.
*@async
*@param {number} catwayNumber - Le numéro du catway recherché.
@returns {Promise<Object|null>} Le catway trouvé ou null s'il n'existe pas. */ 

const getCatwayById = async (catwayNumber) => { 
    return await Catway.findOne({ catwayNumber }); 
};
/**
*Crée un nouveau catway dans la base de données.
*@async
*@param {Object} catwayData - Les données du catway à créer.
*@returns {Promise<Object>} Le catway créé. */ 

const createCatway = async (catwayData) => { 
    const catway = new Catway(catwayData); 
    return await catway.save(); 
};

/**
*Modifie l'état d'un catway identifié par son numéro.
*@async
*@param {number} catwayNumber - Le numéro du catway à modifier.
*@param {string} catwayState - Le nouvel état du catway.
*@returns {Promise<Object|null>} Le catway modifié ou null s'il n'existe pas. */ 

const updateCatway = async (catwayNumber, catwayState) => { 
    return await Catway.findOneAndUpdate( { 
        catwayNumber }, { 
        catwayState }, 
        { new: true, 
        runValidators: true } 
            ); 
        };
/**
*Supprime un catway à partir de son numéro.
*@async
*@param {number} catwayNumber - Le numéro du catway à supprimer.
*@returns {Promise<Object|null>} Le catway supprimé ou null s'il n'existe pas. */ 

const deleteCatway = async (catwayNumber) => { 
    return await Catway.findOneAndDelete({ 
        catwayNumber }); 
    };
    
module.exports = { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway };