import React, { useState, useEffect } from 'react'
import { createDoubt } from '../../apis/doubt';
import style from './DoubtCreation.module.css';
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

function DoubtCreation({ onSubmit }) {
    const id = localStorage.getItem("studentid");
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);

    const [doubtData, setDoubtData] = useState({
        studentId: id,
        subject: '',
        description: '',

    });

    useEffect(() => {
        const socket = io.connect('http://localhost:4000');
        socket.emit('joinTutorRoom', 'student');
        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleDoubtCreation = async () => {
        try {
            const response = await createDoubt(doubtData);
            socket.emit('doubtRequest', {
                studentId: id,
                subject: doubtData.subject,
                description: doubtData.description,
            });
            navigate('/dashboard/student')
        } catch (error) {
            console.error('Error creating doubt:', error);

        }
    };

    const handleChange = (e) => {
        setDoubtData({ ...doubtData, [e.target.name]: e.target.value });
    };

    return (
        <div className={style.formcontainer}>
            <h2>Create Doubt Request</h2>
            <form>
                <label htmlFor="subject">Subject:</label>
                <select id="subject" name="subject" value={doubtData.subject} onChange={handleChange} required>
                    <option value="" disabled>Select Subject</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                </select>
                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" rows={10} value={doubtData.description} onChange={handleChange} required />
                <button className={style.createbtn} type="button" onClick={handleDoubtCreation}>
                    Create Doubt
                </button>
            </form>
        </div>
    )
}

export default DoubtCreation