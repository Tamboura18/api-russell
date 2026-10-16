const User = require("../models/User"); 
const bcrypt = require("bcryptjs");
/**
*Récupère tous les utilisateurs sans leurs mots de passe.
*@async
*@returns {Promise<Array>} La liste des utilisateurs. */ 

const getAllUsers = async () => {
     return await User.find().select("-password"); };
/**
*Recherche un utilisateur par son adresse email, sans son mot de passe.
*@async
*@param {string} email - L'adresse email de l'utilisateur.
*@returns {Promise<Object|null>} L'utilisateur trouvé ou null. */ 
const getUserByEmail = async (email) => { 
    return await User.findOne({ 
        email }).select("-password"); 
    };
/**
*Recherche un utilisateur par email en incluant son mot de passe haché.
*Utilisé pour vérifier les identifiants lors de la connexion.
*@async
*@param {string} email - L'adresse email de l'utilisateur.
*@returns {Promise<Object|null>} L'utilisateur trouvé ou null. */ 

const getUserForLogin = async (email) => { 
    return await User.findOne({
         email }).select("+password"); 
        };
/**
*Crée un utilisateur en hachant son mot de passe avant l'enregistrement.
*@async
*@param {Object} data - Les données du nouvel utilisateur.
*@returns {Promise<Object>} L'utilisateur créé. */ 

const createUser = async (data) => { 
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new User({ ...data, password: hashedPassword });
    return await user.save(); 
};

/**
*Modifie les informations d'un utilisateur identifié par son email.
*Le mot de passe est haché s'il est fourni.
*@async
*@param {string} email - L'adresse email actuelle de l'utilisateur.
*@param {Object} data - Les informations à modifier.
*@returns {Promise<Object|null>} L'utilisateur modifié ou null. */ 

const updateUser = async (email, data) => { 
    const updates = {};

if (data.username !== undefined) {
     updates.username = data.username;
    }

if (data.password) { 
    updates.password = await bcrypt.hash(data.password, 10); 
}
return await 
     User.findOneAndUpdate( {
     email }, updates, { 
    new: true, 
    runValidators: true } )
    .select("-password"); 
};
/**
*Supprime un utilisateur identifié par son email.
*@async
*@param {string} email - L'adresse email de l'utilisateur à supprimer.
*@returns {Promise<Object|null>} L'utilisateur supprimé ou null. */ 

const deleteUser = async (email) => { 
    return await User.findOneAndDelete({ 
        email });
    };

module.exports = { getAllUsers, getUserByEmail, getUserForLogin, createUser, updateUser, deleteUser };