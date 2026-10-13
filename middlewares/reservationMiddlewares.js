const validateReservation = (req, res, next) => {
const { clientName, boatName, startDate, endDate } = req.body || {};
if (
    typeof clientName !== "string" ||
    !clientName.trim() ||
    typeof boatName !== "string" ||
    !boatName.trim() ||
    !startDate ||
    !endDate
) {
    return res.status(400).json({
        message: "Tous les champs de la réservation sont obligatoires"
    });
}

const debut = new Date(startDate);
const fin = new Date(endDate);

if (
    Number.isNaN(debut.getTime()) ||
    Number.isNaN(fin.getTime()) ||
    debut >= fin
) {
    return res.status(400).json({
        message: "Les dates sont invalides ou la date de fin doit être après la date de début"
    });
}

next();
};
module.exports = { validateReservation };