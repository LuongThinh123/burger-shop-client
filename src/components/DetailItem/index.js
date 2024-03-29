import 'react-loading-skeleton/dist/skeleton.css';

import * as cartApi from '~/api/cartApi';

import { memo, useRef } from 'react';

import Image from '~/components/Image';
import InputQuantity from '~/components/InputQuantity';
import Skeleton from 'react-loading-skeleton';
import { addNotification } from '~/reducers/actions/toastAction';
import classNames from 'classnames/bind';
import { getAccessToken } from '~/utils/localStorage';
import styles from './DetailItem.module.scss';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);
// const data = {};
function DetailItem({ data, toastDispatch }) {
  const navigate = useNavigate();
  // const [, toastDispatch] = useToastContext();
  const inputQuantityRef = useRef();
  console.log('re-renderr detail item');

  const handleAddToCart = (productId) => {
    console.log('Add to cart');
    console.log(productId);

    const product = {
      product: data,
      amount: inputQuantityRef.current.value,
    };
    cartApi.addToCart(getAccessToken(), product, navigate);

    toastDispatch(
      addNotification({
        id: uuidv4(),
        type: 'SUCCESS',
        title: 'Successfuly add to cart',
        message: 'Successfully received cart product',
      }),
    );
  };

  return (
    <div className={cx('detail-item')}>
      <div className={cx('detail-item__slider')}>
        <div className={cx('item-imgBx')}>
          {data.imageName ? (
            <Image
              className={cx('item-img')}
              src={
                data.imageName ? `${process.env.REACT_APP_API_URL}/api/file/download?fileName=${data.imageName}` : ''
              }
              alt=""
            />
          ) : (
            <Skeleton height={'100%'} />
          )}
        </div>
      </div>

      <div className={cx('item-infor')}>
        <h1 className={cx('item-title')}>{data.name || <Skeleton count={0.5} />}</h1>
        <div className={cx('item-price-status')}>
          <span className={cx('item-price')}>{data.priceSale ? `$${data.priceSale}` : <Skeleton width={50} />}</span>
          <span className={cx('item-status')}>{data.name && 'On stock'}</span>
        </div>

        <div className={cx('item-description')}>{data.description || <Skeleton count={2.5} />}</div>

        {data.name ? (
          <div className={cx('item__variation')}>
            <InputQuantity ref={inputQuantityRef} value={1} rounded className={cx('item-input')} />
            <button className={cx('add-to-cart-btn', 'addToCart')} onClick={() => handleAddToCart(data.id)}>
              Add to cart
            </button>
          </div>
        ) : (
          <Skeleton count={0.5} height={50} />
        )}

        {data.name && (
          <>
            <div className={cx('item__meta')}>
              <span className={cx('sku__wrapper')}>
                Product-id:
                <span className={cx('sku__value')}> {data.id}</span>
              </span>
              <span className={cx('item__meta-Category')}>
                Category:
                <span className={cx('meta-Category_value')}> {data.category.name}</span>
              </span>
              <span className={cx('item__meta-tags')}>
                Tags:
                <span className={cx('meta-tags_value')}> {data.category.name}</span>
              </span>
            </div>

            <div className={cx('icon-bar')}>
              {/* <i class="fab fa-facebook icon-facebook"></i>
          <i class="fab fa-twitter icon-twitter"></i>
          <i class="fas fa-envelope icon-envelope"></i>
          <i class="fab fa-facebook-messenger icon-messenger"></i> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(DetailItem);
