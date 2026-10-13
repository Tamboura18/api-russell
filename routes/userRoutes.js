const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userControllers");

const { validateUser } = require("../middlewares/userMiddlewares");

const { verifyToken } = require("../middlewares/authMiddlewares")

// GET tous les utilisateurs
router.get("/", verifyToken, getAllUsers);

// GET un utilisateur
router.get("/:email", verifyToken, getUserByEmail);

// POST créer un utilisateur
router.post("/", validateUser, createUser);

// PUT modifier un utilisateur
router.put("/:email", verifyToken, validateUser, updateUser);

// DELETE supprimer un utilisateur
router.delete("/:email", verifyToken, deleteUser);

module.exports = router;