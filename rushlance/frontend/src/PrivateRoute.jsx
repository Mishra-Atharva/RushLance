import { Navigate } from 'react-router-dom';

function PublicRoute({children})
{
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to = "/" replace/>;
}

export default PublicRoute;