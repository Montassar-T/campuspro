// api.js
import axios, { AxiosResponse } from 'axios';

// Define API base URL
const baseURL = 'http://localhost:4200';

// Axios instance configured with baseURL
const api = axios.create({
    baseURL,
});

// Function to perform login asynchronously
export async function login(email, password){
    try {
        const response = await api.post('/auth/login', { email, password });
        return response;
    } catch (error) {
        throw new Error(`Error during login: ${error.message}`);
    }
}

// Export other functions as needed
