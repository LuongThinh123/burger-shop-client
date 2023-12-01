import { useState, useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import * as toppingApi from '~/api/toppingApi';
import { addTopping, deleteTopping } from '~/reducers/actions/filterAction';
import styles from './ToppingList.module.scss';
import { useFilterContext } from '~/customHook';

const cx = classNames.bind(styles);

function ToppingList() {
  const [toppingList, setToppingList] = useState([]);
  const [filterState, filterDispatch] = useFilterContext();

  console.log(toppingList);
  useEffect(() => {
    const fecthTopping = async () => {
      const result = await toppingApi.getToppingList();
      setToppingList(result);
    };
    fecthTopping();
  }, []);

  const handletoppingChecked = (input, toppingId) => {
    console.log('target', input);
    console.log('toppingId', toppingId);
    if (input.target.checked) {
      filterDispatch(addTopping(toppingId));
    } else {
      filterDispatch(deleteTopping(toppingId));
    }
  };

  return (
    <div className={cx('topping_container')}>
      <div className={cx('sidebar_header')}>
        <h3 className={cx('header')}>Topping list</h3>
      </div>
      <div className={cx('toppingList_box')}>
        <ul className={cx('topping_list')}>
          {toppingList.length !== 0 ? (
            toppingList.map((topping, index) => {
              return (
                <li key={topping.id} className={cx('topping')}>
                  <input
                    className={cx('topping-checkbox')}
                    type="checkbox"
                    id={`toppingCheck-${index}`}
                    onChange={(input) => handletoppingChecked(input, topping.id)}
                    checked={filterState.toppingIdList.includes(topping.id)}
                  />
                  <label htmlFor={`toppingCheck-${index}`} className={cx('topping-name')}>
                    {topping.name}
                  </label>
                </li>
              );
            })
          ) : (
            <>
              <Skeleton height={40} />
              <Skeleton height={40} style={{ marginTop: 15, marginBottom: 15 }} />
              <Skeleton height={40} />
              <Skeleton height={40} style={{ marginTop: 15 }} />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default memo(ToppingList);
