import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FiEyeOff, FiEye } from 'react-icons/fi';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);

  // Валідація форми за допомогою Yup доповнити мін та мах
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
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
        <label>Name</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

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

      <button type="submit">Sign Up</button>
    </form>
  );
}
