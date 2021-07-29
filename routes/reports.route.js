const { Router } = require("express");
const router = Router();
const { reportControllers } = require("../controllers/reports.controller");

router.get("/object/:id/report", reportControllers.getReportsObject);

router.post("/object/:id/report", reportControllers.postReport);

router.patch("/object/:id/report", reportControllers.patchReport);

module.exports = router;
