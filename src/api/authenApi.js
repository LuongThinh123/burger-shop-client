import {
  loginFailed,
  loginSuccess,
  logoutFailed,
  logoutSuccess,
  registerFailed,
  registerSuccess,
} from '~/reducers/actions/authenAction';
import { setAccessToken, setUser } from '~/utils/localStorage';

import request from '~/utils/request';

export const login = async (user, dispatch, navigate) => {
  try {
    const res = await request.post(`/auth/login`, user);
    if (res.error) {
      return { error: 'Login failed' };
    }
    dispatch(loginSuccess(res.user));
    localStorage.clear();
    setUser(res.user);
    setAccessToken(res.accessToken || '');
    navigate('/');
  } catch (err) {
    dispatch(loginFailed());
    return { error: 'Login failed' };
  }
};

export const forget = async (userData) => {
  try {
    request.post(`/auth/forget`, userData);
  } catch (err) {
    alert('Có lỗi xảy ra');
  }
};

export const recovery = async (user) => {
  try {
    await request.post(`/auth/otp`, user);
    return { error: null };
  } catch (err) {
    return { error: err.response.data.message };
  }
};

export const register = async (user) => {
  try {
    const res = await request.post(`/auth/register`, user);
    return res;
  } catch (err) {
    return { error: err.response.data.messages.join(',') };
  }
};

export const logout = async (accessToken, dispatch, navigate) => {
  try {
    localStorage.clear();
    dispatch(logoutSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(logoutFailed(err));
    console.log(err);
  }
};
