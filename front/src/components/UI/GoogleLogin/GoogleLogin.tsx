import React, {useEffect} from 'react';
import {googleClientId} from "../../../config";
import {GoogleLogin, GoogleOAuthProvider} from "@react-oauth/google";
import {useGoogleLoginMutation, useLoginUserMutation, usersApi} from "../../../store/action-creators/user";
import {userActions} from "../../../store/reducers/userSlice";
import {toast} from "react-toastify";
import {useAppDispatch} from "../../../hooks/useAppDispatch";
import {useNavigate} from "react-router-dom";

const GoogleLoginButton = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [googleLogin, {data: loginData, isSuccess, isError}] = useGoogleLoginMutation();



    const handleSuccess = (googleData: any) => {
        console.log(googleData)
        googleLogin(googleData)
    }

    const handleError = () => {
        console.log('Login failed')
    }

    useEffect(() => {
        if (isSuccess && loginData) {
            dispatch(userActions.loginUserSlice(loginData.user));
            toast.success("You are logged in!");
            navigate("/")
        }
    }, [isSuccess]);

    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin

                onSuccess={handleSuccess}
                onError={handleError}

            />
        </GoogleOAuthProvider>

    );
};

export default GoogleLoginButton;