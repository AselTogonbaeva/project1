import React from 'react';
import {Link} from "react-router-dom";

const AnonymousMenu = () => {
    return (
        <>
            <Link to="/register" style={{textDecoration: 'none', color: "inherit"}}>
                Sing up
            </Link>
            <Link to="/login" style={{marginLeft: '10px', textDecoration: 'none', color: "inherit"}}>
                Sing in
            </Link>
            
        </>
    );
};

export default AnonymousMenu;