import axios from 'axios';
const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE ?? 'http://localhost:8080',
    timeout: 10000
});
export default client;
//# sourceMappingURL=http.js.map