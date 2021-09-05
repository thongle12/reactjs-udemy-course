import React from 'react';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Avatar, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';

ToDoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function ToDoForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter').min(5, 'too short'),
  });

  const form = useForm({
    defaultValues: {
      title: '', //phải liet ke tat ca cac field ra
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
  };

  return (
    <div>
        <Avatar>
            <LockOutlined>

            </LockOutlined>
        </Avatar>

        <Typography component="h3" variant="h5">
            Create
        </Typography>



      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* <InputField name='title' label='Todo' form={form}/> */}
      </form>
    </div>
  );
}

export default ToDoForm;
