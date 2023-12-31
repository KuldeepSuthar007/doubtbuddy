const express = require('express');
const router = express.Router();
const Student = require('../models/students');
const Tutor = require('../models/tutors');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Student Signup
router.post('/student/signup', async (req, res) => {
    try {
        const { studentid, studentName, studentEmail, studentPassword, studentClassGrade, studentLanguage } = req.body;

        // Validate required fields
        if (!studentid || !studentName || !studentEmail || !studentPassword || !studentClassGrade || !studentLanguage) {
            return res.status(400).json({
                success: false,
                errorMessage: 'All fields are required',
            });
        }

        // Check if the student already exists
        const existingStudent = await Student.findOne({ studentEmail });

        if (existingStudent) {
            return res.status(401).json({
                success: false,
                message: 'Email address already exists. Please login!',
            });
        }

        // Encrypt the password
        const encryptedPassword = await bcryptjs.hash(studentPassword, 10);

        // Create a new student
        const newStudent = {
            studentid,
            studentName,
            studentEmail,
            studentPassword: encryptedPassword,
            studentClassGrade,
            studentLanguage,
        };

        await Student.create(newStudent);

        // Generate a JWT token
        const jwToken = jwt.sign({ studentEmail }, process.env.JWT_SECRET, { expiresIn: '60s' });

        res.status(200).json({
            success: true,
            message: 'Student created successfully',
            user: studentEmail,
            studentunqid: studentid,
            jwToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errorMessage: 'Something went wrong',
        });
    }
});

// Student Login
router.post('/student/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Email and password are required',
            });
        }

        // Find the student by email
        const student = await Student.findOne({ studentEmail: email });

        // Check if the student exists
        if (!student) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Invalid Email or password',
            });
        }

        // Compare passwords
        const passwordMatch = await bcryptjs.compare(password, student.studentPassword);

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Invalid Email and password',
            });
        }

        // Generate a JWT token
        const jwToken = jwt.sign({ userId: student._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            user: student.studentEmail,
            message: 'You are logged in successfully',
            studentunqid: student.studentid,
            jwToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errorMessage: 'Something went wrong',
        });
    }
});


// Tutor Signup
router.post('/tutor/signup', async (req, res) => {
    try {
        const { tutorid, role, tutorName, tutorEmail, tutorPassword, tutorClassGrade, tutorLanguage, tutorSubjects } = req.body;

        // Validate required fields
        if (!tutorid || !role || !tutorName || !tutorEmail || !tutorPassword || !tutorClassGrade || !tutorLanguage || !tutorSubjects) {
            return res.status(400).json({
                success: false,
                errorMessage: 'All fields are required',
            });
        }

        // Check if the tutor already exists
        const existingTutor = await Tutor.findOne({ tutorEmail });

        if (existingTutor) {
            return res.status(401).json({
                success: false,
                message: 'Email address already exists. Please login!',
            });
        }

        // Encrypt the password
        const encryptedPassword = await bcryptjs.hash(tutorPassword, 10);

        // Create a new tutor
        const newTutor = {
            tutorid,
            role,
            tutorName,
            tutorEmail,
            tutorPassword: encryptedPassword,
            tutorClassGrade,
            tutorLanguage,
            tutorSubjects,
        };

        await Tutor.create(newTutor);

        // Generate a JWT token
        const jwToken = jwt.sign({ tutorEmail }, process.env.JWT_SECRET, { expiresIn: '60s' });

        res.status(200).json({
            success: true,
            message: 'Tutor created successfully',
            user: tutorEmail,
            tutorunqid: tutorid,
            jwToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errorMessage: 'Something went wrong',
        });
    }
});

// Tutor Login

router.post('/tutor/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Email and password are required',
            });
        }


        const tutor = await Tutor.findOne({ tutorEmail: email });


        if (!tutor) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Invalid Email or password',
            });
        }


        const passwordMatch = await bcryptjs.compare(password, tutor.tutorPassword);

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                errorMessage: 'Invalid Email and password',
            });
        }


        const jwToken = jwt.sign({ userId: tutor._id }, process.env.JWT_SECRET);

        res.status(200).json({
            success: true,
            user: tutor.tutorEmail,
            message: 'You are logged in successfully',
            tutorunqid: tutor.tutorid,
            jwToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            errorMessage: 'Something went wrong',
        });
    }
});

module.exports = router;
