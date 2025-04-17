const PostModel = require('../models/postModel');

class PostController {
    async createPost(req, res) {
        const { title, content } = req.body;
        const userId = req.session.user.id;

        try {
            PostModel.create(userId, title, content);
            res.status(201).json({ message: 'Post created successfully' });
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ message: 'Error creating post' });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = PostModel.findAll();
            res.status(200).json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ message: 'Error fetching posts' });
        }
    }

    async updatePost(req, res) {
        const { id } = req.params;
        const { title, content } = req.body;

        try {
            PostModel.update(id, title, content);
            res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Error updating post' });
        }
    }

    async deletePost(req, res) {
        const { id } = req.params;

        try {
            PostModel.delete(id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error('Error deleting post:', error);
            res.status(500).json({ message: 'Error deleting post' });
        }
    }
}

module.exports = PostController;