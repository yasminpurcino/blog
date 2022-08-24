//model define as funcoes e a logica Esta fica apenas esperando a chamada das funções,[7] que permite o acesso para os dados serem coletados, gravados e, exibidos. model que diz COMO FAZER as coisa (ex CRUD)

const sql = require("./db.js");
const cacheClient = require("../cache.js");

function cacheKey(commentId) {
  // Standarize a way to convert the id to a cache-key.
  return "comment-" + commentId
}

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

    let id = res.insertId;

    console.log("created comment: ", { id: idd, ...newComment });
    result(null, { id: id, ...newComment });

    // No need to do anything redis here, it will be a cache miss when someone
    // tries to get a comment that does not exist in redis, and will be added.

    // One could argue that pre-populating the cache could speedup things, but
    // I prefer only adding things that are used in cache (ex: active requests)
  });
};

Comment.findById = (id, result) => {
  // First search in the cache since it's faster
  var comment = cacheClient.get(cacheKey(id))
  if (comment != undefined) {
    // Found in cache, returning it
    result(null, comment)
    return
  }
  // Couldn't find in cache, let's search in the DB
  sql.query(`SELECT * FROM comments WHERE idcomment = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      let comment = res[0];
      console.log("found comment: ", comment);
      // Let's add it to the cache
      cacheClient.setCache(cacheKey(id), comment)
      result(null, comment);
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
      // There was an update here.  Let's invalidate the cache
      cacheClient.setCache(cacheKey(id), undefined)
      result(null, { id: id, ...comment });
    }
  );
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
      // Remove from cache to avoid the cache showing
      // deleted comments.
      cacheClient.setCache(cacheKey(id), undefined);
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
      // All comments records where deleted.
      // Let's clear the cache.
      cacheClient.clearCache();
      result(null, res)
      return;
    }
  });
};






module.exports = Comment


