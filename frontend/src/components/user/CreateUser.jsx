import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const CreateUser = ({ refetchUsers }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);

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
    }, []);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/create', values, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            message.success(response.data.message);
            refetchUsers();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the email!' }]}
            >
                <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input the password!' }]}
            >
                <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item
                label="Role"
                name="role"
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

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create User
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateUser;
