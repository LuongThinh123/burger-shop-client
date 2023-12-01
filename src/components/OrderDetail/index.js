import * as OrderApi from '~/api/orderApi';

import { memo, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import classNames from 'classnames/bind';
import { getAccessToken } from '~/utils/localStorage';
import images from '~/assets/images';
import { priceFormat } from '~/utils/priceFormat';
import styles from './OrderDetail.module.scss';

const cx = classNames.bind(styles);

function OrderDetail({ itemList, status, orderNumber, orderDate, orderId, allActiveStatusRef, ...passProps }) {
  let totalPrice = 0;
  const orderBoxRef = useRef();
  const statusChangeBtnRef = useRef();
  const statusTitleRef = useRef();
  const [_status, setStatus] = useState(status);

  // console.log('re-render order details');

  useEffect(() => {
    // console.log('call useEFFECT');
    orderBoxRef.current.style.display = 'block';
  }, [itemList]);

  // const handleChangeStatus = (status) => {
  //   const orderId = orderBoxRef.current.dataset.id;
  //   const isAllActive = allActiveStatusRef.current.classList.contains('UserOrders_active-status__6vFHY');

  //   if (isAllActive) {
  //     if (_status === 2) {
  //       statusTitleRef.current.innerHTML = 'COMPLETED';
  //     } else if (_status === 3) {
  //       statusTitleRef.current.innerHTML = 'CANCELED';
  //     }
  //     statusChangeBtnRef.current.style.display = 'none';
  //   } else {
  //     passProps.onStatusChangeUpdate(orderId);
  //   }

  //   const orderStatusChangeInfor = {
  //     orderId,
  //     status,
  //   };
  //   OrderApi.updateOrderStatus(getAccessToken(), orderStatusChangeInfor);
  // };
  const cancelOrder = () => {
    const orderId = orderBoxRef.current.dataset.id;
    setStatus('CANCELLED');
    OrderApi.updateOrderStatus(getAccessToken(), {
      id: orderId,
      status: 0,
    });
  };

  return (
    <div ref={orderBoxRef} data-id={orderId} className={cx('order-box')}>
      <div className={cx('order-id-status')}>
        <div className={cx('order-id')}>
          <h3>ORDER NUMBER: </h3>
          <span> {orderNumber}</span>
        </div>
        {_status && (
          <h2 ref={statusTitleRef} className={cx('order-status')}>
            {_status}
          </h2>
        )}
      </div>
      <div className={cx('order-product-list')}>
        {itemList
          ? itemList.map((item) => {
              totalPrice += item.product.priceSale * item.amount;
              return (
                <>
                  <div key={item.id} className={cx('order-product')}>
                    <div className={cx('product-item')}>
                      <div className={cx('product-imgBox')}>
                        <img
                          className={cx('product_img')}
                          src={`${process.env.REACT_APP_API_URL}/api/file/download?fileName=${item.product.imageName}`}
                          alt=""
                        />
                      </div>
                      <div className={cx('product-info')}>
                        <span className={cx('product-name')}>{item.product.name}</span>
                        <span className={cx('product-quantity')}>X{item.amount}</span>
                        <span className={cx('product-price')}>${item.product.priceSale}</span>
                      </div>
                    </div>
                    <span className={cx('product-total')}>${priceFormat(item.product.priceSale * item.amount)}</span>
                  </div>
                  {_status === 'PENDING' && (
                    <div className={cx('btn-action')}>
                      <button
                        onClick={() => {
                          cancelOrder();
                        }}
                        className={cx('btn-cancel')}
                      >
                        Huỷ đơn
                      </button>
                    </div>
                  )}
                </>
              );
            })
          : []}
      </div>
      <div className={cx('order-footer')}>
        <div className={cx('order-footer-date')}>
          Order date:
          <span> {orderDate}</span>
        </div>
        <div className={cx('order-totalBox')}>
          <div className={cx('order-footer-total')}>
            Total:
            <span> ${priceFormat(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OrderDetail);
