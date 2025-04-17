class SessionController {
    async checkSession(req, res) {
        try {
            if (!req.session || !req.session.user) {
                return res.status(401).json({ message: 'No active session' });
            }

            // Return session user details
            res.status(200).json({
                message: 'Session is active',
                user: {
                    id: req.session.user.id,
                    email: req.session.user.email,
                    username: req.session.user.username,
                },
                isLoggedIn: true,
            });
        } catch (error) {
            console.error('Error checking session:', error);
            return res.status(500).json({ isLoggedIn: false, message: 'Server error' });
        }
    }

    async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error destroying session:', err);
                    return res.status(500).json({ message: 'Error logging out' });
                }
                res.status(200).json({ message: 'Logout successful', isLoggedIn: false });
            });
        } catch (error) {
            console.error('Error during logout:', error);
            res.status(500).json({ message: 'Server error during logout' });
        }
    }
}

module.exports = SessionController;