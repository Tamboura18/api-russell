const validateCatway = (req, res, next) => { 
    const { catwayNumber, catwayType, catwayState } = req.body || {};

    console.log(req.body);

if (
    catwayNumber === undefined ||
    !catwayType ||
    !catwayState
) {
    return res.status(400).json({
        message: "Tous les champs du catway sont obligatoires"
    });
}

if (!["long", "short"].includes(catwayType)) {
    return res.status(400).json({
        message: "Le type doit être long ou short"
    });
}

next();
};
module.exports = { validateCatway };