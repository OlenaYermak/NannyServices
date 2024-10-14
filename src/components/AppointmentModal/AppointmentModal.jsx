import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from 'react-modal';
import { toast } from 'react-hot-toast';

import TimeSelect from '../TimeSelect/TimeSelect.jsx';
import Paragraph from '../Paragraph/Paragraph.jsx';
import Button from '../Button/Button.jsx';
import css from './AppointmentModal.module.css';

Modal.setAppElement('#root');

const schema = yup.object().shape({
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
  childAge: yup.string().required('Child age is required'),
  appointmentTime: yup.string().required('Appointment time is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  parentName: yup.string().required('Parent name is required'),
  comment: yup.string().optional(),
});

export default function AppointmentModal({ isOpen, onRequestClose, nanny }) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
    toast.success('Appointment successfully submitted!');

    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closeButton} onClick={onRequestClose}>
        <FiX className={css.icon} />
      </button>
      <h2 className={css.modalTitle}>Make an appointment with a babysitter</h2>
      <Paragraph
        text={
          'Arranging a meeting with a caregiver for your child is the first step to creating a safe and comfortable environment. Fill out the form below so we can match you with the perfect care partner.'
        }
      />
      <div className={css.imgNameWrapper}>
        <img className={css.image} src={nanny.avatar_url} alt={nanny.name} />
        <div className={css.nannyNameWrapper}>
          <p className={css.textNanny}>Your nanny</p>
          <p className={css.nameNanny}>{nanny.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.inputWrapper}>
          <div className={css.wrapperForError}>
            <label className={css.labelVisuallyHidden}>Address</label>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input className={css.input} {...field} placeholder="Address" />
              )}
            />
            {errors.address && (
              <p className={css.error}>{errors.address.message}</p>
            )}
          </div>

          <div className={css.wrapperForError}>
            <label className={css.labelVisuallyHidden}>Phone</label>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input className={css.input} {...field} placeholder="+380" />
              )}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className={css.inputWrapper}>
          <div className={css.wrapperForError}>
            <label className={css.labelVisuallyHidden}>Child's age</label>
            <Controller
              name="childAge"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  className={css.input}
                  {...field}
                  placeholder="Child's age"
                />
              )}
            />
            {errors.childAge && (
              <p className={css.error}>{errors.childAge.message}</p>
            )}
          </div>

          <div className={css.wrapperForError}>
            <label className={css.labelVisuallyHidden}>Appointment Time</label>
            <Controller
              name="appointmentTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TimeSelect
                  selectedTime={field.value}
                  onTimeChange={time => setValue('appointmentTime', time)}
                />
              )}
            />
            {errors.appointmentTime && (
              <p className={css.error}>{errors.appointmentTime.message}</p>
            )}
          </div>
        </div>

        <div className={css.wrapperForError}>
          <label className={css.labelVisuallyHidden}>Email</label>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className={css.input}
                type="email"
                {...field}
                placeholder="Email"
              />
            )}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>

        <div className={css.wrapperForError}>
          <label className={css.labelVisuallyHidden}>Parent's Name</label>
          <Controller
            name="parentName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className={css.input}
                {...field}
                placeholder="Father's or mother's name"
              />
            )}
          />
          {errors.parentName && (
            <p className={css.error}>{errors.parentName.message}</p>
          )}
        </div>

        <div>
          <label className={css.labelVisuallyHidden}>Comment</label>
          <Controller
            name="comment"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <textarea
                {...field}
                className={css.textarea}
                placeholder="Comments"
              />
            )}
          />
        </div>

        <Button className={css.btnRed} text={'Send'} type="submit" />
      </form>
    </Modal>
  );
}
