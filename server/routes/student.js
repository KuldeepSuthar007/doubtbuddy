const express = require('express');
const router = express.Router();
const Student = require('../models/students');

router.get('/detail-student/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await Student.findOne({ studentid: _id });
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