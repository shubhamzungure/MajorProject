const db = require("../../databaseConfig");

loginUser = (req, res) => {
  //   const email = req.body.username.trim();
  //   const phone = req.body.username.trim();
  //   const password = req.body.password.trim();

  const email = req.body.email;
  const password = req.body.password;

  //   const sqlInsert =
  //     "select * from users where (email=(?) or phone=(?) )and password=(?);";

  const sqlInsert = "select * from users where email=(?) and password=(?);";

  db.query(sqlInsert, [email, password], (err, result) => {
    if (err) {
      res.send({ error: err });
    }
    if (result.length > 0) {
      //result is an array
      delete result[0].password; //removing password property
      res.send({ message: result });
    } else {
      res.send({ message: "invalid combination of credentials" }); // this line is used in Angular
    }
  });
};

module.exports = { loginUser };
