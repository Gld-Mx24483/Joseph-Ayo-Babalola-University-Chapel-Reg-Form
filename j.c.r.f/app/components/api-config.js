// api-config.js
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://jabu-chapel-form-server.vercel.app' 
  : 'http://localhost:5000';

export default API_URL;