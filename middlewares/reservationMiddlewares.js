const validateReservation = (req, res, next) => { 
    const { clientName, boatName, startDate, endDate } = req.body;
    
if (
    !clientName ||
    !boatName ||
    !startDate ||
    !endDate
) {
    return res.status(400).json({
        message: "Tous les champs de la réservation sont obligatoires"
    });
}

if (new Date(startDate) >= new Date(endDate)) {
    return res.status(400).json({
        message: "La date de fin doit être après la date de début"
    });
}

next();
};
module.exports = { validateReservation };