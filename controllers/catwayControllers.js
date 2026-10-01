const Catway = require("../models/Catway");

// Récupérer tous les catways 
const getAllCatways = async (req, res) => { 
    try { 
        const catways = await Catway.find();

    res.json(catways);
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
// Récupérer un catway 
const getCatwayById = async (req, res) => { 
    try { 
        const catway = await Catway.findOne({ 
            catwayNumber: req.params.id 
        });

    if (!catway) {
        return res.status(404).json({
            message: "Catway introuvable"
        });
    }

    res.json(catway);
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
// Créer un catway 
const createCatway = async (req, res) => { 
    try { 
        const catway = new Catway(req.body);

        const newCatway = await catway.save();

    res.status(201).json(newCatway);
} catch (error) {
    res.status(400).json({
        message: "Erreur lors de la création du catway"
    });
}
};
// Modifier l'état d'un catway 
const updateCatway = async (req, res) => { 
    try { 
        const catway = await Catway.findOneAndUpdate(
            { catwayNumber: req.params.id }, 
            { catwayState: req.body.catwayState }, 
            { new: true }
        );

    if (!catway) {
        return res.status(404).json({
            message: "Catway introuvable"
        });
    }

    res.json(catway);
} catch (error) {
    res.status(400).json({
        message: "Erreur lors de la modification"
    });
}
};
// Supprimer un catway 
const deleteCatway = async (req, res) => { 
    try { 
        const catway = await Catway.findOneAndDelete(
            { catwayNumber: req.params.id }
        );

    if (!catway) {
        return res.status(404).json({
            message: "Catway introuvable"
        });
    }

    res.json({
        message: "Catway supprimé"
    });
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
module.exports = { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway };