
const mongoose = require('mongoose');
const { Schema } = mongoose;

const DoubtSchema = new Schema({
    studentId: {
        type: String, // or ObjectId, depending on your data model
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Doubt', DoubtSchema);

