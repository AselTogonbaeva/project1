export interface IUser {
    email: string;
    password: string;
    role: string;
    token: string | null
}


export interface UserState {
    user: any;
    loginLoading: boolean;
    loginError: { error: string } | null;
    registerLoading: boolean;
    registerError: null | { }

}
