const express = require('express');

const server = express();
server.use(express.json())
const logger = require("./common/logger")
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

// custom middleware
server.use(logger)
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.get('/', (req, res) => {
    console.log("console log in get /", req.body)
res.send(`<h2>Let's write some middleware!</h2>`);
});
module.exports = server;
