import { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import axios from 'axios';

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Failed to fetch profile');
            }
        };

        fetchProfile();
    }, [form]);

    const handleUpdate = async (values) => {
        setLoading(true);
        try {
            const response = await axios.put('http://localhost:5000/api/users/profile', values, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            message.success('Profile updated successfully');
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title="User Profile"
            bordered={false}
            style={{
                maxWidth: 500,
                margin: 'auto',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                borderRadius: '10px',
            }}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdate}
                initialValues={{ name: '', password: '', address: '' }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                >
                    <Input placeholder="Enter your name" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ message: 'Please enter your password' }]}
                >
                    <Input.Password placeholder="Enter a new password" />
                </Form.Item>
                <Form.Item
                    label="Address"
                    name="address"
                >
                    <Input placeholder="Enter your address" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Update Profile
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProfilePage;
