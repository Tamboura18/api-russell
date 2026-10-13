const userService = require("../services/userService");
/**
*Récupère tous les utilisateurs sans leurs mots de passe.
*@async
*@param {Object} req - La requête HTTP Express.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} La liste des utilisateurs au format JSON. */ 

const getAllUsers = async (req, res) => { 
    try { 
        const users = await userService.getAllUsers(); res.json(users); 
    } catch (error) { res.status(500).json({
         message: "Erreur serveur" }); 
        } 
    };
/**
*Recherche un utilisateur à partir de son adresse email.
*@async
*@param {Object} req - La requête contenant l'email dans l'URL.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} L'utilisateur trouvé ou une erreur HTTP. */

const getUserByEmail = async (req, res) => {
    try { 
        const user = await userService.getUserByEmail(req.params.email);

 if (!user) {
     return res.status(404).json({
         message: "Utilisateur introuvable"
     });
 }

 res.json(user);
} catch (error) { res.status(500).json({ 
    message: "Erreur serveur" }); 
} 
};
/**
*Crée un utilisateur à partir des données reçues.
*@async
*@param {Object} req - La requête contenant les informations du nouvel utilisateur.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Les informations publiques de l'utilisateur créé. */ 

const createUser = async (req, res) => { 
    try { 
        if (!req.body.password) { 
            return res.status(400).json({ 
                message: "Le mot de passe est obligatoire" });
            }

 const user = await userService.createUser(req.body);

 res.status(201).json({
     username: user.username,
     email: user.email
 });
} catch (error) { console.error("Erreur création utilisateur :", error); 
    res.status(400).json({ message: "Erreur lors de la création" }); 
} 
};

/**
*Modifie les informations d'un utilisateur identifié par son email.
*@async
*@param {Object} req - La requête contenant l'email et les données à modifier.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} L'utilisateur modifié ou une erreur HTTP. */ 
const updateUser = async (req, res) => { 
    try { 
        const user = await userService.updateUser( 
            req.params.email, req.body );

 if (!user) {
     return res.status(404).json({
         message: "Utilisateur introuvable"
     });
 }

 res.json(user);
} catch (error) { res.status(400).json({ 
    message: "Erreur lors de la modification" }); 
} 
};

/**
*Supprime un utilisateur identifié par son email.
*@async
*@param {Object} req - La requête contenant l'email de l'utilisateur.
*@param {Object} res - La réponse HTTP Express.
*@returns {Promise<void>} Un message de confirmation ou une erreur HTTP. */

const deleteUser = async (req, res) => { 
    try { 
        const user = await userService.deleteUser(req.params.email);

 if (!user) {
     return res.status(404).json({
         message: "Utilisateur introuvable"
     });
 }

 res.json({
     message: "Utilisateur supprimé"
 });
} catch (error) {
     res.status(500).json({ 
        message: "Erreur serveur" }); 
    } 
};

module.exports = { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser };