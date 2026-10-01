const User = require("../models/User"); 

const bcrypt = require("bcryptjs"); 

const jwt = require("jsonwebtoken");

const login = async (req, res) => { 
    try { 
        const { email, password } = req.body;
        
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Email ou mot de passe incorrect"
        });
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordCorrect) {
        return res.status(401).json({
            message: "Email ou mot de passe incorrect"
        });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Connexion réussie",
        token
    });

} catch (error) {
    res.status(500).json({
        message: "Erreur serveur"
    });
}
};

const logout = (req, res) => {
     res.json({
          message: "Déconexion réussie"
      });
    };
    
module.exports = { login, logout };