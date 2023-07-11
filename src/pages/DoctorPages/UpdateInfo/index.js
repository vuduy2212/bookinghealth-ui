import UpdateUser from '~/pages/UserPages/UpdateUser';
import ProtectedRoute from '~/routes/ProtectedRoute';
import { useSelector } from 'react-redux';
function UpdateInfo() {
    const user = useSelector((state) => state.auth.login.currentUser);
    return (
        <ProtectedRoute isAllowed={!!user && user.roleId === 'R2'} redirectPath="/login">
            <UpdateUser forDoctor />;
        </ProtectedRoute>
    );
}

export default UpdateInfo;
