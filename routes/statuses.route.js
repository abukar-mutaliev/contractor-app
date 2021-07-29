const { Router } = require("express");
const router = Router();
const { statusControllers } = require("../controllers/statuses.controller");

router.get("/statuses", statusControllers.getStatus);

router.post("/admin/status", statusControllers.postStatus);

module.exports = router;
