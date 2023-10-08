import React, {FC} from 'react';
import {Grid, Typography} from "@mui/material";
import ProductForm from "../../components/ProductForm/ProductForm";
import {IProduct} from "../../types/product";
import {useCreateProductsMutation} from "../../store/action-creators/product";
import {useNavigate} from "react-router-dom";
import {categoriesApi} from "../../store/action-creators/category";
import {toast} from "react-toastify";

const NewProduct: FC = () => {
    const navigate = useNavigate();
    const [createProducts, {isError, error}] = useCreateProductsMutation();
    const {data: categories} = categoriesApi.useFetchCategoriesQuery();

    const onProductFormSubmit = async (formData: IProduct) => {
        try {
            await createProducts(formData).unwrap();
            navigate('/');
        } catch (err) {
            console.log(error)
            toast.error("Unauthorized")
        }
    }



    return (
        <Grid container direction="column">
            <Grid item xs>
                <Typography variant="h4">New Product</Typography>
            </Grid>
            <Grid item xs>
                <ProductForm onSubmit={onProductFormSubmit} categories={categories}/>
            </Grid>
        </Grid>
    );
};

export default NewProduct;