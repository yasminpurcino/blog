//model define as funcoes e a logica Esta fica apenas esperando a chamada das funções,[7] que permite o acesso para os dados serem coletados, gravados e, exibidos. model que diz COMO FAZER as coisa (ex CRUD)

const sql = require("./db.js");

// constructor
const Post = function (post) {
  this.title= post.title;
  this.text = post.text;
  this.date = post.date;
  this.userId = post.userId;

 
};

Post.create = (newPost, result) => {
  sql.query("INSERT INTO Posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created post: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Post.findById = (id, result) => {
  sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Post with the id
    result({ kind: "not_found" }, null);
  });
};

Post.updateById = (id, post, result) => {
  sql.query(
    "UPDATE posts SET title = ?, text = ?, date = ?, userId = ?  WHERE id = ?",
    [post.title, post.text, post.date, post.userId,  id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};

Post.findById = (id, result) => {
  sql.query(`SELECT * FROM posts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found post:", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null)
  });
};

Post.findAll = (title, result) => {
  let query = "SELECT * FROM posts";

  if (title) {
    query += ` WHERE title LIKE '%${title}'`;

  }

  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);

      return;
    }
    if (res.length) {
      console.log("found post:", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null)
  });
};

Post.deleteOne = (id, result) => {
  sql.query(`DELETE FROM posts WHERE id = ${id}`, (err, res) => {
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

Post.deleteAll = (title, result) => {
  let query = "DELETE FROM Posts";

  if (title) {
    query += ` WHERE title = '${title}'`;

  }

  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null)
      return;
    }
    if (res){
      result(null, res)
      return;
    }
  });
};






module.exports = Post


