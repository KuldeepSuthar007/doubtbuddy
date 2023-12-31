import React, { useState } from 'react'
// import style from "./Registration.module.css"
import StudentRegistration from '../../components/StudentRegistration/StudentRegistration'
import TutorRegistration from '../../components/TutorRegistration/TutorRegistration'

function Registration() {
    const [registeredUser, setRegisteredUser] = useState(null);

    const handleRegistration = (userData) => {
        setRegisteredUser(userData);
    };
    return (
        <div>
            {!registeredUser && (
                <div>
                    <StudentRegistration onRegistration={handleRegistration} />
                    <hr />
                    <TutorRegistration onRegistration={handleRegistration} />
                </div>
            )}

            {registeredUser && (
                <div>
                    <h2>Registration Successful!</h2>
                    <p>User Role: {registeredUser.role}</p>
                </div>
            )}
        </div>
    )
}

export default Registration