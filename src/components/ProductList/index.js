import { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';

import styles from './ProductList.module.scss';
import SortBar from '~/components/SortBar';
import ProductCard from '~/components/ProductCard';
import ProductSkeleton from '~/components/ProductSkeleton';
import Pagination from '~/components/Pagination';
import { changePage } from '~/reducers/actions/filterAction';
import * as productApi from '~/api/productApi';
import { useToastContext } from '~/customHook';
import _ from 'lodash';

const cx = classNames.bind(styles);

function ProductList({ filterState, filterDispatch }) {
  const [productListInfor, setProductListInfor] = useState({});
  const [, toastDispatch] = useToastContext();

  // console.log('re-render product list');
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        let response = await productApi.getProducts(filterState);
        console.log(response);
        // if (filterState?.order == 'asc') {
        //   if (Array.isArray(response)) {
        //     response?.records?.sort((a, b) => {
        //       return a.priceSale < b.priceSale;
        //     });
        //   }
        // } else if (filterState?.order == 'desc') {
        //   if (Array.isArray(response)) {
        //     response?.records?.sort((a, b) => {
        //       return a.priceSale > b.priceSale;
        //     });
        //   }
        // }
        let products = response.records;
        console.log(Array.isArray(products));
        console.log('Asc');
        if (filterState?.order == 'asc') {
          if (Array.isArray(products)) {
            products = products?.sort((a, b) => {
              return a.priceSale - b.priceSale;
            });
            console.log(products);
          }
        } else if (filterState?.order == 'desc') {
          console.log('desc');
          if (Array.isArray(products)) {
            products = products?.sort((a, b) => {
              return b.priceSale - a.priceSale;
            });
            console.log(products);
          }
        }
        // console.log('Product ne', products);
        response.records = [...products];
        setProductListInfor(response);
      } catch (error) {
        console.log(error);
        console.error('lỗi rồi');
      }
    };
    fetchProductList();
  }, [filterState]);

  const handleOnPageChange = useCallback(
    (currentPage) => {
      filterDispatch(changePage(currentPage));
    },
    [filterDispatch],
  );

  return (
    <div className={cx('products-box')}>
      <SortBar
        sortFilter={filterState.order}
        pageFilter={filterState.page}
        limit={productListInfor.pageSize ? productListInfor.pageSize : 6}
        totalCount={productListInfor.totalRecord ? productListInfor.totalRecord : ''}
        filterDispatch={filterDispatch}
      />
      <div className={cx('product-list')}>
        {productListInfor.records ? (
          productListInfor.records.map((data) => {
            return <ProductCard key={data.id} data={data} toastDispatch={toastDispatch} />;
          })
        ) : (
          <ProductSkeleton cards={6} />
        )}
      </div>
      <Pagination
        className="pagination-bar"
        currentPage={filterState.page}
        totalCount={productListInfor.totalRecord ? productListInfor.totalRecord : ''}
        pageSize={9}
        onPageChange={useCallback((currentPage) => handleOnPageChange(currentPage), [handleOnPageChange])}
      />
    </div>
  );
}

export default ProductList;
