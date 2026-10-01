const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Récupérer tous les utilisateurs 
const getAllUsers = async (req, res) => { 
    try { 
        const users = await User.find().select("-password");

    res.json(users);
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
// Récupérer un utilisateur 
const getUserByEmail = async (req, res) => { 
    try { 
        const user = await User.findOne({ 
            email: req.params.email }).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }

    res.json(user);
} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};
// Créer un utilisateur 
const createUser = async (req, res) => { 
    try { 
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = new User({
            ...req.body,
            password: hashedPassword
        });

        const newUser = await user.save();

    res.status(201).json({
        username: newUser.username,
        email: newUser.email
    });
} catch (error) {
    console.error(error);

    res.status(400).json({
        message: "Erreur lors de la création",
        error: error.message
    });
}
};
// Modifier un utilisateur 
const updateUser = async (req, res) => { 
    try { 
        const { username, password } = req.body;

        const updates = {
            username
        };
        if (password) {
            updates.password = await bcrypt.hash(password, 10);
        }
        const user = await User.findOneAndUpdate( { 
            email: req.params.email }, 
            updates,
            { new: true }
        ).select("-password");
           
    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }

    res.json(user);
} catch (error) {
    res.status(400).json({
        message: "Erreur lors de la modification"
    });
}
};
// Supprimer un utilisateur 
const deleteUser = async (req, res) => { 
    try { 
        const user = await User.findOneAndDelete({ 
            email: req.params.email 
        });
        
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
        message: "Erreur serveur"
    });
}
};
module.exports = { getAllUsers, getUserByEmail, createUser, updateUser, deleteUser };