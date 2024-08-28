const express = require('express');
const { createUser, getDashboard } = require('../controllers/userController');
const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ msg: 'Access denied' });
            }
            next();
        } catch (err) {
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
};

const router = express.Router();
router.post('/create', authMiddleware(['admin']), createUser);
router.get('/dashboard', authMiddleware(), getDashboard);

module.exports = router;