const db = require('../config/database');

class PostModel {
    static async create(userId, title, content) {
        const [result] = await db.query(
            'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
            [userId, title, content]
        );
        return result;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
        return rows[0];
    }

    static async findAll() {
        const [rows] = await db.query(`
            SELECT p.*, u.username 
            FROM posts p
            JOIN users u ON p.user_id = u.id
            ORDER BY p.created_at DESC
        `);
        return rows;
    }

    static async update(id, title, content) {
        const [result] = await db.query(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );
        return result;
    }

    static async delete(id) {
        const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
        return result;
    }
}

module.exports = PostModel;