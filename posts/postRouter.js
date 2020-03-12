const express = require('express');
const posts = require("./postDb")

const router = express.Router();

router.get('/', (req, res) => {
    // do your magic!
    posts.get()
        .then(posts => res.status(200).json(posts))
        .catch(() => res.status(400).json({ message: "Error retrieving posts." }))
});

router.get('/:id', validatePostId, (req, res) => {
    // do your magic!
    posts.getById(req.params.id)
        .then(post => res.status(200).json(post))
        .catch(() => res.status(400).json({ message: "Error retrieving post." }))
});

router.delete('/:id', validatePostId, (req, res) => {
    // do your magic!
    posts.remove(req.params.id)
        .then(() => res.status(200).json({ message: "The post with the specified ID was successfully deleted." }))
        .catch(() => res.status(400).json({ message: "Error deleting post." }))
});

router.put('/:id', validatePostId, validatePost, (req, res) => {
    // do your magic!
    posts.update(req.params.id, req.body)
        .then(() => res.status(201).json(req.body))
        .catch(() => res.status(400).json({ message: "There was an error updating the post." }))
});

// custom middleware
function validatePostId(req, res, next) {
    // do your magic!
    posts.getById(req.params.id)
        .then(post => {
            if (!post) {
                res.status(400).json({ message: "The post with the specified ID does not exist." })
            } else { next() }
        })
}

function validatePost(req, res, next) {
    // do your magic!
    if (!req.body) {
        res.status(400).json({ message: "Missing post data." })
    } else if (!req.body.text) {
        res.status(400).json({ message: "Missing required text field." })
    } 
    next()
}

module.exports = router;
