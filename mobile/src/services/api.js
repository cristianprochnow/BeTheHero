import axios from 'axios';

const api = axios.create({
  baseURL: 'http://(put here the IP address of your PC and remove these brackes):3333',
});

export default api;
