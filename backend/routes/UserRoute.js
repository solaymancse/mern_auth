const express = require('express');
const { createUser, getDashboard, deleteUser, editUser, getUsers } = require('../controllers/userController');
const jwt = require('jsonwebtoken');
const authUserMiddleware = require('../middleware/authUserMiddleware');
const { getProfile, updateProfile } = require('../controllers/profileController');

const authMiddleware = (roles = []) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log('Decoded User:', decoded); // Log the decoded token data

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ msg: 'Access denied' });
            }
            next();
        } catch (err) {
            console.error('Token verification error:', err); // Log errors
            res.status(401).json({ msg: 'Token is not valid' });
        }
    };
};


const router = express.Router();
router.post('/create', authMiddleware(['super admin', 'admin']), createUser);
router.delete('/delete/:id', authMiddleware(['super admin','admin']), deleteUser);
router.put('/edit/:id', authMiddleware(['super admin','admin']), editUser);
router.get('/all', authMiddleware(['super admin','admin']), getUsers);
router.get('/dashboard', authMiddleware(), getDashboard);
router.get('/profile', authUserMiddleware, getProfile);
router.put('/profile', authUserMiddleware, updateProfile);


module.exports = router;