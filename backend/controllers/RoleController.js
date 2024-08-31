const Role = require('../models/Role');

exports.createRole = async (req, res) => {
    const { name } = req.body;
    try {
        let role = await Role.findOne({ name });
        if (role) {
            return res.status(400).json({ message: 'Role already exists' });
        }

        role = new Role({ name });
        await role.save();
        res.status(201).json({ message: 'Role created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.editRole = async (req, res) => {
    try {
        const { id } = req.params;
        await Role.findByIdAndUpdate(id, req.body);
        res.json({ message: 'Role updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update role' });
    }
};

exports.deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        await Role.findByIdAndDelete(id);
        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete role' });
    }
};
