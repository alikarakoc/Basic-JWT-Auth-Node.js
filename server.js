require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const posts = [
  {
    username: "alikarakoc",
    mail: "",
    password: "123456",
  },
  {
    username: "emreozdemir",
    mail: "",
    password: "654321",
  },
];

app.use(express.json());

app.get("/posts", autenticateToken, (req, res) => {
  res.json(
    posts.filter(
      (post) =>
        post.username === req.user.name && post.password === req.user.password
    )
  );
});

function autenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000);
