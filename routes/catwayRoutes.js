const express = require("express");
const router = express.Router();

const {
    getAllCatways,
    getCatwayById,
    createCatway,
    updateCatway,
    deleteCatway
} = require("../controllers/catwayControllers");

const { validateCatway } = require("../middlewares/catwayMiddlewares");
const { verifyToken } = require("../middlewares/authMiddlewares");

// GET tous les catways
router.get("/", verifyToken, getAllCatways);

// GET un catway
router.get("/:id", verifyToken, getCatwayById);

// POST créer un catway
router.post("/", verifyToken, validateCatway, createCatway);

// PUT modifier un catway
router.put("/:id", verifyToken, updateCatway);

// DELETE supprimer un catway
router.delete("/:id", verifyToken, deleteCatway);


module.exports = router;