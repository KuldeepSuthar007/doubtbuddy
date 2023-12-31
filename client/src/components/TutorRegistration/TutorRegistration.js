import React, { useState } from 'react'
import { tutorRegistration } from '../../apis/auth'
import { useNavigate } from "react-router-dom";
import style from './TutorR.module.css';

function TutorRegistration() {
    const [formData, setFormData] = useState({
        tutorName: '',
        tutorEmail: '',
        tutorPassword: '',
        tutorClassGrade: '',
        tutorLanguage: '',
        tutorSubjects: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await tutorRegistration({ role: 'tutor', ...formData });
            setFormData({
                tutorName: '',
                tutorEmail: '',
                tutorPassword: '',
                tutorClassGrade: '',
                tutorLanguage: '',
                tutorSubjects: '',
            })
            navigate("/login")

        } catch (error) {
            console.error('Error during student registration:', error);
        }
    };
    return (
        <div className={style.formcontainer}>
            <h2>Tutor Registration</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="tutorName">Name:</label>
                <input type="text" id="tutorName" name="tutorName" value={formData.tutorName} onChange={handleChange} required />

                <label htmlFor="tutorEmail">Email:</label>
                <input type="email" id="tutorEmail" name="tutorEmail" value={formData.tutorEmail} onChange={handleChange} required />

                <label htmlFor="tutorPassword">Password:</label>
                <input type="password" id="tutorPassword" name="tutorPassword" value={formData.tutorPassword} onChange={handleChange} required />

                <label htmlFor="tutorClassGrade">Teaching Class Grade:</label>
                <select id="tutorClassGrade" name="tutorClassGrade" value={formData.tutorClassGrade} onChange={handleChange} required  >
                    <option value="" disabled>Select ClassGrade</option>
                    <option value="1">1st</option>
                    <option value="2">2nd</option>
                    <option value="3">3rd</option>
                    <option value="4">4th</option>
                    <option value="5">5th</option>
                    <option value="6">6th</option>
                    <option value="7">7th</option>
                    <option value="8">8th</option>
                </select>

                <label htmlFor="tutorLanguage">Teaching Language:</label>
                <select id="tutorLanguage" name="tutorLanguage" value={formData.tutorLanguage} onChange={handleChange} required >
                    <option value="" disabled>Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                </select>

                <label htmlFor="tutorSubjects" >Subject:</label>
                <select id="tutorSubjects" name="tutorSubjects" value={formData.tutorSubjects} onChange={handleChange} required>
                    <option value="" disabled>Select Subject</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                </select>
                <button type="submit" className={style.registerbtn}>Register</button>
                <p className={style.h5}>
                    Already have an account?{" "}
                    <span onClick={() => navigate("/login")}>Sign in</span>
                </p>
            </form>
        </div>
    )
}

export default TutorRegistration