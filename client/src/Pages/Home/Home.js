import React from 'react'
import { useNavigate } from "react-router-dom";
import style from './Home.module.css';
import Header from '../../components/Header/Header';
function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div>
                <Header />
                <div className={style.tutor}>
                    <h1>Join DoubtBuddy, Reap Benefits</h1>
                    <p >
                        We streamline the Q&A Process.Begin your online Tutoring Journey by explaining the subjects you are passionate about . <br />Grow with us on the fastest growing Q&A Solving platform . <br />Our job is to make your knowledge worth its money.
                    </p>
                    <h3 >Became A Tutor With DoubtBuddy</h3>
                    <button className={style.btn} onClick={() => navigate("/register/tutor")}>REGISTER NOW</button>
                </div>
                <div className={style.student}>
                    <h1>Instant Connect</h1>
                    <p >
                        Get connected with a tutor in just 40 seconds! <br />Whether your exams are a month or a day after, we’ve got the perfect on-spot instant solution for you
                    </p>
                    <h1>Personalized</h1>
                    <p>Every student is special and needs to be catered in their own way. <br /> Have 1-1 sessions with India’s top tutors and learn at your own pace!</p>

                    <h3>Became A Student With DoubtBuddy</h3>

                    <button className={style.btn} onClick={() => navigate("/register/student")}>REGISTER NOW</button>
                </div>
            </div>
        </>

    )
}

export default Home