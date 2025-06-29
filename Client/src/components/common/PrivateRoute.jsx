import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const loading = useSelector((state) => state.user.loading);
    if(loading !== null)
        return children
    else
        return <Navigate to="/signin" />
}

export default PrivateRoute
