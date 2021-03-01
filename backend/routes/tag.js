const express = require("express");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");
const { create, list, read, remove } = require("../controllers/tag");
const { runValidation } = require("../validators");
const { createTagValidator } = require("../validators/tag");

const router = express.Router();
router.post(
  "/tag",
  createTagValidator,
  runValidation,
  requireSignin,
  adminMiddleWare,
  create
);
router.get("/tags", list);
router.get("/tag/:slug", read);
router.delete("/tag/:slug", requireSignin, adminMiddleWare, remove);

module.exports = router;
