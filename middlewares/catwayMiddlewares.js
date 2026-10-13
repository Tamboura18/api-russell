const validateCatway = (req, res, next) => {
const { catwayNumber, catwayType, catwayState } = req.body || {};
if (
    catwayNumber === undefined ||
    catwayNumber === null ||
    String(catwayNumber).trim() === "" ||
    !["long", "short"].includes(catwayType) ||
    typeof catwayState !== "string" ||
    catwayState.trim() === ""
) {
    return res.status(400).json({
        message: "Numéro, type et état du catway sont obligatoires. Le type doit être long ou short."
    });
}

next();
};
module.exports = { validateCatway };