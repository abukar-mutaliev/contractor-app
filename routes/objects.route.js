const { Router } = require("express");
const router = Router();
const { objectController } = require("../controllers/objects.controller");

router.get("/home", objectController.getObject);

router.post("/admin/object", objectController.postObject);

router.delete("/admin/object/:id", objectController.deleteObject);

module.exports = router;
