import * as cartApi from '~/api/cartApi';

import {
  getAccessToken,
  getTotalCartProducts,
  removeCartProductsItem,
  updateCartProductsItem,
} from '~/utils/localStorage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputQuantity from '~/components/InputQuantity';
import classNames from 'classnames/bind';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { priceFormat } from '~/utils/priceFormat';
import styles from './CartPageProduct.module.scss';
import { useRef } from 'react';

const cx = classNames.bind(styles);

function CartPageProduct({ data, subTotalRef, totalRef, ...passProp }) {
  console.log('re-render cart product', data);
  const inputRef = useRef();
  const totalAmountRef = useRef();
  const productRef = useRef();

  const handleDeleteItem = (id) => {
    productRef.current.remove();
    const productId = id;

    removeCartProductsItem(productId);
    passProp.onUpdateRemoveChange();

    const productTotalPrice = priceFormat(getTotalCartProducts());
    subTotalRef.current.innerHTML = `$${productTotalPrice}`;
    totalRef.current.innerHTML = `$${productTotalPrice}`;

    cartApi.deleteCartItem(getAccessToken(), productId);
  };

  const handleOnchageQuantity = () => {
    const productId = inputRef.current.dataset.id;
    const amount = inputRef.current.value;

    totalAmountRef.current.innerHTML = `$${priceFormat(amount * data.product.priceSale)}`;
    updateCartProductsItem(productId, amount);
    const productTotalPrice = priceFormat(getTotalCartProducts());
    subTotalRef.current.innerHTML = `$${productTotalPrice}`;
    totalRef.current.innerHTML = `$${productTotalPrice}`;

    cartApi.updateCartItem(getAccessToken(), {
      product: data.product,
      amount: +amount,
    });
  };

  return (
    <div className={cx('product')} ref={productRef}>
      <div className={cx('product_item')}>
        <div className={cx('product_imgBox')}>
          <img
            className={cx('product_img')}
            src={`${process.env.REACT_APP_API_URL}/api/file/download?fileName=${data.product.imageName}`}
            alt=""
          />
        </div>
        <div className={cx('product_infor')}>
          <h3 className={cx('product_name')}>{data.product.name}</h3>
          <div className={cx('delete_icon')}>
            <FontAwesomeIcon
              className={cx('deleteIcon')}
              icon={faCircleXmark}
              data-id={data.id}
              onClick={() => handleDeleteItem(data.id)}
            ></FontAwesomeIcon>
          </div>
        </div>
      </div>
      <div className={cx('product_price')}>
        <span className={cx('price_amount')}>${data.product.priceSale}</span>
      </div>
      <div className={cx('product_quantity')}>
        <InputQuantity
          ref={inputRef}
          productId={data.id}
          value={data.amount}
          className={cx('cartItem_quantity')}
          onCallApi={handleOnchageQuantity}
        />
      </div>
      <div className={cx('product_total')}>
        <span ref={totalAmountRef} className={cx('total_amount')}>
          ${priceFormat(Number(data.product.priceSale) * Number(data.amount))}
        </span>
      </div>
    </div>
  );
}

export default CartPageProduct;
