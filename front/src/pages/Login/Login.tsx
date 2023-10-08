import React, {FC, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Alert, AlertTitle, Avatar, Container, Grid, TextField, Typography} from "@mui/material";
import {LockClockOutlined} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {toast} from "react-toastify";
import {usersApi} from "../../store/action-creators/user";
import {userActions} from "../../store/reducers/userSlice";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import GoogleLoginButton from "../../components/UI/GoogleLogin/GoogleLogin";


const paper: React.CSSProperties = {
    marginTop: '64px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}
const avatar: React.CSSProperties = {
    margin: '8px',
    backgroundColor: 'secondary.main',
}

const form: React.CSSProperties = {
    margin: '24px 0 16px'

}

const Login: FC = () => {
    const [user, setUser] = useState({
        displayName: '',
        email: '',
        password: '',
        _id: '',
        token: '',
        role: '',
    });

    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const [loginUser, {isError, isSuccess, data: loginData}] = usersApi.useLoginUserMutation();

    const [error, setError] = useState<string | null>(null);

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value }))
    };


    const submitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
           await  loginUser({...user}).unwrap();

            setError(null)
        } catch (err: any) {
            setError(err.loginData)
            toast.error("Unauthorized")
        }
    }

    useEffect(() => {
        if (isSuccess && loginData) {
            dispatch(userActions.loginUserSlice(loginData.user));
            toast.success("You are logged in!");
            navigate("/")
        }
    }, [isSuccess]);




    return (
        <Container component="section" maxWidth="xs">
            <div style={paper}>
                <Avatar style={avatar}>
                    <LockClockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom: '16px'}}>
                    Sign in
                </Typography>

                <Grid container spacing={1} direction="column" component="form" onSubmit={submitFormHandler}>
                    <Grid item xs>
                        {error ? (
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {isError ? 'Login failed' : error || ''}
                            </Alert>
                        ) : undefined}
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            fullWidth
                            name="email"
                            label="Email"
                            type="email"
                            value={user.email}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={inputChangeHandler}
                        />

                    </Grid>
                    <Grid item xs>
                        <LoadingButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign in
                        </LoadingButton>
                    </Grid>
                    <Grid item xs>
                        <GoogleLoginButton/>
                    </Grid>
                    <Grid item container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/register" >
                               No account? Sing up
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Login;