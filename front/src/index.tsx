import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "./store/store";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer/>
            <App/>
        </BrowserRouter>
    </Provider>
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(app);


