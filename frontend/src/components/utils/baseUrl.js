import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "https://mybigtodoapp.herokuapp.com/"
})
export default axiosInstance