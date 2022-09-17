const router = require("express").Router();
const postController = require("../app/controller/post.controller");

router.post("/addPost", postController.addPost);
router.get("/getAllPosts", postController.showAll);
router.get("/single/:id", postController.single);
router.post("/edit/:id", postController.editPost);
router.delete("/delete/:id", postController.deletePost);

module.exports = router;
