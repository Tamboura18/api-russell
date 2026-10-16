require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const email = "admin@russell.fr";
        const password = "ChangeMoi123!";
        const username = "admin";

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("Ce compte existe déjà.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log("Compte administrateur créé.");
    } catch (error) {
        console.error("Erreur :", error.message);
    } finally {
        await mongoose.disconnect();
    }
}

createAdmin();