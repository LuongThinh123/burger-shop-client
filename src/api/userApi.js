import request from '~/utils/request';

export const updateUserInfor = async (userInfor, accessToken) => {
  try {
    const result = await request.put(`/information`, userInfor, {
      headers: { Authorization: `Bearer ${localStorage.getItem('accessToken').replaceAll('"', '')}` },
    });
    return result;
  } catch (err) {
    return { error: err.response.data.messages.join(',') };
  }
};
