const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./databaseConfig");
//const validations=require('../myserver/controllers/validations/helpersFunction');

//used to get environment variable from .env file and here it is used to get PORT no.
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

function errorHandler(err, req, res, next) {
  if (err) {
    if (err.type == "entity.parse.failed") {
      res.send({ error: "Object passed in wrong manner. Please correct it" });
    } else {
      res.send({error:"something went wrong. Please Try again"});
      
    }
  }
}

//template when connected to localhost
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("hostPage");
});

/* app.use("/category", require("./routes/categoryRoutes"));
//  /category is the base url

app.use("/users", require("./routes/usersRoutes"));
//  /users is the base url

//get user count
app.use("/usersCount",require("./routes/userCountRoutes") );

//login API
app.use("/login", require("./routes/loginRoutes"));

//favourites API's
app.use("/favorite", require("./routes/favouriteRoutes"));

//records API's
app.use("/records", require("./routes/recordsRoutes"));


//leaderboard API's
app.use("/leaderboard", require("./routes/leaderboardRoutes"));


//highScore API's
app.use("/highscore", require("./routes/highScoreRoutes"));

//EmailScore API's
app.use("/sender", require("./routes/emailRoutes"));


//quiz API's
app.use("/quiz", require("./routes/quizRoutes")); */


/* app.post("/golive/:cid/:qid", (req, res) => {
  const cid = req.params.cid; //category id
  const qid = req.params.qid; //quiz id
  
  validations.validateCategoryAndQuiz(cid, qid)
    .then((message) => {
          const sqlInsert =
            "update quiz set live='true' where qid=(?) and cid=(?);";
          db.query(
            sqlInsert,
            [qid,cid],
            (err, result) => {
              if (err) {
                res.send({ error: err });
              } 
			  if(result.changedRows==0)
			  {
				  res.send({ message: "quiz is already live" });
			  }
			  else {
                res.send({ message: "quiz is live now and it will display to user"});
              }
            }
          );
       
    })
    .catch((err) => {
      res.send({ error: err });
    });
}); */



app.use("/users",require("./routes/userRoute"))

//middleware to handle unexpected errors
app.use(errorHandler);

//process.env.variabel_Name is the way to get value from .env
app.listen(process.env.PORT, () =>
  console.log("Running on \n http://localhost:" + process.env.PORT)
);