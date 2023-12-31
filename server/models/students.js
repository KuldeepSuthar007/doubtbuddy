const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentSchema = new Schema({
    studentid: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentEmail: {
        type: String,
        required: true,
        unique: true,
    },
    studentPassword: {
        type: String,
        required: true,
    },
    studentClassGrade: {
        type: String,
        required: true,
    },
    studentLanguage: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Student", StudentSchema);