import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectIsLoading } from '../../redux/auth/selectors.js';
import { registerUser, loginUser } from '../../redux/auth/operations.js';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import Button from '../Button/Button.jsx';
import { toast } from 'react-hot-toast';
import css from './RegistrationLogInForm.module.css';

export default function RegistrationLogInForm({
  isRegistration,
  onRequestClose,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);

  const registrationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const loginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
  });

  const validationSchema = isRegistration ? registrationSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async data => {
    try {
      if (isRegistration) {
        await dispatch(
          registerUser({
            name: data.name,
            email: data.email,
            password: data.password,
          })
        ).unwrap();

        toast.success('Successfully registered!');
      }

      await dispatch(
        loginUser({ email: data.email, password: data.password })
      ).unwrap();

      reset();
      onRequestClose();
      navigate('/nannies');
    } catch (err) {
      if (isRegistration) {
        toast.error('This user already exists!');
      } else {
        toast.error('Login failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isRegistration && (
        <div className={css.inputWrapper}>
          <label className={css.labelVisuallyHidden}>Name</label>
          <input
            className={css.input}
            type="text"
            {...register('name')}
            placeholder="Name"
          />
          {errors.name && (
            <p className={css.textError}>{errors.name.message}</p>
          )}
        </div>
      )}
      <div className={css.inputWrapper}>
        <label className={css.labelVisuallyHidden}>Email</label>
        <input
          className={css.input}
          type="email"
          {...register('email')}
          placeholder="Email"
        />
        {errors.email && (
          <p className={css.textError}>{errors.email.message}</p>
        )}
      </div>
      <div className={css.passwordWrapper}>
        <label className={css.labelVisuallyHidden}>Password</label>
        <div>
          <input
            className={css.input}
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
          />
          <button
            className={css.btnTogglePassword}
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>
        {errors.password && (
          <p className={css.textError}>{errors.password.message}</p>
        )}
      </div>
      <Button
        text={isRegistration ? 'Sign Up' : 'Log In'}
        type="submit"
        className={css.btnRed}
      />
      {isLoading && <p>Loading...</p>}
    </form>
  );
}
