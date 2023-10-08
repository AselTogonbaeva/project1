import React from 'react';
import {useAppSelector} from "../hooks/useAppSelector";
import {Navigate, Outlet, useLocation} from "react-router-dom";

const RequireAuth = () => {
    const user = useAppSelector(state => state.users.user);
    const location = useLocation();


    return (
        <div>
            {user && user?.role === 'admin'
                ? <Outlet/>
                : <Navigate to="/login"/>
            }
        </div>
    );
};

export default RequireAuth;