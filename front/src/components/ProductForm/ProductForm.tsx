import React, {FC, useState} from 'react';
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import { IProduct } from '../../types/product';
import { MuiFileInput } from 'mui-file-input';
import {ICategory} from "../../types/category";

interface IProductFormProps {
    onSubmit: (formData: IProduct) => void;
    categories?: ICategory[] | undefined;

}

const ProductForm: FC<IProductFormProps> = ({onSubmit, categories}) => {

    const [state, setState] = useState({
        title: '',
        price: '',
        description: '',
        _id: '',
        image: '',
        category: '',
    });

    const [value, setValue] = useState<File | null>(null)


    const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit({...state} as IProduct)
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }))
    };

    const handleChange = (newValue: File | null) => {
        setValue(newValue)
    }



    return (
        <form onSubmit={submitFormHandler}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <TextField
                        fullWidth
                        required
                        select
                        variant="outlined"
                        label="Category"
                        name="category"
                        value={state.category}
                        onChange={inputChangeHandler}
                    >
                        <MenuItem><i>Select a category</i></MenuItem>
                        {categories?.map(c =>(
                            <MenuItem key={c._id} value={c._id}>
                                {c.title}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"
                        id="title"
                        label="Title"
                        name="title"
                        value={state.title}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        fullWidth
                        required
                        variant="outlined"
                        id="price"
                        type="number"
                        label="Price"
                        name="price"
                        value={state.price}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        id="description"
                        label="Description"
                        name="description"
                        value={state.description}
                        onChange={inputChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <MuiFileInput
                        fullWidth
                        label={'Image'}
                        value={value}
                        onChange={handleChange}
                        hideSizeText
                    />
                </Grid>
                <Grid item xs>
                    <Button type="submit" color="primary" variant="outlined">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ProductForm;