import React from 'react';
import {AppBar, Button, Grid, makeStyles, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import UserMenu from "./menu/UserMenu";
import AnonymousMenu from "./menu/AnonymousMenu";
import {useLoginUserMutation, usersApi} from "../../store/action-creators/user";

const mainLink: React.CSSProperties = {
    color: 'inherit',
    textDecoration: 'none',
}
const staticToolbar: React.CSSProperties = {
    marginBottom: 20
}


const AppToolbar = () => {

    const user = useAppSelector(state => state.users.user)
    console.log(user)

    return (
        <>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h6" >
                                <Link to="/" style={mainLink}>Computer Shop </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ? (
                                <UserMenu user={user}/>
                            ) : (
                                <AnonymousMenu/>
                            )}
                        </Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Toolbar style={staticToolbar}/>
            
        </>
    );
};

export default AppToolbar;