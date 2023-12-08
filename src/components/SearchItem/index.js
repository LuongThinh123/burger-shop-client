import Image from '~/components/Image';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import images from '~/assets/images';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ data, onClick }) {
  return (
    <Link to={`/detail/${data.id}`} className={cx('wrapper')} onClick={onClick}>
      <Image
        className={cx('product_img')}
        src={`${process.env.REACT_APP_API_URL}/api/file/download?fileName=${data.imageName}`}
      />
      <div className={cx('info')}>
        <h4 className={cx('name')}>
          <span>{data.name}</span>
          {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
        </h4>
        <span className={cx('price')}>${data.priceSale}</span>
      </div>
    </Link>
  );
}

export default SearchItem;
