import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must not exceed 20 characters'),
  });

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FiEye /> : <FiEyeOff />}
        </button>
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button type="submit">Log In</button>
    </form>
  );
}
