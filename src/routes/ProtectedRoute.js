import { Navigate, Outlet } from 'react-router-dom';
function ProtectedRoute({ isAllowed = 'false', redirectPath = '/', children }) {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />;
    } else {
        return children ? children : <Outlet />;
    }
}

export default ProtectedRoute;
