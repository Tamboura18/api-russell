const Reservation = require("../models/Reservation");

// Récupérer les réservations d'un catway 
const getReservationsByCatway = async (req, res) => { 
    try { 
        const reservations = await Reservation.find(
            { catwayNumber: req.params.id }
        );

    res.json(reservations);
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
// Récupérer une réservation 
const getReservationById = async (req, res) => { 
    try { 
        const reservation = await Reservation.findOne({ 
            _id: req.params.idReservation, 
            catwayNumber: req.params.id 
        });

    if (!reservation) {
        return res.status(404).json({
            message: "Réservation introuvable"
        });
    }

    res.json(reservation);
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
// Créer une réservation 
const createReservation = async (req, res) => { 
    try { 
        const reservation = new Reservation({ 
            ...req.body, 
            catwayNumber: req.params.id 
        });

    const newReservation = await reservation.save();

    res.status(201).json(newReservation);
} catch (error) {
    console.log(error);
    res.status(400).json({
        message: "Erreur lors de la création",
        error: error.message
    });
}
};
// Modifier une réservation 
const updateReservation = async (req, res) => { 
    try { 
        const reservation = await Reservation.findOneAndUpdate( {
            _id: req.params.idReservation, 
            catwayNumber: req.params.id }, 
            req.body, 
            { new: true } 
        );

    if (!reservation) {
        return res.status(404).json({
            message: "Réservation introuvable"
        });
    }

    res.json(reservation);
} catch (error) {
    res.status(400).json({
        message: "Erreur lors de la modification"
    });
}
};
// Supprimer une réservation 
const deleteReservation = async (req, res) => { 
    try { 
        const reservation = await Reservation.findOneAndDelete({ 
            _id: req.params.idReservation, 
            catwayNumber: req.params.id 
        });

    if (!reservation) {
        return res.status(404).json({
            message: "Réservation introuvable"
        });
    }

    res.json({
        message: "Réservation supprimée"
    });
} catch (error) {
    console.error("Erreur suppresion réservation:", error);
    res.status(500).json({
        message: error.message
    });
}
};
module.exports = { getReservationsByCatway, getReservationById, createReservation, updateReservation, deleteReservation };