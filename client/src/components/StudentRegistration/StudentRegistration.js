import React, { useState } from 'react'
import { studentRegistration } from '../../apis/auth';
import style from './StudentR.module.css';
import { useNavigate } from "react-router-dom";

function StudentRegistration() {
    const [formData, setFormData] = useState({
        studentName: '',
        studentEmail: '',
        studentPassword: '',
        studentClassGrade: '',
        studentLanguage: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await studentRegistration({ role: 'student', ...formData });
            setFormData({
                studentName: '',
                studentEmail: '',
                studentPassword: '',
                studentClassGrade: '',
                studentLanguage: '',
            });
            navigate('/login');
        } catch (error) {
            // Handle error, show an error message, etc.
            console.error('Error during student registration:', error);
        }
    };
    return (
        <div className={style.formcontainer}>
            <h2>Student Registration</h2>
            <form onSubmit={handleSubmit}>
                {/* Form fields for student registration */}
                <label htmlFor="studentName">Name:</label>
                <input type="text" id="studentName" name="studentName" value={formData.studentName} onChange={handleChange} required />

                <label htmlFor="studentEmail">Email:</label>
                <input type="email" id="studentEmail" name="studentEmail" value={formData.studentEmail} onChange={handleChange} required />

                <label htmlFor="studentPassword">Password:</label>
                <input type="password" id="studentPassword" name="studentPassword" value={formData.studentPassword} onChange={handleChange} required />

                <label htmlFor="studentClassGrade">Class Grade:</label>
                <select id="studentClassGrade" name="studentClassGrade" value={formData.studentClassGrade} onChange={handleChange} required >
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

                <label htmlFor="studentLanguage">Preferred Language:</label>
                <select id="studentLanguage" name="studentLanguage" value={formData.studentLanguage} onChange={handleChange} required >
                    <option value="" disabled>Select Language</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
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

export default StudentRegistration