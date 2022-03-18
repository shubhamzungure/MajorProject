const db = require('../../databaseConfig');

getAllUsers = (req, res) => {
  const sqlInsert = `select * from users`;

  db.query(sqlInsert, (err, result) => {
    if (err) {
      res.send({ error: err });
    }
    if (result.length > 0) {
      //result is an array
      // delete result[0].password; //removing password property
      res.send({ data: result });
      console.log("All the Users");
    } else {
      res.send({ message: "Wrong" });
    }
  });
};


postUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = "user";

  const sqlInsert = "insert into users(name,email,role,password)values(?,?,?,?);";
  db.query(sqlInsert, [name, email, role, password], (err, result) => {
    if (err) {
      // throw err;

      if (
        err.code.includes("ER_DUP_ENTRY") &&
        err.sqlMessage.includes("name")
      ) {
        res.send({ error: "username already exists" });
        console.log(err.code);
        console.log(err.sqlMessage);
      }else if (
        err.code.includes("ER_DUP_ENTRY") &&
        err.sqlMessage.includes("email")
      ) {
        res.send({ error: "email already exists" });
        console.log(err.code);
        console.log(err.sqlMessage);
      }else if (
        err.code.includes("ER_DUP_ENTRY") &&
        err.sqlMessage.includes("password")
      ) {
        res.send({ error: "password already exists" });
        console.log(err.code);
        console.log(err.sqlMessage);
      } else {
        res.send({ error: err });
        // res.send({ message: "existing" }); // Vikrant
        // throw err;
      }

      // throw err;
    } else {
      res.send({ message: "User added successfully" });
    }
  });
};


module.exports = { postUser, getAllUsers };
