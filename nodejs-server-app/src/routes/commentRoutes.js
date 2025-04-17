const express = require('express');
const CommentController = require('../controllers/commentController');
const checkSession = require('../middleware/checkSession');

const router = express.Router();
const commentController = new CommentController();

router.use(checkSession);

router.post('/comments', (req, res) => commentController.createComment(req, res));
router.get('/comments/:postId', (req, res) => commentController.getComments(req, res));
router.delete('/comments/:id', (req, res) => commentController.deleteComment(req, res));

module.exports = router;