import React, { useState, useEffect } from 'react';
import { Router, navigate } from '@reach/router';
import firebase from '../Services/Firebase';

import Welcome from './Welcome';
import Navigation from './Navigation';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Meetings from '../Pages/Meetings';
import CheckIn from '../Pages/CheckIn';
import Attendees from '../Pages/Attendees';

export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((FBUser) => {
      if (FBUser) {
        setUser(FBUser);
      }
    });
  }, [user]);

  const logoutUser = (e) => {
    e.preventDefault();
    setUser(null);

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Navigation user={user} logout={logoutUser} />
      {user && <Welcome user={user} logout={logoutUser} />}
      <Router>
        <Home path='/' user={user} />
        {!user && <Login path='/login' />}
        {!user && <Register path='/register' />}
        {user && <Meetings user={user} path='/meetings' />}
        {user && <CheckIn path='/checkin/:userId/:meetingId' />}
        {user && (
          <Attendees
            path='/attendees/:userId/:meetingId'
            currentUserId={user.uid}
          />
        )}
      </Router>
    </div>
  );
}
