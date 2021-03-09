const express = require("express");
const { requireSignin, adminMiddleWare } = require("../controllers/auth");
const { create, list, listAllBlogsCategoriesTags, read, update, remove, photo ,listRelated} = require("../controllers/blog");
const router = express.Router();
router.post("/blog", requireSignin, adminMiddleWare, create);
router.get('/blogs',list)
router.post('/blog-categories-tags',listAllBlogsCategoriesTags)
router.get('/blog/:slug',read)
router.delete('/blog/:slug',requireSignin,adminMiddleWare,remove)
router.put('/blog/:slug',requireSignin,adminMiddleWare,update)
router.get('/blog/photo/:slug',photo)
router.post('/blogs/related',listRelated)
module.exports = router;
