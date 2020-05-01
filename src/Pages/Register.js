import React, { useState } from 'react';
import { navigate } from '@reach/router';

import firebase from '../Services/Firebase';
import * as validators from '../lib/InputValidation';
import Form from '../Components/Form';

const RegisterFormSchema = {
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    type: 'text',
    value: '',
    errors: [],
    required: true,
    validator: validators.isUsername,
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    value: '',
    errors: [],
    required: true,
    validator: validators.isEmail,
  },
  passOne: {
    name: 'passOne',
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
    value: '',
    errors: [],
    required: true,
    validator: validators.isStrongPassword,
  },
  passTwo: {
    name: 'passTwo',
    label: 'Password Confirmation',
    placeholder: 'Password Confirmation',
    type: 'password',
    value: '',
    errors: [],
    required: true,
    validator: validators.isPasswordConfirmation,
  },
};

export default function Register() {
  const [errors, setErrors] = useState(null);

  const updateUser = (username) => {
    firebase.auth().onAuthStateChanged((FBUser) => {
      FBUser.updateProfile({
        displayName: username,
      })
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
    });
  };

  const onSubmitHandle = (inputs) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(inputs.email.value, inputs.passOne.value)
      .then(() => {
        updateUser(inputs.username.value);
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
      title='Register'
      btnName='Register'
      formSchema={RegisterFormSchema}
      callback={onSubmitHandle}
      errors={errors}
    />
  );
}
