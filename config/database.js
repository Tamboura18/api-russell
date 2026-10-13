const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connecté");
    } catch (error) {
        console.error("Erreur de connexion à MongoDB :", error);
        throw error;
    }
};

module.exports = connectDatabase;