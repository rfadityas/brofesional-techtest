import axios from "axios";

export const apiRequest = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
})