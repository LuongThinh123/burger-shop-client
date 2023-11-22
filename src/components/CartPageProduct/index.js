import { useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

import styles from './CartPageProduct.module.scss';
import * as cartApi from '~/api/cartApi';
import InputQuantity from '~/components/InputQuantity';
import {
  getAccessToken,
  updateCartProductsItem,
  removeCartProductsItem,
  getTotalCartProducts,
} from '~/utils/localStorage';
import { priceFormat } from '~/utils/priceFormat';
const cx = classNames.bind(styles);

function CartPageProduct({ data, subTotalRef, totalRef, ...passProp }) {
  console.log('re-render cart product');
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
            src={`http://localhost:8080/api/file/download?fileName=${data.imageName}`}
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
