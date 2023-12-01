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
import styles from './ForgotPassword.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

function ForgotPassword() {
  // console.log('re-render forgot');
  const validationSchema = yup
    .object({
      username: yup.string().required('This field is required'),
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

  const handleForgotPassword = async (data) => {
    const userData = {
      username: data.username.trim(' '),
    };
    await authenApi.forget(userData);

    navigate(config.routes.recoveryPassword);
  };

  return (
    <AuthenFormWrapper className={cx('forgot_container')}>
      <form className={cx('forgot_form')} onSubmit={handleSubmit(handleForgotPassword)}>
        <h1>Forgot Password</h1>
        <p className={cx('forgot_description')}>Fill in your registration email and click continue</p>
        <div className={cx('forgot_body')}>
          <Input
            className={cx('forgot_password_input')}
            type={'text'}
            {...register('username')}
            error={errors.username}
            placeholder="Enter your username"
            rounded
          />
          <Button className={cx('forgot_btn')} primary>
            Continue
          </Button>
        </div>
      </form>
    </AuthenFormWrapper>
  );
}

export default ForgotPassword;
