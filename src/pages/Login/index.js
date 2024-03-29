import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
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
import styles from './Login.module.scss';
import config from '~/config';
import { addNotification } from '~/reducers/actions/toastAction';
import { v4 as uuidv4 } from 'uuid';
import Toast from '~/components/Toast';

const cx = classNames.bind(styles);

function Login() {
  // console.log('re-render login');
  const validationSchema = yup
    .object({
      username: yup.string().required('This field is required'),
      password: yup.string().required('This field is required'),
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
  const [, toastDispatch] = useToastContext();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const newUser = {
      username: data.username.trim(' '),
      password: data.password,
    };

    const result = await authenApi.login(newUser, authenDispatch, navigate);

    if (result.error) {
      toastDispatch(
        addNotification({
          id: uuidv4(),
          type: 'ERROR',
          title: result.error,
          message: 'Please try again',
        }),
      );
    }
  };

  return (
    <AuthenFormWrapper className={cx('login_container')}>
      <form className={cx('login_form')} onSubmit={handleSubmit(handleLogin)}>
        <h1>Wellcome</h1>
        <div className={cx('login_body')}>
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
            placeholder="Enter your password"
            className={cx('feild')}
            inputClass={cx('form-input')}
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
            Sign in
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
      <div className={cx('register_navigate')}>
        <span className={cx('question')}>Don't have account yet ?</span>
        <Link className={cx('register_link')} to={config.routes.register}>
          <span className={cx('title')}> Register</span>
        </Link>
      </div>
      <div className={cx('forgot_navigate')}>
        <Link className={cx('forgot_link')} to={config.routes.forgotPassword}>
          <span className={cx('question')}>Forgot password?</span>
        </Link>
      </div>
      <Toast position={'top-right'} timeAutoDelete={2800} />
    </AuthenFormWrapper>
  );
}

export default Login;
