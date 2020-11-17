import axios from 'axios';

export default axios.create({
    baseURL: "https://localhost:44361/api",
    headers: {
        "Content-type" : "application/json"
    }
})