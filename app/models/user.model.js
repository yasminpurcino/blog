//model define as funcoes e a logica Esta fica apenas esperando a chamada das funções,[7] que permite o acesso para os dados serem coletados, gravados e, exibidos. model que diz COMO FAZER as coisa (ex CRUD)

const sql = require("./db.js");

function cacheKey(userId) {
  // Standarize a way to convert the id to a cache-key.
  return "comment-" + userId
}

// constructor
const User = function (user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  // this.published = user.published;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, email = ?, password = ?  WHERE id = ?",
    [user.title, user.email, user.password, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user:", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null)
  });
};

User.findAll = (name, result) => {
  let query = "SELECT * FROM users";

  if (name) {
    query += ` WHERE title LIKE '%${name}'`;

  }

  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error:", err);
      result(err, null);

      return;
    }
    if (res.length) {
      console.log("found user:", res);
      result(null, res);
      return;
    }
    result({ kind: "not_found" }, null)
  });
};

User.deleteOne = (id, result) => {
  sql.query(`DELETE FROM users WHERE id = ${id}`, (err, res) => {
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

User.deleteAll = (name, result) => {
  let query = "DELETE FROM users";

  if (name) {
    query += ` WHERE name = '${name}'`;

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






module.exports = User


