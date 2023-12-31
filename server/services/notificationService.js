const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()

async function sendNotification(tutorId, message) {
    try {

        const serverKey = process.env.SERVERKEY;
        const notificationServerUrl = 'https://fcm.googleapis.com/fcm/send';
        await axios.post(notificationServerUrl, {
            to: tutorId,
            notification: {
                title: 'Your Notification Title',
                body: message,
            },
        }, {
            headers: {
                Authorization: `key=${serverKey}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error.message);
    }
}

module.exports = { sendNotification };

