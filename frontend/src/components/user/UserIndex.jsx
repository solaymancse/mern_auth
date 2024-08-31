import { useRef, useState } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import EditUserModal from './EditUserModal';

const UserIndex = () => {
    const userListRef = useRef();
    const [editingUser, setEditingUser] = useState(null);

    const refetchUsers = () => {
        if (userListRef.current) {
            userListRef.current.fetchUsers();
        }
    };

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const closeEditModal = () => {
        setEditingUser(null);
    };

    return (
        <div>
            <h1>User Management</h1>
            <CreateUser refetchUsers={refetchUsers} />
            <UserList refetchUsers={refetchUsers} handleEdit={handleEdit} />
            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onClose={closeEditModal}
                    refetchUsers={refetchUsers}
                />
            )}
        </div>
    );
};

export default UserIndex;
