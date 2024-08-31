import { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import axios from 'axios';

const UserList = ({ refetchUsers, handleEdit }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data || []);
            setLoading(false);
        } catch (error) {
            message.error('Failed to fetch users');
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            message.success('User deleted successfully');
            refetchUsers();
        } catch (error) {
            message.error('Failed to delete user');
        }
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure delete this user?"
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
        fetchUsers();
    }, []);

    return (
        <Table
            columns={columns}
            dataSource={users}
            loading={loading}
            rowKey="_id"
        />
    );
};

export default UserList;
