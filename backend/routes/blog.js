const express = require("express");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");
const { create } = require("../controllers/blog");
const router = express.Router();
router.post("/blog", requireSignin, adminMiddleWare, create);
module.exports = router;
