import React from 'react';
import {Divider, Drawer, List, ListItem, ListItemButton, Toolbar} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useFetchCategoriesQuery} from "../../../store/action-creators/category";

const drawerWidth = 240;

const AppDrawer = () => {
    const params = useParams();
    const {data: categories} = useFetchCategoriesQuery();


    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
            <Toolbar />
            <Divider />
            <List>
               <ListItem >
                   <ListItemButton component={Link} to="/" selected={!params.id} >
                       All products
                   </ListItemButton>
               </ListItem>
                {categories?.map(category =>(
                    <ListItem key={category._id}>
                        <ListItemButton component={Link} to={`/category/${category._id}`} selected={category._id === params.id}>
                          {category.title}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>



        </Drawer>
    );
};

export default AppDrawer;