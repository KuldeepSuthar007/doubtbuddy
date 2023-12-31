const mongoose = require('mongoose');
const { Schema } = mongoose;

const TutorSchema = new Schema({
    tutorid: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    tutorName: {
        type: String,
        required: true,
    },
    tutorEmail: {
        type: String,
        required: true,
        unique: true,
    },
    tutorPassword: {
        type: String,
        required: true,
    },
    tutorClassGrade: {
        type: String,
        required: true,
    },
    tutorLanguage: {
        type: String,
        required: true,
    },
    tutorSubjects: {
        type: String,
        required: true,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },

});



module.exports = mongoose.model("Tutor", TutorSchema);