const checkSession = (req, res, next) => {
    console.log('Checking session...');
    console.log(req.session.user);
    
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Unauthorized: No active session' });
    }
    next();
};

module.exports = checkSession;