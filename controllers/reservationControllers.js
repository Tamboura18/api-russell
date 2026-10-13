const reservationService = require("../services/reservationService");
/**
*Récupère toutes les réservations d'un catway.
*@async
*@param {Object} req - La requête HTTP contenant le numéro du catway.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Les réservations au format JSON ou une erreur HTTP. */ 

const getReservationsByCatway = async (req, res) => { 
    try { 
        const reservations = await reservationService.getReservationsByCatway( 
        req.params.id ); 
    res.json(reservations); 
} catch (error) { res.status(500).json({ 
        message: "Erreur serveur" }); 
    } 
};

/**
*Récupère une réservation précise d'un catway.
*@async
*@param {Object} req - La requête contenant les identifiants du catway et de la réservation.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} La réservation trouvée ou une erreur HTTP. */ 
const getReservationById = async (req, res) => { 
    try { 
        const reservation = await reservationService.getReservationById( 
            req.params.id, req.params.idReservation );

 if (!reservation) {
     return res.status(404).json({
         message: "Réservation introuvable"
     });
 }

 res.json(reservation);
} catch (error) { res.status(500).json({ 
    message: "Erreur serveur" }); 
} 
};

/**
*Crée une réservation associée au catway indiqué dans l'URL.
*@async
*@param {Object} req - La requête contenant les données de la réservation.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} La réservation créée ou une erreur HTTP. */ 

const createReservation = async (req, res) => { 
    try { 
        const reservation = await reservationService.createReservation({ 
            ...req.body, catwayNumber: req.params.id });
            res.status(201).json(reservation);

} catch (error) { 
    console.error("Erreur création réservation :", error); 
    res.status(400).json({ 
        message: "Erreur lors de la création de la réservation" }); 
    } 
};
/**
*Modifie une réservation existante.
*@async
*@param {Object} req - La requête contenant les identifiants et les données à modifier.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} La réservation modifiée ou une erreur HTTP. */ 

const updateReservation = async (req, res) => { 
    try { 
        const reservation = await reservationService.updateReservation( 
            req.params.id, req.params.idReservation, req.body );

 if (!reservation) {
     return res.status(404).json({
         message: "Réservation introuvable"
     });
 }

 res.json(reservation);
} catch (error) { res.status(400).json({ 
    message: "Erreur lors de la modification" }); 
} 
};

/**
*Supprime une réservation associée à un catway.
*@async
*@param {Object} req - La requête contenant les identifiants du catway et de la réservation.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Un message de confirmation ou une erreur HTTP. */ 

const deleteReservation = async (req, res) => { 
    try { 
        const reservation = await reservationService.deleteReservation( 
            req.params.id, req.params.idReservation );

 if (!reservation) {
     return res.status(404).json({
         message: "Réservation introuvable"
     });
 }

 res.json({
     message: "Réservation supprimée"
 });
} catch (error) { 
    console.error("Erreur suppression réservation :", error); 
    res.status(500).json({ message: "Erreur serveur" }); 
} 
};

module.exports = { getReservationsByCatway, getReservationById, createReservation, updateReservation, deleteReservation };