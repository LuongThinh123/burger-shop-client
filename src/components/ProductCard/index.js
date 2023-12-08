import * as cartApi from '~/api/cartApi';

import { Link, useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from '~/components/Image';
import { addNotification } from '~/reducers/actions/toastAction';
import classNames from 'classnames/bind';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { getAccessToken } from '~/utils/localStorage';
import { memo } from 'react';
import styles from './ProductCard.module.scss';
import { v4 as uuidv4 } from 'uuid';

const cx = classNames.bind(styles);

function ProductCard({ data, toastDispatch, className }) {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  console.log('re-render product');

  let handleAddToCart = (product) => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    cartApi.addToCart(
      accessToken,
      {
        product,
        amount: 1,
      },
      navigate,
    );

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
    <div className={cx('product-card', className)}>
      <Link to={`/detail/${data.id}`}>
        <div className={cx('product-img')}>
          {/* <img /> */}
          <Image src={`${process.env.REACT_APP_API_URL}/api/file/download?fileName=${data.imageName}`} alt="" />
        </div>
      </Link>
      <div className={cx('product-information')}>
        <div className={cx('product-name')}>
          <h3 className={cx('name')}>{data.name}</h3>
        </div>
        <div className={cx('product-description')}>
          <p className={cx('description')}>{data.description}</p>
        </div>
        <div className={cx('product-price')}>
          <p className={cx('price')}>${data.priceSale}</p>
        </div>
        <div className={cx('addToCart-btn')}>
          <button className={cx('addToCart')} data-id={data.id} onClick={() => handleAddToCart(data)}>
            <div className={cx('addToCart-title')}>
              <FontAwesomeIcon className={cx('cart-plus_icon')} icon={faCartPlus} />
              <p className={cx('addToCart-text')}>Add to cart</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ProductCard);
