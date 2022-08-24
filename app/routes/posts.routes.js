module.exports = app => {
  const posts = require("../controllers/post.controller.js");

  var router = require("express").Router();

  // Create a new Post
  router.post("/", posts.create);

  // // Retrieve all Post
  router.get("/", posts.findAll);


  // // Retrieve a single Post with id
  router.get("/:id", posts.findById);

  // // Update an Post with id
  router.put("/:id", posts.update);

  // // Delete an Post with id
  router.delete("/:id", posts.deleteOne);

  // // Delete all Post
  router.delete("/", posts.deleteAll);

  app.use('/api/posts', router);
};
