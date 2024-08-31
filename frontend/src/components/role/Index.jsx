import { useRef, useState } from 'react';
import CreateRole from './CreateRole';
import RoleList from './RoleList';
import EditRoleModal from './EditRoleModal'; // Ensure you have this component

const Index = () => {
    const roleListRef = useRef();
    const [editingRole, setEditingRole] = useState(null);

    const refetchRoles = () => {
        if (roleListRef.current) {
            roleListRef.current.refetchRoles();
        }
    };

    const handleEdit = (role) => {
        setEditingRole(role);
    };

    const closeEditModal = () => {
        setEditingRole(null);
    };

    return (
        <div>
            <h1>Roles Management</h1>
            <CreateRole refetchRoles={refetchRoles} />
            <RoleList refetchRoles={refetchRoles} handleEdit={handleEdit} />
            {editingRole && (
                <EditRoleModal
                    role={editingRole}
                    onClose={closeEditModal}
                    refetchRoles={refetchRoles}
                />
            )}
        </div>
    );
};

export default Index;
