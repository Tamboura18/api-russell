const express = require("express");
const connectDatabase = require("./config/database");
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
app.use("/users", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API de port de plaisance"
    });
});

connectDatabase() 
.then(() => { 
    app.listen(PORT, () => { 
        console.log(`Serveur démarré sur http://localhost:${PORT}`); }); 
            
        }) .catch((error) => { 
            console.error("Impossible de démarrer le serveur :", error); 
        });