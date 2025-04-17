const db = require('../config/database');

class CommentModel {
    static async create(postId, userId, content) {
        const [result] = await db.query(
            'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
            [postId, userId, content]
        );
        return result;
    }

    static async findByPostId(postId) {
        const [rows] = await db.query(`
            SELECT c.*, u.username 
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = ?
            ORDER BY c.created_at ASC
        `, [postId]);
        return rows;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM comments WHERE id = ?', [id]);
        return result;
    }
}

module.exports = CommentModel;