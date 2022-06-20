import express from "express";
import cors from "cors";
import { isImage } from "./utils/verify.js";

const server = express();
const users = [];
const tweets = [];
let userImage = "";

server.use([cors(), express.json()]);

server.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!isImage(avatar) || username.length < 2) {
    return res.status(400).send("Dados inválidos");
  }

  users.push({ username, avatar });
  userImage = avatar;
  res.status(200).send("Ok");
});

server.post("/tweets", (req, res) => {
  const tweet = req.body.tweet;
  const username = req.headers.user;

  if (!tweet || !username) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  tweets.push({
    username,
    tweet,
    avatar: userImage,
  });

  res.status(201).send(tweets);
});

server.get("/tweets", (req, res) => {
  let page = Number(req.query.page);
  let tweetsPage = [];

  for (let i = page * 10 - 10; i < page * 10; i++) {
    if (tweets[i]) {
      tweetsPage.push(tweets[i]);
    }
  }

  res.send(tweetsPage.reverse());
});

server.get("/tweets/:username", (req, res) => {
  const name = req.params.username;

  const JustTweetsWithName = tweets.filter(
    (object) => object.username === name
  );
  res.send(JustTweetsWithName);
});

server.listen(5000);
