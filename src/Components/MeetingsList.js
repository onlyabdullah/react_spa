import React from 'react';
import MeetingsDetail from './MeetingsDetail';

export default function MeetingsList({
  meetings,
  deleteMeeting,
  checkInMeeting,
  userId,
}) {
  return (
    <ul className='list-group'>
      {meetings.map((meeting) => (
        <MeetingsDetail
          key={meeting.meetingId}
          meeting={meeting}
          deleteMeeting={deleteMeeting}
          checkInMeeting={checkInMeeting}
          userId={userId}
        />
      ))}
    </ul>
  );
}
