const express = require('express');
const PostController = require('../controllers/postController');
const checkSession = require('../middleware/checkSession');

const router = express.Router();
const postController = new PostController();

router.use(checkSession);

router.post('/posts', (req, res) => postController.createPost(req, res));
router.get('/posts', (req, res) => postController.getPosts(req, res));
router.put('/posts/:id', (req, res) => postController.updatePost(req, res));
router.delete('/posts/:id', (req, res) => postController.deletePost(req, res));

module.exports = router;