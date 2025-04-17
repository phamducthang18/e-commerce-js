const FriendModel = require('../models/friendModel');

class FriendController {
    async sendFriendRequest(req, res) {
        const { recipientId } = req.body;
        const requesterId = req.session.user.id;
        if (!recipientId) {
            return res.status(400).json({ message: 'Recipient ID is required' });
        }
        if (requesterId == recipientId) {
            return res.status(400).json({ message: 'Cannot send friend request to yourself' });
        }
        // Check if a friend request already exists
        const existingRequest = FriendModel.findByRequesterAndRecipient(requesterId, recipientId);
        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request already exists' });
        }
        try {
            FriendModel.create(requesterId, recipientId);
            res.status(201).json({ message: 'Friend request sent' });
        } catch (error) {
            console.error('Error sending friend request:', error);
            res.status(500).json({ message: 'Error sending friend request' });
        }
    }

    async respondToFriendRequest(req, res) {
        const { id } = req.params;
        const { status } = req.body;
        console.log(req.body);
        
        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        try {
            const friendRequest = FriendModel.findById(id);
            if (!friendRequest) {
                return res.status(404).json({ message: 'Friend request not found' });
            }

            if (friendRequest.recipient_id !== req.session.user.id) {
                return res.status(403).json({ message: 'Not authorized to respond to this request' });
            }

            FriendModel.updateStatus(id, status);
            res.status(200).json({ message: `Friend request ${status}` });
        } catch (error) {
            console.error('Error updating friend request:', error);
            res.status(500).json({ message: 'Error updating friend request' });
        }
    }

    async listFriendRequests(req, res) {
        const userId = req.session.user.id;
        console.log(111111111111111111);
        
        try {
            const requests = FriendModel.findPendingRequests(userId);
            res.status(200).json({ requests });
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            res.status(500).json({ message: 'Error fetching friend requests' });
        }
    }
    async listFriends(req, res) {
        const userId = req.session.user.id;

        try {
            const friends = FriendModel.findFriendsByUserId(userId);
            res.status(200).json({ friends });
        } catch (error) {
            console.error('Error fetching friends:', error);
            res.status(500).json({ message: 'Error fetching friends' });
        }
    }
}

module.exports = FriendController;