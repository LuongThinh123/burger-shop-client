import request from '~/utils/request';

export const updateUserInfor = async (userInfor, accessToken) => {
  try {
    const result = await request.put(`/users`, userInfor, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken').replaceAll('"', '')}` },
    });
    return result;
  } catch (err) {
    console.log(err);
  }
};
