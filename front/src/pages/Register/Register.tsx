import React, {FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Avatar, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {LockClockOutlined} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useRegisterUserMutation} from "../../store/action-creators/user";
import {userActions} from "../../store/reducers/userSlice";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../hooks/useAppDispatch";


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

const Register: FC = () => {
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
    const [registerUser, {isError, isSuccess, data: registerData}] = useRegisterUserMutation();
    const [error, setError] = useState<string | null>(null);


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setUser(prevState => ({...prevState, [name]: value }))
    };


    const submitFormHandler =  async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerUser({...user});
            setError(null)
        } catch (err: any) {
         setError(err.data)
        }
    }

    useEffect(() => {
        if (isSuccess && registerData) {
            toast.success("You are signed up!");
            dispatch(userActions.registerUserSlice(registerData.user));
            navigate("/login")
        }
    }, [isSuccess]);

    return (
        <Container component="section" maxWidth="xs">
            <div style={paper}>
                <Avatar style={avatar}>
                    <LockClockOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5" style={{marginBottom: '16px'}}>
                    Sign up
                </Typography>
                <Grid container spacing={1} direction="column" component="form" onSubmit={submitFormHandler}>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            name="email"
                            label="Email"
                            value={user.email}
                            error={Boolean(error)}
                            helperText={isError ? 'Registration failed' : error || ''}
                            onChange={inputChangeHandler}
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value={user.password}

                            error={Boolean(error)}
                            helperText={isError && error ? 'Registration failed' : error || ''}
                            onChange={inputChangeHandler}
                        />

                    </Grid>
                    <Grid item xs>
                        <TextField
                            fullWidth
                            label="Display Name"
                            name="displayName"
                            type="displayName"
                            value={user.displayName}

                            error={Boolean(error)}
                            helperText={isError && error ? 'Registration failed' : error || ''}
                            onChange={inputChangeHandler}
                        />

                    </Grid>
                    <Grid item xs>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Sign up
                        </Button>
                    </Grid>
                    <Grid item container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/login" >
                                Already have account? Sing in
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
};

export default Register;


