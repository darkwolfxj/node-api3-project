const express = require('express');

const router = express.Router();
const users = require("./userDb")
const posts = require("../posts/postDb")

router.post('/', (req, res) => {
    // do your magic!
    users.insert(req.body)
        .then(() => res.status(201).json({ message: "The post was created successfully." }))
        .catch(() => res.status(400).json({ message: "There was an error creating the post." }))
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
    // do your magic!
    console.log("req.body in post to /:id/posts", req.body)
    req.body.user_id = req.user
    posts.insert(req.body)
        .then(() => res.status(201).json(req.body))
        .catch((error) => res.status(400).json({ message: error }))    
});

router.get('/', (req, res) => {
    // do your magic!
    users.get()
        .then(users => res.status(200).json(users))
        .catch(() => res.status(404).json({ message: "Cannot find users." }))
});

router.get('/:id', validateUserId, (req, res) => {
    // do your magic!
    users.getById(req.params.id)
        .then(userById => res.status(200).json(userById))
        .catch(() => res.status(404).json({ message: "Cannot find user witht the specified ID." }))
});

router.get('/:id/posts', validateUserId, (req, res) => {
    // do your magic!
    users.getUserPosts(req.params.id)
        .then((posts) => res.status(200).json(posts))
        .catch(() => res.status(404).json({ message: "Posts not found for the specified user." }))
});

router.delete('/:id', validateUserId, (req, res) => {
    // do your magic!
    users.remove(req.user)
        .then(() => res.status(200).json({ message: "Deleted successfully." }))
        .catch(() => res.status(500).json({ message: "There was an error deleting the specified user." }))
});

router.put('/:id', validateUserId, (req, res) => {
    // do your magic!
    console.log(req.body, req.user)
    users.update(req.user, req.body)
        .then(user => res.status(201).json(user))
        .catch(() => res.status(400).json({ message: "There was an error updating user." }))
});

//custom middleware
function validatePost(req, res, next) {
    // do your magic!
    if (!req.body) {
        res.status(400).json({ message: "Missing post data." })
    } else if (!req.body.text) {
        res.status(400).json({ message: "Missing required text field." })
    } 
    next()
}

function validateUserId(req, res, next) {
    // do your magic!
    users.getById(req.params.id)
        .then(user => {
            console.log(req.body)
            if (!user) {
                res.status(404).json({ message: "The user with the specified ID does not exist." })    
            } else {
            req.user = req.params.id
            next()
            }
        })
        .catch(error => res.status(500).json({ message: error }))
}

function validateUser(req, res, next) {
    // do your magic!
    if (!req.body) {
        res.status(400).json({ message: "Missing user data." })
    } else if (!req.body.name){ res.status(400).json({ message: "Missing required name field." }) } else { next() }
}

module.exports = router;
