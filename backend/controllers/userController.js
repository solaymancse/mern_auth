const User = require('../models/User');

exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const newUser = new User({ email, password, role });
        await newUser.save();
        res.status(201).json({ msg: 'User created' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getDashboard = (req, res) => {
    res.json({ msg: 'Welcome to the dashboard!' });
};