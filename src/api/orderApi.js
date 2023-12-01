import request from '~/utils/request';

export const addOrder = async (accessToken, orderInfor) => {
  try {
    const result = await request.post(`/bills`, orderInfor, { headers: { Authorization: `Bearer ${accessToken}` } });
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const getOrders = async (accessToken, status) => {
  try {
    const params = {
      status: status,
    };
    const result = await request.get(`/bills`, { headers: { Authorization: `Bearer ${accessToken}` }, params });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const updateOrderStatus = async (accessToken, orderStatusChangeInfor) => {
  try {
    const result = await request.put(`/orders/cancel`, orderStatusChangeInfor, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
