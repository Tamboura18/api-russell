const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const catwayRoutes = require ("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use("/catways", catwayRoutes);
app.use("/", reservationRoutes);
app.use("/user", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API de port de plaisance"
    });
});

mongoose 
    .connect(process.env.MONGO_URI)
     .then(() => {
         console.log("MongoDB connecté");

         app.listen(PORT, () => {
            console.log("serveur démarrée sur http://localhost:3000");
        });
})
.catch((error) => {
    console.error("Errreur de connexion à MongoDB :",
        error
    );
})
