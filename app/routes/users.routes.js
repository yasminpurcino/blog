module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // // Retrieve all Users
  router.get("/", users.findAll);

  // // Retrieve all published Users
  // router.get("/published", users.findAllPublished);

  // // Retrieve a single User with id
  router.get("/:id", users.findById);

  // // Update an User with id
  router.put("/:id", users.update);

  // // Delete an User with id
  router.delete("/:id", users.deleteOne);

  // // Delete all Users
  router.delete("/", users.deleteAll);

  app.use('/api/users', router);
};
