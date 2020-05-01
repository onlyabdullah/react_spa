import React from 'react';
import { FaPlus } from 'react-icons/fa';

import Form from './Form';

const AddMeetingFormSchema = {
  addMeeting: {
    name: 'addMeeting',
    label: 'Add Meeting',
    placeholder: 'Add Meeting',
    type: 'text',
    value: '',
    errors: [],
    required: true,
  },
};

export default function AddMeetingForm({ addMeeting }) {
  return (
    <Form
      btnName={
        <div>
          <FaPlus /> Add Meeting
        </div>
      }
      callback={addMeeting}
      formSchema={AddMeetingFormSchema}
      title='Add a Meeting'
    />
  );
}
