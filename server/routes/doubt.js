const express = require('express');
const router = express.Router();
const Doubt = require('../models/doubts');
const { sendNotification } = require('../services/notificationService');
const Tutor = require('../models/tutors');



router.get('/getdoubt', async (req, res) => {
    try {
        const doubtHistory = await Doubt.find();
        res.json(doubtHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.get('/getdoubt/:studentId', async (req, res) => {
    try {
        const doubtHistory = await Doubt.find({ studentId: req.params.studentId });
        res.json(doubtHistory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});




router.post('/createDoubt', async (req, res) => {
    try {
        const { studentId, subject, description } = req.body;
        const newDoubt = new Doubt({
            studentId,
            subject,
            description,
        });
        await newDoubt.save();

        const matchingTutors = await Tutor.find({
            classGrade: newDoubt.classGrade,
            language: newDoubt.language,
            isOnline: true,
        });

        matchingTutors.forEach(async (tutor) => {
            const message = `New doubt request: ${newDoubt.subject}`;
            await sendNotification(tutor._id, message);
        });

        res.status(201).json({ message: 'Doubt request created successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error in doubt create' });
    }
});


module.exports = router;