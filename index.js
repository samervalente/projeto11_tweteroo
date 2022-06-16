import express from 'express'
import cors from 'cors'

const server = express()
const users = []
const tweets = []
let userTweet = []
let avatarF = ""


server.use(express.json())
server.use(cors())


server.get('/sign-up', (req, res) => {
    res.send(users)
})

server.post('/sign-up', (req, res) => {
  users.push({
    username:req.body.username,
    avatar:req.body.avatar
  })

  avatarF = req.body.avatar
  res.send(users)
    
})

server.post('/tweets', (req, res) => {
    tweets.push({
        username:req.body.username,
        tweet: req.body.tweet
    })
    userTweet = [...userTweet, {username: req.body.username, tweet:req.body.tweet, avatar:avatarF}]
    res.send(tweets)
})




server.listen(5000)