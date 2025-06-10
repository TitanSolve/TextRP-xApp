import axios from 'axios';

export async function registerUser(address) {
  try {
    const res = await axios.post('/api/register', { address });
    return res.data;
  } catch (err) {
    console.error('Registration/Login failed:', err);
    throw err;
  }
}
