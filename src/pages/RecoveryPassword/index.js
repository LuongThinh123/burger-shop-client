import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

import AuthenFormWrapper from '~/components/AuthenFormWrapper';
import Button from '~/components/Button';
import { useAuthenContext } from '~/customHook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as authenApi from '~/api/authenApi';
import Input from '~/components/Input';
import styles from './RecoveryPassword.module.scss';
import config from '~/config';
import routes from '~/config/routes';

const cx = classNames.bind(styles);

function RecoveryPassword() {
  const validationSchema = yup
    .object({
      OTP: yup.string().required('This field is required'),
      username: yup.string().required('This field is required'),
      password: yup.string().required('This field is required').min(6).max(15),
      confirmPassword: yup
        .string()
        .required('This field is required')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: yupResolver(validationSchema),
  });

  const [, authenDispatch] = useAuthenContext();
  const navigate = useNavigate();

  const handleRecoveryPassword = async (data) => {
    const userData = {
      OTP: data.OTP.trim(' '),
      username: data.username.trim(' '),
      password: data.password,
    };
    const res = await authenApi.recovery(userData);
    if (!res.error) {
      navigate(routes.login);
    } else {
      alert(res.error);
    }
  };

  return (
    <AuthenFormWrapper className={cx('login_container')}>
      <h1>Recovery Password</h1>
      <form className={cx('login_form')} onSubmit={handleSubmit(handleRecoveryPassword)}>
        <div className={cx('login_body')}>
          <Input
            {...register('OTP', {
              required: true,
            })}
            error={errors.OTP}
            type={'text'}
            placeholder="Enter your OTP"
            className={cx('feild')}
            inputClass={cx('form-input')}
          />
          <Input
            {...register('username', {
              required: true,
            })}
            error={errors.username}
            type={'text'}
            placeholder="Enter your username"
            className={cx('feild')}
            inputClass={cx('form-input')}
          />
          <Input
            {...register('password', {
              required: true,
            })}
            error={errors.password}
            type={'password'}
            placeholder="Enter your new password"
            className={cx('feild')}
            inputClass={cx('form-input')}
          />
          <Input
            {...register('confirmPassword', {
              required: true,
            })}
            error={errors.confirmPassword}
            type={'password'}
            placeholder="Comfirm your password"
            className={cx('feild')}
            inputClass={cx('form-input')}
            rounded
          />
          {/* <div className={cx('login_options')}>
            <label className={cx('rememberMe_checkbox')}>
              <input type="checkbox" value="remember me"></input>
              <span className={cx('checkbox_title')}>Remember me</span>
            </label>
            <div className={cx('forgot_password')}>
              <Link className={cx('forgot_password_link')} to="/forgot">
                <span className={cx('forgot_password_title')}>Forgot password?</span>
              </Link>
            </div>
          </div> */}
          <Button className={cx('signIn_btn')} primary>
            Confirm
          </Button>
        </div>
      </form>
      {/* <div className={cx('connect_options')}>
        <div className={cx('connect_facebook')}>
          <FontAwesomeIcon className={cx('facebook_icon')} icon={faFacebookF} />
          <span className={cx('connect_facebook_title')}>Sign in with facebook</span>
        </div>
        <div className={cx('connect_google')}>
          <FontAwesomeIcon className={cx('google_icon')} icon={faGoogle} />
          <span className={cx('connect_google_title')}>Sign in with google</span>
        </div>
      </div> */}
    </AuthenFormWrapper>
  );
}

export default RecoveryPassword;
