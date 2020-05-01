import React from 'react';
import AttendeesDetail from './AttendeesDetail';

export default function AttendeesList({
  attendees,
  deleteAttendee,
  isAdmin,
  starAttendee,
}) {
  return (
    <ul className='list-group'>
      {attendees.map((attendee) => (
        <AttendeesDetail
          key={attendee.attendeeId}
          attendee={attendee}
          deleteAttendee={deleteAttendee}
          isAdmin={isAdmin}
          starAttendee={starAttendee}
        />
      ))}
    </ul>
  );
}
