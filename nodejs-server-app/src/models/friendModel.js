const db = require('../config/database');

class FriendModel {
    static async create(requesterId, recipientId) {
        const [result] = await db.query(
            'INSERT INTO friends (requester_id, recipient_id) VALUES (?, ?)',
            [requesterId, recipientId]
        );
        return result;
    }

    static async updateStatus(id, status) {
        const [result] = await db.query(
            'UPDATE friends SET status = ? WHERE id = ?',
            [status, id]
        );
        return result;
    }

    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM friends WHERE id = ?', [id]);
        return rows[0];
    }

    static async findFriendsByUserId(userId) {
        const [rows] = await db.query(`
            SELECT f.id, f.status, u1.username AS requester, u2.username AS recipient
            FROM friends f
            JOIN users u1 ON f.requester_id = u1.id
            JOIN users u2 ON f.recipient_id = u2.id
            WHERE (f.requester_id = ? OR f.recipient_id = ?) AND f.status = 'accepted'
        `, [userId, userId]);
        return rows;
    }

    static async findPendingRequests(userId) {
        const [rows] = await db.query(`
            SELECT f.id, u.username AS requester
            FROM friends f
            JOIN users u ON f.requester_id = u.id
            WHERE f.recipient_id = ? AND f.status = 'pending'
        `, [userId]);
        return rows;
    }

    static async findByRequesterAndRecipient(requesterId, recipientId) {
        const [rows] = await db.query(
            'SELECT * FROM friends WHERE requester_id = ? AND recipient_id = ?',
            [requesterId, recipientId]
        );
        return rows[0];
    }
}

module.exports = FriendModel;