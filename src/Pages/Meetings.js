import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';

import firebase from '../Services/Firebase';
import AddMeetingForm from '../Components/AddMeetingForm';
import MeetingList from '../Components/MeetingsList';

export default function Meetings({ user }) {
  const [meetings, setMeetings] = useState(null);

  useEffect(() => {
    const ref = firebase.database().ref(`meetings/${user.uid}`);
    ref.on('value', (snapshot) => {
      let meetingsList = [];

      if (snapshot.val()) {
        // eslint-disable-next-line array-callback-return
        Object.entries(snapshot.val()).map(([key, value]) => {
          meetingsList.push({
            meetingId: key,
            meetingName: value.meetingName,
          });
        });

        setMeetings(meetingsList);
      }
    });

    return () => ref.off();
  }, [user]);

  const addMeeting = (meeting) => {
    const ref = firebase.database().ref(`meetings/${user.uid}`);
    ref.push({ meetingName: meeting.addMeeting.value }).catch((error) => {
      console.error(error);
    });
  };

  const deleteMeeting = (e, meetingId) => {
    e.preventDefault();
    const ref = firebase.database().ref(`meetings/${user.uid}/${meetingId}`);
    ref.remove().catch((error) => {
      console.error(error);
    });
  };

  const checkInMeeting = (meetingId) => {
    navigate(`/checkin/${user.uid}/${meetingId}`);
  };

  return (
    <div className='container mt-4'>
      <div className='row justify-content-center'>
        <div className='col-md-8 text-center'>
          <AddMeetingForm addMeeting={addMeeting} />
          <div className='card mt-3'>
            <div className='card-header'>Your Meetings</div>
            {meetings && (
              <MeetingList
                meetings={meetings}
                deleteMeeting={deleteMeeting}
                checkInMeeting={checkInMeeting}
                userId={user.uid}
              />
            )}
            {!meetings && (
              <div className='align-self-center my-3'>
                You don't have any meetings
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
