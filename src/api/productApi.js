import request from '~/utils/request';
import _ from 'lodash';

// const productApi = {
//   getAll: (params) => {
//     const url = '/products';
//     return axiosClient.get(url, { params });
//   },
//   get: (name) => {
//     const url = `/product/${name}`;
//     return axiosClient.get(url);
//   },
// };

export const getProducts = async (filterState) => {
  try {
    // console.log(params);
    let params = {
      page: filterState?.page,
      search: filterState?.searchTitle === '' ? null : filterState?.searchTitle,
      priceSaleFrom: filterState?.price?.[0],
      priceSaleAt: filterState?.price?.[1],
      sort: filterState?.sort === '' ? null : filterState?.sort,
      order: filterState?.order === '' ? null : filterState?.order,
      categoryId: filterState?.categoryIdList?.length > 0 ? filterState.categoryIdList : null,
      searchType: 'ADVANCED',
    };

    params = _.omitBy(params, _.isNil);

    // if (filterState?.categoryIdList?.length > 0 || !_.isEqual(filterState?.price, ['0', '30']) || filterState?.searchTitle != "" || ) {
    // }
    console.log(filterState, params);
    const result = await request.get(`/products`, { params });
    return result;
    // return params;
  } catch (err) {
    console.log(err);
  }
};

export const getProductById = async (id) => {
  try {
    const result = await request.get(`/products?id=${id}`);
    return result.records?.[0];
    // return params;
  } catch (err) {
    console.log(err);
  }
};

export const getRandomProducts = async (number) => {
  try {
    const result = await request.get(`/products`);
    return result.records;
    // return params;
  } catch (err) {
    console.log(err);
  }
};
