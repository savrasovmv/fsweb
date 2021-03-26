import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Page } from './Page';


export const App = () => {
  const user = useTracker(() => Meteor.user());

  return (
    <div className="main">
      {user ? (
        <Page/>
      ) : <LoginForm />
      }
    </div>

  )
}
