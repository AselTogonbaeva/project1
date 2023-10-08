import React, {FC} from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {ArrowForward} from "@mui/icons-material";

import imageNotAvailable from '../../assets/images/noImage.png';
import {apiURL} from "../../config";

interface IProductItemProps {
    title?: string;
    price?: string;
    id?: string;
    image?: string;
    description?: string;
}

const card: React.CSSProperties = {
   height: '100%',
}
const media: React.CSSProperties = {
    height: 0,
    paddingTop: '56.25%',
}


const ProductItem: FC<IProductItemProps> = ({description,image, title, id, price}) => {

    let cardImage = imageNotAvailable;

    if (image) {
        cardImage = apiURL + `/` + image;
    }



    return (
        <Grid item xs sm md={6} lg={4}>
            <Card style={card}>
                <CardHeader title={title}/>
                <CardMedia
                    image={cardImage}
                    title={title}
                    style={media}
                />
                <CardContent>
                    <strong style={{marginLeft: '10px'}}>
                        Price: {price} $
                    </strong>
                </CardContent>
                <CardActions>
                    <IconButton
                        component={Link}
                        to={'/products/' + id}

                    >
                        <ArrowForward/>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ProductItem;