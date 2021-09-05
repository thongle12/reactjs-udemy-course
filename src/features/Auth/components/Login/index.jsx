import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Register.propTypes = {
  closeDialog: PropTypes.func,
};

function Register(props) {
  const dispatch = useDispatch();

  const {enqueueSnackbar} = useSnackbar();

  const handleSubmit = async (values) => {
    try {
     

      console.log('Form submit', values);
      const action = login(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction); // lấy kq từ action object

      //close dialog khi register xong
      const {closeDialog} = props //destructuring
      if(closeDialog){
        closeDialog();
      }
    } catch (error) {
      // console.log('fail to regis', error);
      enqueueSnackbar(error.message, {variant: 'error' });

    }
  };

  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
