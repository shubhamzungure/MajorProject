const express = require("express"),
  router = express.Router(),

  users = require("../controllers/users/signUp");

router.get("", users.getAllUsers);
router.post("/", users.postUser);


module.exports = router;
//router.post("/", users.postUser);
