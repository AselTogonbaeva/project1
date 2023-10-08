import axios from "axios";
import {apiURL} from "./config";

const AxiosApi = axios.create({
    baseURL: apiURL,
})

export default AxiosApi;