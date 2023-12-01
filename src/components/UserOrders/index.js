import * as OrderApi from '~/api/orderApi';

import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OrderDetail from '~/components/OrderDetail';
import classNames from 'classnames/bind';
import { dayFormat } from '~/utils/dateFormat';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { getAccessToken } from '~/utils/localStorage';
import styles from './UserOrders.module.scss';

const cx = classNames.bind(styles);

function UserOrders() {
  const [orderStatus, setOrderStatus] = useState(0);
  const [orders, setOrders] = useState([]);
  const allActiveStatusRef = useRef();
  // console.log('re render userOrders');

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await OrderApi.getOrders(getAccessToken(), orderStatus);

      setOrders(
        orders.filter((o) => {
          if (!orderStatus) return true;
          return o.status === orderStatus;
        }),
      );
    };
    fetchOrders();
  }, [orderStatus]);

  const onStatusChangeUpdate = useCallback(
    (id) => {
      setOrders(orders.filter((order) => order.id !== id));
    },
    [orders],
  );

  return (
    <div className={cx('user-orders')}>
      <div className={cx('order-status')}>
        <Button
          ref={allActiveStatusRef}
          className={cx('status', orderStatus === 0 && 'active-status')}
          onClick={() => setOrderStatus(0)}
        >
          All
        </Button>
        <Button
          className={cx('status', orderStatus === 1 && 'active-status')}
          onClick={() => setOrderStatus('PENDING')}
        >
          Pending
        </Button>
        <Button
          className={cx('status', orderStatus === 2 && 'active-status')}
          onClick={() => setOrderStatus('COMPLETED')}
        >
          Completed
        </Button>
        <Button
          className={cx('status', orderStatus === 3 && 'active-status')}
          onClick={() => setOrderStatus('CANCELED')}
        >
          Canceled
        </Button>
      </div>
      <div className={cx('orders')}>
        {orders != null && orders.length !== 0 ? (
          orders.map((order) => {
            return (
              <OrderDetail
                key={order.id}
                orderNumber={order.id}
                orderId={order.id}
                status={order.status}
                itemList={order.billDetails}
                allActiveStatusRef={allActiveStatusRef}
                onStatusChangeUpdate={onStatusChangeUpdate}
                orderDate={dayFormat(order.createdAt)}
              />
            );
          })
        ) : (
          <div className={cx('orders-empty')}>
            <FontAwesomeIcon className={cx('orders-empty-icon')} icon={faFileInvoiceDollar} />
            <h3 className={cx('orders-empty-title')}>There is no order yet</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserOrders;
