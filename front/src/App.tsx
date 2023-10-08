import React from 'react';
import {Container, CssBaseline} from "@mui/material";
import AppToolbar from "./components/UI/AppToolbar";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import Products from "./pages/Products/Products";
import NewProduct from "./pages/NewProduct/NewProduct";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import RequireAuth from "./components/RequireAuth";
import ProductItemById from "./components/ProductItemById/ProductItemById";


const App = () => {


    return (

        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<Products/>}/>
                <Route path="/category/:id" element={<Products/>}/>
                <Route path="/products/:id" element={<ProductItemById />}/>
                <Route element={<RequireAuth />}>
                    <Route path="/products/new" element={<NewProduct/>}/>
                </Route>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
            </Route>

        </Routes>

    );
};

export default App;
