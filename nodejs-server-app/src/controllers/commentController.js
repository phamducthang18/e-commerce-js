const CommentModel = require('../models/commentModel');

class CommentController {
    async createComment(req, res) {
        const { postId, content } = req.body;
        const userId = req.session.user.id;

        try {
            CommentModel.create(postId, userId, content);
            res.status(201).json({ message: 'Comment added successfully' });
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).json({ message: 'Error adding comment' });
        }
    }

    async getComments(req, res) {
        const { postId } = req.params;

        try {
            const comments = CommentModel.findByPostId(postId);
            res.status(200).json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Error fetching comments' });
        }
    }

    async deleteComment(req, res) {
        const { id } = req.params;

        try {
            CommentModel.delete(id);
            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Error deleting comment' });
        }
    }
}

module.exports = CommentController;