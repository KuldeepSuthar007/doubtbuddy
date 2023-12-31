import React, { useState, useEffect } from 'react'
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function DoubtHistory({ doubtHistory }) {
    const [doubtdata, setDoubtdata] = useState([]);

    useEffect(() => {
        const fetchdetail = async () => {
            try {
                const studentid = localStorage.getItem("studentid");
                const reqUrl = `${backendUrl}doubt/getdoubt/${studentid}`;
                const response = await axios.get(reqUrl);
                setDoubtdata(response.data);
                return response;
            } catch (error) {
                console.log(error);
            }
        };
        fetchdetail();
    }, []);
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Description</th>

                    </tr>
                </thead>
                <tbody>
                    {doubtdata.map((doubt, i) => {
                        return (
                            <tr key={i} >
                                <td>{doubt.subject}</td>
                                <td>{doubt.description}</td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DoubtHistory