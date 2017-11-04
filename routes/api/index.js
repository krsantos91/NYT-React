const router = require("express").Router();
const savedRoutes = require("./saved");

// Book routes
router.use("/saved", savedRoutes);

module.exports = router;
