import React, { useState } from 'react';
import { navigate } from '@reach/router';

import firebase from '../Services/Firebase';
import Form from '../Components/Form';
import { isEmail } from '../lib/InputValidation';

const CheckInFormSchema = {
  fullName: {
    name: 'fullName',
    label: 'Full Name',
    placeholder: 'Full Name',
    type: 'text',
    value: '',
    errors: [],
    required: true,
  },
  email: {
    name: 'email',
    label: 'Email',
    placeholder: 'Email',
    type: 'email',
    value: '',
    errors: [],
    required: true,
    validator: isEmail,
  },
};

export default function CheckIn({ userId, meetingId }) {
  const [errors, setErrors] = useState(null);

  const onSubmitHandle = (inputs) => {
    const ref = firebase
      .database()
      .ref(`meetings/${userId}/${meetingId}/attendees`);

    ref
      .push({
        attendeeName: inputs.fullName.value,
        attendeeEmail: inputs.email.value,
      })
      .catch((error) => {
        if (error.message !== null) {
          setErrors([error.message]);
        } else {
          setErrors(null);
        }
      });

    navigate(`/attendees/${userId}/${meetingId}`);
  };

  return (
    <Form
      title='Check In'
      btnName='Check In'
      formSchema={CheckInFormSchema}
      callback={onSubmitHandle}
      errors={errors}
    />
  );
}
