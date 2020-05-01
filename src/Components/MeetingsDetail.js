import React from 'react';
import { FaTrash, FaLink, FaUser } from 'react-icons/fa';
import { navigate } from '@reach/router';

export default function MeetingsDetail({
  meeting,
  deleteMeeting,
  checkInMeeting,
  userId,
}) {
  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <span>{meeting.meetingName}</span>
      <div>
        <button
          type='button'
          className='btn btn-danger mr-2'
          onClick={(e) => deleteMeeting(e, meeting.meetingId)}
        >
          <FaTrash /> Delete
        </button>
        <button
          type='button'
          className='btn btn-success mr-2'
          onClick={() => checkInMeeting(meeting.meetingId)}
        >
          <FaLink /> Check In
        </button>
        <button
          type='button'
          className='btn btn-primary'
          onClick={() => navigate(`/attendees/${userId}/${meeting.meetingId}`)}
        >
          <FaUser /> Attendees
        </button>
      </div>
    </li>
  );
}
