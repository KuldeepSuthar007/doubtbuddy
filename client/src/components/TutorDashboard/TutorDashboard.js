import React, { useState, useEffect } from 'react'
import style from './TutorDashboard.module.css'
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header'
import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


function TutorDashboard({ user, activeSessions }) {
    const [userdata, setUserdata] = useState({})
    const navigate = useNavigate();
    const onLogout = () => {
        navigate("/")
        localStorage.clear();
    }

    useEffect(() => {
        const fetchdetail = async () => {
            const tutorid = localStorage.getItem("tutorid");
            try {
                const reqUrl = `${backendUrl}tutor/detail-tutor/${tutorid}`;
                const response = await axios.get(reqUrl);
                setUserdata(response.data);

                return response;
            } catch (error) {
                console.log(error);
            }
        };
        fetchdetail();
    }, []);

    return (
        <>
            <div className={style.mainsd}>
                <Header />
                <h2>Welcome,{userdata.tutorName}!</h2>
                <div>
                    <div className={style.sectionbox}>
                        <section>
                            <h3>Profile Information</h3>
                            <p>Name: {userdata.tutorName}</p>
                            <p>Email: {userdata.tutorEmail}</p>
                            <p>Teaching Class Grade: {userdata.tutorClassGrade}</p>
                            <p>Teaching Language: {userdata.tutorLanguage}</p>
                            <p>Subjects: {userdata.tutorSubjects}</p>
                            <button className={style.logbtn} onClick={onLogout}>Logout</button>
                        </section>
                        <section>
                            <h3>Active Sessions</h3>
                        </section>
                    </div>
                </div>

            </div>
            <div>

            </div>
        </>
    )
}

export default TutorDashboard


