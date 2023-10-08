export interface ICategory {
    title: string;
    description: string
    _id: string;
}
export interface CategoryState {
    categories: ICategory[];
    loading: boolean;
    error: null | string;
}

