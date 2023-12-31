import React, { useState } from 'react'
import { login } from '../../apis/auth';
import { useNavigate } from "react-router-dom";
import style from "./Login.module.css";

function Login() {
    const [loggedInUser, setLoggedInUser] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: '',
    });
    const navigate = useNavigate();

    const handleLogin = (userData) => {
        setLoggedInUser(userData);
    };


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await login(formData);
            handleLogin(response);
            setFormData({
                email: '',
                password: '',
                role: '',
            });
            if (formData.role === 'student') {
                navigate("/dashboard/student");
            }
            else if (formData.role === 'tutor') {
                navigate("/dashboard/tutor");
            }
        } catch (error) {

            console.error('Error during login:', error);
        }


    };
    return (
        <>
            <div className={style.formcontainer}>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} required>
                        <option value="" disabled>Select Role</option>
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                    </select>
                    <button type="submit" className={style.loginbtn}>Login</button>
                </form>
                <p className={style.h6}>New to doubt?</p>
                <button className={style.createbtn} onClick={() => navigate("/register/student")}>
                    Create your account as student
                </button>
                <button className={style.createbtn} onClick={() => navigate("/register/tutor")}>
                    Create your account as tutor
                </button>
            </div>
        </>

    )
}

export default Login