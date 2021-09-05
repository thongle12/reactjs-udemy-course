import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';
Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();

  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      //auto set username = email
      values.username = values.email;

      console.log('Form submit', values);
      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction); // lấy kq từ action object

      //close dialog khi register xong
      const {closeDialog} = props //destructuring
      if(closeDialog){
        closeDialog();
      }

      //show notistack
      enqueueSnackbar('register successfully', {variant: 'success'});

    } catch (error) {
      // console.log('fail to regis', error);
      enqueueSnackbar(error.message, {variant: 'error' });

    }
  };

  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
