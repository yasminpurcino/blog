const Post = require("../models/post.model.js");

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Post
  const post = new Post({
    title: req.body.title,
    text: req.body.text,
    date: new Date(),
    userId:req.body.userId
  
  });

  // Save User in the database
  Post.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
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

  Post.updateById(
    req.params.id,
    new Post(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Post with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.findAll = (req, res) => {
  const title = req.query.title;
  Post.findAll(title, (err, data) => {
    if (err) {
         res.status(500).send({
          message:
            err.message || "Some error occurred while finding posts"
        });
      return
    }
    res.send(data);
  }
  );
};


exports.findById = (req, res) => {
  Post.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.id}.`
        });
        return
      }
      res.status(500).send({
        message: "Error updating Post with id " + req.params.id
      });
      return
    }
    res.send(data);
  }
  );
};



exports.deleteOne = (req, res) => {
  Post.deleteOne(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error delete Post with id " + req.params.id
      });

      return
    }
    res.send(data)
  });
};


exports.deleteAll = (req, res) => {
  Post.deleteAll(req.query.title, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error"
      });

      return
    }
    res.send(data)
  })
}






