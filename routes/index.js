const { Router } = require("express");
const router = Router();

router.use("/api/", require("./statuses.route"));
router.use("/api/", require("./objects.route"));
router.use("/api/", require("./reports.route"));

module.exports = router;
