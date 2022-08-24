const Comment = require("../models/comment.model.js");

// Create and Save a new Comment
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Comment
  const comment = new Comment({
    postId: req.body.postId,
    comment: req.body.comment,
    date: new Date(),
    userId:req.body.userId
  
  });

  // Save Comment in the database
  Comment.create(comment, (err, data) => {
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

  Comment.updateById(
    req.params.id,
    new Comment(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Comment with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Comment with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


exports.findAll = (req, res) => {
  const comment = req.query.comment;
  Comment.findAll(comment, (err, data) => {
    if (err) {
         res.status(500).send({
          message:
            err.message || "Some error occurred while finding comments"
        });
      return
    }
    res.send(data);
  }
  );
};


exports.findById = (req, res) => {
  Comment.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Comment with id ${req.params.id}.`
        });
        return
      }
      res.status(500).send({
        message: "Error updating Comment with id " + req.params.id
      });
      return
    }
    res.send(data);
  }
  );
};



exports.deleteOne = (req, res) => {
  Comment.deleteOne(req.params.id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error delete Comment with id " + req.params.id
      });

      return
    }
    res.send(data)
  });
};


exports.deleteAll = (req, res) => {
  Comment.deleteAll(req.query.comment, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error"
      });

      return
    }
    res.send(data)
  })
}






