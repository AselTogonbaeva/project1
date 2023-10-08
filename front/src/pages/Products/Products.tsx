import React, {FC} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "../../hooks/useAppSelector";
import {useFetchProductsQuery} from "../../store/action-creators/product";
import ProductItem from "./ProductItem";
import ProductsLayout from "../../components/UI/Layout/ProductsLayout";
import {useFetchCategoriesQuery} from "../../store/action-creators/category";

interface IParams {
    id?: string,
}

const Products: FC = () => {
    const params = useParams() as IParams;
    const categoryId = params.id || '';
    const {data: categories} = useFetchCategoriesQuery();
    const currentCategory = categories?.find(c => c._id === params.id);

    const categoryName = currentCategory ? currentCategory.title : 'All products'
    const {data: products} = useFetchProductsQuery(categoryId);

    console.log(categories)

    const user = useAppSelector(state => state.users.user)



    return (
        <ProductsLayout>
            <Grid container direction="column" spacing={2}>
                <Grid item container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">{categoryName}</Typography>
                    </Grid>
                    {user && user?.role === 'admin' &&
                      <Grid item>
                        <Button color="primary" component={Link} to="/products/new">Add product</Button>
                      </Grid>
                    }
                </Grid>
                <Grid item container spacing={1}>
                    {products && (products?.map((d: { _id: string | undefined; title: string | undefined; price: string | undefined; }) => (
                        <ProductItem
                            key={d._id}
                            id={d._id}
                            title={d.title}
                            price={d.price}
                        />
                    )))}

                </Grid>
            </Grid>
        </ProductsLayout>

    );
};

export default Products;