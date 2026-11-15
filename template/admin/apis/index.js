import axios from 'axios';

const server = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const getServer = () => server;
export default server;
