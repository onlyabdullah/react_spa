import React from 'react';
import { FaTrash, FaStar } from 'react-icons/fa';

export default function AttendeesDetail({
  attendee,
  deleteAttendee,
  isAdmin,
  starAttendee,
}) {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <span>Name: {attendee.attendeeName}</span>
      {isAdmin && <span>Email: {attendee.attendeeEmail}</span>}
      {isAdmin && (
        <div>
          <button
            type='button'
            className={`btn mr-2 ${
              attendee.star ? 'btn-warning' : 'btn-secondary'
            }`}
            onClick={(e) => starAttendee(e, attendee.star, attendee.attendeeId)}
          >
            <FaStar color='white' />
          </button>
          <button
            type='button'
            className='btn btn-danger mr-2'
            onClick={(e) => deleteAttendee(e, attendee.attendeeId)}
          >
            <FaTrash /> Delete
          </button>
        </div>
      )}
    </li>
  );
}
