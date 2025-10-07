// api-config.js
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://jabu-chapel-form-server.vercel.app' 
  : 'https://jabu-chapel-form-server.vercel.app';

export default API_URL;