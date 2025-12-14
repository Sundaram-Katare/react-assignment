import axios from "axios";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const fetchUsers = async () => {
    return axios.get(API_URL);
};