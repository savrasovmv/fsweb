import React, {useEffect, useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { LoginForm } from './LoginForm';
import { Hello } from './Hello.jsx';
import { Info } from './Info.jsx';
import { Page } from './Page';


export const App = () => {
  const [isLogin, setIsLogin] = useState('')
  const user = useTracker(() => Meteor.user());
  useEffect(()=>{
    if (user){
      setIsLogin(true)
    }else {
      setIsLogin(false)
    }

  }, [user])
  if (isLogin === '') {return ''}

  // const api_regex = /^\/api\/.*/

  // console.log(api_regex.test(window.location.pathname))
   
    return (
      <div className="main">
        {isLogin ? (
          <Page/>
        ) : <LoginForm />
        }
      </div>

    )
      
}
