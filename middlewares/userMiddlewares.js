const validateUser = (req, res, next) => { 
    const { username, email, password } = req.body || {};
    
    if (
    typeof username !== "string" || !username.trim() ||
    typeof email !== "string"|| !email.trim() ||
    typeof password !== "string" || !password
) {
    return res.status(400).json({
        message: "Tous les champs sont obligatoires"
    });
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
        message: "Adresse email invalide"
    });
}

if (password.length < 6) {
    return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 6 caractères"
    });
}

next();
};
module.exports = { validateUser };