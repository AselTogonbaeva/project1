import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "../AppToolbar";
import {Outlet} from "react-router-dom";
import AppDrawer from "./AppDrawer";


const Layout = () => {

    return (
        <div style={{display: 'flex', alignItems: 'center',  marginTop: 70}}  >
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <AppDrawer/>
            <main>
                <Container maxWidth="xl">
                    <Outlet />
                </Container>
            </main>
        </div>
    );
};

export default Layout;