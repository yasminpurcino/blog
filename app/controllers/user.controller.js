const redisClient = require("../cache.js");
const User = require("../models/user.model.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create an User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // published: req.body.published || false
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else {
        res.send(data);
        redisClient.clearCache()
      }
    }
  );
};


exports.findAll = (req, res) => {
  const name = req.query.name;
  User.findAll(name, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding users"
      });
      return
    }
    res.send(data);
  }
  );
};


exports.findById = (req, res) => {
  redisClient.getCache()
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
        return
      }
      res.status(500).send({
        message: "Error updating User with id " + req.params.id
      });
      return
    }
    res.send(data);
  }
  );
};



exports.deleteOne = (req, res) => {
  User.deleteOne(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error delete User with id " + req.params.id
      });

      return
    }
    res.send(data)
  });
};


exports.deleteAll = (req, res) => {
  User.deleteAll(req.query.name, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error"
      });

      return
    }
    res.send(data)
  })
}






