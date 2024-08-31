import { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm } from 'antd';
import axios from 'axios';

const RoleList = ({ refetchRoles, handleEdit }) => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roles/all');
            setRoles(response.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch roles');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/roles/delete/${id}`);
            message.success('Role deleted successfully');
            refetchRoles();
        } catch (error) {
            message.error('Failed to delete role');
        }
    };

    const columns = [
        {
            title: 'Role Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure delete this role?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger>Delete</Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <Table
            columns={columns}
            dataSource={roles}
            loading={loading}
            rowKey="_id"
        />
    );
};

export default RoleList;
