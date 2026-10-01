const express = require("express");
const router = express.Router();

const {
    getReservationsByCatway,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation
} = require("../controllers/reservationControllers");

const { validateReservation } = require("../middlewares/reservationMiddlewares");

const { verifyToken } = require ("../middlewares/authMiddlewares"); 

router.get("/catways/:id/reservations", verifyToken, getReservationsByCatway
);

router.get( "/catways/:id/reservations/:idReservation", verifyToken, getReservationById);

router.post("/catways/:id/reservations",verifyToken, validateReservation, createReservation);

router.put("/catways/:id/reservations/:idReservation", verifyToken, validateReservation , updateReservation);

router.delete("/catways/:id/reservations/:idReservation", verifyToken, deleteReservation);

module.exports = router;