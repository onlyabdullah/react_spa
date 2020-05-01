import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';

import firebase from '../Services/Firebase';
import Form from '../Components/Form';

const LoginFormSchema = {
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    value: '',
    errors: [],
    required: true,
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    value: '',
    errors: [],
    required: true,
  },
};

export default function Login() {
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    return () => {
      setErrors(null);
    };
  });

  const onSubmitHandle = (inputs) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(inputs.email.value, inputs.password.value)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        if (error.message !== null) {
          setErrors([error.message]);
        } else {
          setErrors(null);
        }
      });
  };

  return (
    <Form
      title='Login'
      btnName='Login'
      formSchema={LoginFormSchema}
      callback={onSubmitHandle}
      errors={errors}
    />
  );
}
