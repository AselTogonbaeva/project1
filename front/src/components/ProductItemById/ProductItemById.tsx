import React, {FC} from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {apiURL} from "../../config";
import imageNotAvailable from "../../assets/images/noImage.png";
import {useAppSelector} from "../../hooks/useAppSelector";
import {productsApi, useFetchProductByIdQuery, useRemoveProductByIdMutation} from "../../store/action-creators/product";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {productActions} from '../../store/reducers/productSlice'
import {toast} from "react-toastify";

interface IParams {
   id?: string
};

const card: React.CSSProperties = {
    height: '100%',
}
const media: React.CSSProperties = {
    height: 0,
    paddingTop: '56.25%',
}

const ProductItemById: FC<IParams> = () => {
    const user = useAppSelector(state => state.users.user);
    const params = useParams() as IParams;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {data: product} = useFetchProductByIdQuery(params.id);
    const [removeProductById] = useRemoveProductByIdMutation();
    console.log(product)

    let cardImage = imageNotAvailable;

    if (product?.image) {
        cardImage = apiURL + `/` + product.image;
    }

    const removeHandler = async () => {
        try {
            const response = await removeProductById(product?._id).unwrap();
            console.log(response)
            dispatch(productActions.deleteProductById(response?._id));
            navigate("/")

        } catch (err) {
            console.log(err)
        }


    }

    return (
        <Grid container >
        <Grid item container xs  >
            <Grid item xs>
                <Card style={card}>
                    <CardHeader title={product?.title}/>
                    <CardMedia
                        image={cardImage}
                        title={product?.title}
                        style={media}
                    />
                    <CardContent>
                        <strong style={{marginLeft: '10px'}}>
                            Price: {product?.price} $
                        </strong>
                        <p>{product?.description}</p>
                    </CardContent>
                    <CardActions>
                        { user && user?.role === 'admin'
                            ? <IconButton onClick={removeHandler}>
                                <Delete />
                            </IconButton>
                            : null
                        }

                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </Grid>
    );
};

export default ProductItemById;