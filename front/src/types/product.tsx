export interface IProduct {
    title: string;
    price: string;
    image: string;
    description: string;
    _id: string;
    category: '',
}

export interface ProductState {
    products: IProduct[];
    product: IProduct | null;
    loading: boolean;
    error: null | string;
    createLoading: boolean;
    createError: null | string;
}
