import classNames from 'classnames/bind';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';

import AuthenFormWrapper from '~/components/AuthenFormWrapper';
import Button from '~/components/Button';
import { useAuthenContext, useToastContext } from '~/customHook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as authenApi from '~/api/authenApi';
import Input from '~/components/Input';
import styles from './RecoveryPassword.module.scss';
import config from '~/config';
import routes from '~/config/routes';
import { addNotification } from '~/reducers/actions/toastAction';
import { v4 as uuidv4 } from 'uuid';
import Toast from '~/components/Toast';

const cx = classNames.bind(styles);

function RecoveryPassword() {
  const validationSchema = yup
    .object({
      OTP: yup.string().required('This field is required'),
      // username: yup.string().required('This field is required'),
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

  const params = useParams();
  const { userName } = params;

  const [, authenDispatch] = useAuthenContext();
  const [, toastDispatch] = useToastContext();

  const navigate = useNavigate();

  const handleRecoveryPassword = async (data) => {
    console.log(userName);
    const userData = {
      OTP: data.OTP.trim(' '),
      username: userName,
      password: data.password,
    };
    const res = await authenApi.recovery(userData);
    if (!res.error) {
      navigate(routes.login);
    } else {
      toastDispatch(
        addNotification({
          id: uuidv4(),
          type: 'ERROR',
          title: res.error,
          message: 'Please try again',
        }),
      );
    }
  };

  return (
    <AuthenFormWrapper className={cx('recovery_container')}>
      <h1 className={cx('recovery_title')}>Recovery Password</h1>
      <p className={cx('recovery_description')}>Please enter the OTP sent to your email and create a new password</p>
      <form className={cx('recovery_form')} onSubmit={handleSubmit(handleRecoveryPassword)}>
        <div className={cx('recovery_body')}>
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
          {/* <Input
            {...register('username', {
              required: true,
            })}
            error={errors.username}
            type={'text'}
            placeholder="Enter your username"
            className={cx('feild')}
            inputClass={cx('form-input')}
          /> */}
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
          <Button className={cx('confirm_btn')} primary>
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
      <Toast position={'top-right'} timeAutoDelete={2800} />
    </AuthenFormWrapper>
  );
}

export default RecoveryPassword;
