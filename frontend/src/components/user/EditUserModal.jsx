import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const EditUserModal = ({ user, onClose, refetchUsers }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/roles/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRoles(response.data || []);
            } catch (error) {
                message.error('Failed to fetch roles');
            }
        };

        fetchRoles();

        if (user) {
            form.setFieldsValue({
                email: user.email,
                role: user.role,
            });
        }
    }, [user, form]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const { email, role } = form.getFieldsValue();
            await axios.put(`http://localhost:5000/api/users/edit/${user._id}`, {
                email,
                role,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            message.success('User updated successfully');
            refetchUsers();  // Refresh the user list
            onClose();       // Close the modal
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to update user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit User"
            visible={!!user}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="update" type="primary" onClick={handleUpdate} loading={loading}>
                    Update User
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please input the email!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[{ required: true, message: 'Please select a role!' }]}
                >
                    <Select placeholder="Select a role">
                        {roles?.map(role => (
                            <Option key={role._id} value={role.name}>
                                {role.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
