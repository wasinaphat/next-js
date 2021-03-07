const express = require("express");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");
const { create } = require("../controllers/blog");
const router = express.Router();
router.post("/blogs", requireSignin, adminMiddleWare, create);
module.exports = router;
