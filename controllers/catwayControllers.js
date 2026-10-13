const catwayService = require("../services/catwayService");

/**
*Récupère tous les catways.
*@async
*@param {Object} req - La requête HTTP Express.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} La liste des catways au format JSON. */ 

const getAllCatways = async (req, res) => { try { 
    const catways = await 
    catwayService.getAllCatways(); 
    res.json(catways); } catch (error) { 
        res.status(500).json({ 
            message: "Erreur serveur" }); 
        } 
    };

/**
*Récupère un catway à partir de son identifiant de route.
*@async
*@param {Object} req - La requête HTTP contenant l'identifiant.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Le catway trouvé ou une erreur 404 ou 500. */ 

const getCatwayById = async (req, res) => { 
    try { 
        const catway = await catwayService.getCatwayById(req.params.id);

 if (!catway) {
     return res.status(404).json({
         message: "Catway introuvable"
     });
 }

 res.json(catway);
} catch (error) { 
    res.status(500).json({ 
        message: "Erreur serveur" }); 
    } 
};

/**
*Crée un nouveau catway à partir des données reçues.
*@async
*@param {Object} req - La requête contenant les données du catway.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Le catway créé ou une erreur HTTP. */ 

const createCatway = async (req, res) => { try { 
    const catway = await catwayService.createCatway(req.body); 
    
    res.status(201).json(catway); 
  } catch (error) { 
    res.status(400).json({ 
        message: "Erreur lors de la création du catway" }); 
    } 
};

/**
*Modifie l'état d'un catway.
*@async
*@param {Object} req - La requête contenant l'identifiant et le nouvel état.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Le catway modifié ou une erreur HTTP. */

const updateCatway = async (req, res) => { try { 
    const catway = await catwayService.updateCatway( 
        req.params.id, req.body.catwayState 
    );

 if (!catway) {
     return res.status(404).json({
         message: "Catway introuvable"
     });
 }

 res.json(catway);
} catch (error) { res.status(400).json({ 
    message: "Erreur lors de la modification" }); 
} 
};

/**
*Supprime un catway à partir de son identifiant.
*@async
*@param {Object} req - La requête HTTP contenant l'identifiant.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Un message de confirmation ou une erreur HTTP. */ 

const deleteCatway = async (req, res) => { 
    try { 
        const catway = await catwayService.deleteCatway(req.params.id);
 if (!catway) {
     return res.status(404).json({
         message: "Catway introuvable"
     });
 }

 res.json({
     message: "Catway supprimé"
 });
} catch (error) { res.status(500).json({ 
    message: "Erreur serveur" }); 
} 
};

module.exports = { getAllCatways, getCatwayById, createCatway, updateCatway, deleteCatway };