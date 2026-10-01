const validateUser = (req, res, next) => { 
    const { username, email, password } = req.body;
    
if (!username || !email || !password) {
    return res.status(400).json({
        message: "Tous les champs sont obligatoires"
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