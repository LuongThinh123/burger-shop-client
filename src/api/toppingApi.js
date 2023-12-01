import request from '~/utils/request';

export const getToppingList = async () => {
  try {
    const res = await request.get('/toppings');
    return res.records;
  } catch (err) {}
};
