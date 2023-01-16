const express = require("express");
const { uploadBlog, getBlogs } = require("../controllers/uploadController");
// const getBlogs = require("../controllers/uploadController");
const router = express.Router();

router.route("/").post(uploadBlog);
router.route("/getBlogs").post(getBlogs);

module.exports = router;
