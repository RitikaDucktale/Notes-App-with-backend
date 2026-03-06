import axios from 'axios';
console.log('api instamce...')
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers:{
        "Content-Type":"application/json"
    }
});

export default api;