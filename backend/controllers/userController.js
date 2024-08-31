const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createUser = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password:hashedPassword, role });
        await newUser.save();
        res.status(201).json({ msg: 'User created' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};
// Delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deletion of super admin
        if (user.role === 'super admin') {
            return res.status(403).json({ message: 'Cannot delete super admin' });
        }

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { email, password, role } = req.body;

    try {
        console.log(`User ID: ${id}`);
        console.log(`Payload: `, req.body);

        let user = await User.findById(id);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        user.email = email || user.email;
        user.role = role || user.role;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();
        console.log('User updated:', user);

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDashboard = (req, res) => {
    res.json({ msg: 'Welcome to the dashboard!' });
};