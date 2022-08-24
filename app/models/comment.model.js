//model define as funcoes e a logica Esta fica apenas esperando a chamada das funções,[7] que permite o acesso para os dados serem coletados, gravados e, exibidos. model que diz COMO FAZER as coisa (ex CRUD)

const sql = require("./db.js");

// constructor
const Comment = function (comment) {
  this.postId = comment.postId;
  this.comment = comment.comment;
  this.date = comment.date;
  this.userId = comment.userId;


};

Comment.create = (newComment, result) => {
  sql.query("INSERT INTO Comments SET ?", newComment, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created comment: ", { id: res.insertId, ...newComment });
    result(null, { id: res.insertId, ...newComment });
  });
};

Comment.findById = (id, result) => {
  sql.query(`SELECT * FROM comments WHERE idcomment = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comment: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Post with the id
    result({ kind: "not_found" }, null);
  });
};

Comment.updateById = (id, comment, result) => {
  sql.query(
    "UPDATE comments SET postId = ?, comment = ?, date = ?, userId = ?  WHERE idcomment = ?",
    [comment.postId, comment.comment, comment.date, comment.userId, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Comment with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated comment: ", { id: id, ...comment });
      result(null, { id: id, ...comment });
    }
  );
};

Comment.findById = (id, result) => {
  sql.query(`SELECT * FROM comments WHERE idcomment = ${id}`, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found comment:", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null)
  });
};

Comment.findAll = (comment, result) => {
  let query = "SELECT * FROM Comments";

  if (comment) {
    query += ` WHERE title LIKE '%${comment}'`;

  }

  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);

      return;
    }
    if (res.length) {
      console.log("found comment:", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null)
  });
};

Comment.deleteOne = (id, result) => {
  sql.query(`DELETE FROM comments WHERE idcomment = ${id}`, (err, res) => {
    console.log(res)
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("delete:", res);
      result(null, res);
      return;
    }
    result({ kind: "not_delete" }, null)
  });
};

Comment.deleteAll = (comment, result) => {
  let query = "DELETE FROM comments";

  if (comment) {
    query += ` WHERE comment = '${comment}'`;

  }

  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null)
      return;
    }
    if (res) {
      result(null, res)
      return;
    }
  });
};






module.exports = Comment


