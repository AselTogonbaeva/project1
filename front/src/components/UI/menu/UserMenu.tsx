import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu/Menu';
import {MenuItem} from "@mui/material";
import {IUser} from "../../../types/user";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {userActions} from '../../../store/reducers/userSlice';
import {useLogoutUserMutation} from "../../../store/action-creators/user";

interface UserMenuProps {
    user?: any
}

const UserMenu: FC<UserMenuProps> = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<null | HTMLButtonElement>(null);
    const [logoutUser, {isSuccess, data: registerData}] = useLogoutUserMutation();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(null);
    }

    console.log(user)


    const handleLogoutUser = async () => {
        if (user !== null && user !== undefined) {
            const token = user.token || ''; // Provide a default value (empty string) if token is null or undefined
            await logoutUser(token);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("User is logged out!");
            dispatch(userActions.logout(null));
            navigate("/");
        }
    }, [isSuccess])

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user?.displayName}!
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
             <MenuItem>Profile</MenuItem>
             <MenuItem>My Account</MenuItem>
             <MenuItem onClick={handleLogoutUser}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;