import React, { useState, useEffect } from 'react';

import firebase from '../Services/Firebase';
import AttendeesList from '../Components/AttendeesList';
import SearchForm from '../Components/SearchForm';

export default function Attendees({ userId, meetingId, currentUserId }) {
  const [attendees, setAttendees] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const ref = firebase
      .database()
      .ref(`meetings/${userId}/${meetingId}/attendees`);

    ref.on('value', (snapshot) => {
      let attendeesList = [];

      if (snapshot.val()) {
        // eslint-disable-next-line array-callback-return
        Object.entries(snapshot.val()).map(([key, value]) => {
          attendeesList.push({
            attendeeId: key,
            attendeeEmail: value.attendeeEmail,
            attendeeName: value.attendeeName,
            star: value.star,
          });
        });

        setAttendees(attendeesList);
      }
    });

    const admin = currentUserId === userId ? true : false;
    setIsAdmin(admin);

    return () => ref.off();
  }, [userId, meetingId, currentUserId]);

  const deleteAttendee = (e, attendeeId) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${userId}/${meetingId}/attendees/${attendeeId}`);
    ref.remove().catch((error) => {
      console.error(error);
    });
  };

  const starAttendee = (e, star, attendeeId) => {
    e.preventDefault();
    const ref = firebase
      .database()
      .ref(`meetings/${userId}/${meetingId}/attendees/${attendeeId}`);

    if (star === undefined) {
      ref.update({ star: true });
    } else {
      ref.update({ star: !star });
    }
  };

  const handleOnSearch = (query) => {
    const dataFilter = (attendee) => {};
  };

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 text-center'>
          <div className='card mt-3'>
            <div className='card-header'>Attendees List</div>
            <SearchForm handleOnSearch={handleOnSearch} query={query} />

            {attendees && (
              <AttendeesList
                attendees={attendees}
                deleteAttendee={deleteAttendee}
                isAdmin={isAdmin}
                starAttendee={starAttendee}
              />
            )}
            {!attendees && (
              <div className='align-self-center my-3'>
                The meeting doesn't have any attendees
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
