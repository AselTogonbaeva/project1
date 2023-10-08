import React, {FC, ReactNode} from 'react';
import AppDrawer from "./AppDrawer";
import {Outlet} from "react-router-dom";
interface ProductsLayoutProps {
    children: ReactNode;
}

const ProductsLayout: FC<ProductsLayoutProps> = ({ children }) => {
    return (
        <div >
            <AppDrawer />
            <div style={{ flexGrow: 1, padding: '10px' }}>
                {children}
            </div>
        </div>
    );
};

export default ProductsLayout;
