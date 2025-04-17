const db = require('../config/database');

class UserModel {
    static async create(userData) {
        const { username, password, email } = userData;
        const [result] = await db.query(
            'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
            [username, password, email]
        );
        return result;
    }

    static async findByUsername(username) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0];
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }

    static async getAll() {
        const [rows] = await db.query('SELECT id, username, email, created_at FROM users');
        return rows;
    }
}

module.exports = UserModel;