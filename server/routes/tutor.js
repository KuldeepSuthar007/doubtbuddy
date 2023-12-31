const express = require('express');
const router = express.Router();
const Tutor = require('../models/tutors');

router.get('/detail-tutor/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Tutor.findOne({ tutorid: _id });
        return res.status(200).json(
            result
        )
    } catch (error) {
        console.log(error)
        res.status(500).json({
            suceess: false,
            errormessage: "Something went wrong"
        })
    }
})


module.exports = router;