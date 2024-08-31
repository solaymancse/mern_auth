import { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const CreateRole = ({ refetchRoles }) => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/roles/create', values);
            message.success(response.data.message);
            refetchRoles();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to create role');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input the role name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Create Role
                    </Button>
                </Form.Item>
            </Form>



        </>
    );
};

export default CreateRole;
