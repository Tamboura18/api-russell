const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email et mot de passe obligatoires"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim()
        }).select("+password");

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

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET absent");
        }

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Connexion réussie",
            token
        });

    } catch (error) {
        console.error("Erreur connexion :", error.message);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const logout = (req, res) => {
    res.json({
        message: "Déconnexion réussie"
    });
};
    
module.exports = { login, logout };