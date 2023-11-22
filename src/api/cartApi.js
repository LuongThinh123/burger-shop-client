import request from '~/utils/request';

export const addToCart = async (accessToken, product, navigate) => {
  try {
    const result = await request.post(`/cart`, product, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (result.status === 401) navigate('/login');
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getCartProducts = async (accessToken) => {
  try {
    const result = await request.get(`/cart`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const updateCartItem = async (accessToken, product) => {
  try {
    const result = await request.put(`/cart`, product, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const deleteCartItem = async (accessToken, id) => {
  try {
    const result = await request.delete(`/cart?id=${id}`, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result;
  } catch (err) {
    console.log(err);
  }
};
