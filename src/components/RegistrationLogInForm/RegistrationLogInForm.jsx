import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';

import styles from './RegistrationLogInForm.module.css';
import './RegistrationLogInForm.css'; // Створюємо файл для стилів

export default function RegistrationLogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistration, setIsRegistration] = useState(true); // Визначаємо, яку форму показувати

  // Валідація для реєстрації
  const registrationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  // Валідація для логіна
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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <div>
      {/* Кнопки для перемикання між формами винести в хедер*/}
      <div className={styles.btnWrapper}>
        <button
          className={isRegistration ? 'active' : ''}
          onClick={() => setIsRegistration(true)}
        >
          Registration
        </button>
        <button
          className={!isRegistration ? 'active' : ''}
          onClick={() => setIsRegistration(false)}
        >
          Log In
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {isRegistration && (
          <div>
            <label className="hidden-label">Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter your name"
            />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        )}

        <div>
          <label className="hidden-label">Email</label>
          <input
            type="email"
            {...register('email')}
            placeholder="Enter your email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label className="hidden-label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            {...register('password')}
            placeholder="Enter your password"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">{isRegistration ? 'Sign Up' : 'Log In'}</button>
      </form>
    </div>
  );
}
