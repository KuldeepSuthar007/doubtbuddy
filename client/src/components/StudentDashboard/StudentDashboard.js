import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import style from './StudentDashboard.module.css'
import axios from "axios";
import DoubtHistory from '../DoubtHistory/DoubtHistory';
import io from 'socket.io-client';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


function StudentDashboard({ user, ongoingSessions, doubtHistory }) {
    const [userdata, setUserdata] = useState({})
    const [socket, setSocket] = useState(null);
    const navigate = useNavigate();

    const onLogout = () => {
        navigate("/")
        localStorage.clear();
    }


    useEffect(() => {
        const socket = io.connect('http://localhost:4000');
        socket.emit('joinTutorRoom', 'student');

        setSocket(socket);

        socket.on('doubtNotAccepted', ({ message }) => {

            console.log(message);
        });
        return () => {

            socket.disconnect();
        };
    }, []);


    useEffect(() => {
        const fetchdetail = async () => {
            const studentid = localStorage.getItem("studentid");
            try {
                const reqUrl = `${backendUrl}student/detail-student/${studentid}`;
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
        <div className={style.mainsd}>
            <Header />
            <h2>Welcome, {userdata.studentName}!</h2>
            <div>
                <div className={style.sectionbox}>
                    <section>
                        <h3>Profile Information</h3>
                        {/* Display student profile information */}
                        <p>Name:{userdata.studentName}</p>
                        <p>Email:{userdata.studentEmail}</p>
                        <p>Class Grade: {userdata.studentClassGrade}</p>
                        <p>Language:{userdata.studentLanguage}</p>
                        <button className={style.logbtn} onClick={onLogout}>Logout</button>
                    </section>

                    <section>
                        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Create Your Doubt <br /> Request Here</h3>
                        <button className={style.btn} onClick={() => navigate('/doubt/create')}>Create Doubt</button>
                    </section>
                    <section>
                        <h3>Doubt History</h3>
                        <DoubtHistory />
                    </section>
                </div>
            </div>

        </div>
    )
}

export default StudentDashboard

