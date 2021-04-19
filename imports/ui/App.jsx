import React, { useEffect, useState } from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { LoginForm } from './LoginForm'
import { Page } from './Page'

export const App = () => {
    const { user, isLoggedIn } = useTracker(() => {
        const user = Meteor.user()
        const userId = Meteor.userId()
        const isLoggingIn = Meteor.loggingIn()
        console.log('isLoggingIn', isLoggingIn)
        return { user, isLoggedIn: !!userId }
    }, [])

    if (!isLoggedIn) {
        return <LoginForm />
    }
    return (
        <div className="main">
            <Page />
        </div>
    )
}
