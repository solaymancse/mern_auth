import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

const EditRoleModal = ({ role, onClose, refetchRoles }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (role) {
            form.setFieldsValue(role);
        }
    }, [role, form]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/roles/edit/${role._id}`, form.getFieldsValue());
            message.success('Role updated successfully');
            refetchRoles();  // Trigger refetch after editing
            onClose();
        } catch (error) {
            message.error('Failed to update role');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit Role"
            visible={!!role}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="update" type="primary" onClick={handleUpdate} loading={loading}>
                    Update Role
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" rules={[{ required: true, message: 'Please input the role name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="description">
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRoleModal;
