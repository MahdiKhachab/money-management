import client, { getErrorMessage } from './client';

// Returns the raw JWT on success.
export const login = async (username, password) => {
  try {
    const { data } = await client.post('/auth/login', { username, password });
    if (!data?.token) throw new Error('لم يتم استلام رمز الدخول من الخادم.');
    return data.token;
  } catch (error) {
    const status = error.response?.status;
    if (status === 401 || status === 403 || status === 400) {
      throw new Error('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
    throw new Error(error.response || error.request ? getErrorMessage(error) : error.message);
  }
};

// Admin only: creates a new staff account.
export const registerUser = (user) => client.post('/auth/register', user);
