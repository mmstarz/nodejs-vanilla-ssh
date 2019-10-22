const express = require("express");
const mainController = require("../controllers/mainController");

const router = express.Router();

router.get("/", mainController.index);

router.get("/help", mainController.help);

router.get("/about", mainController.about);

router.get("/weather", mainController.weather);

router.get("/products", mainController.products);

// unneccessary
router.get("/help/*", mainController.help404);

// 404
router.get("*", mainController.pnf);

module.exports = router;
